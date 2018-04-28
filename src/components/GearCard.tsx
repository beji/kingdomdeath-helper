import React from "react";
import { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { ISettlement } from "../interfaces";
import { IGearGrid, IItem } from "../interfaces/gear";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import { ID } from "../interfaces/generics";
import { clone } from "../util";
import { colorMagentaLachs } from "./StyledComponents";

interface IGearCardDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGearCardStateProps {
    item?: IItem;
    grid?: IGearGrid;
    slotKey?: number;
}

interface IGearCardOwnProps {
    id: ID;
    slotId?: ID;
}

interface IGearCardProps extends IGearCardOwnProps, IGearCardDispatchProps, IGearCardStateProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGearCardDispatchProps => ({
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGearCardOwnProps): IGearCardStateProps => {
    const grid = state.geargrids.find((curr) => curr.slots.find((slot) => slot.id === ownProps.slotId) !== undefined);
    let slotKey;
    if (grid) {
        grid.slots.forEach((v, i) => {
            if (v.id === ownProps.slotId) {
                slotKey = i;
            }
        });
    }
    return {
        grid,
        item: state.items.find((item: IItem) => item.id === ownProps.id),
        slotKey,
    };
};

const StyledCard = styled.div`
    line-height: 1rem;
    border: 1px solid #999;
    background:#ddd;
    padding:1rem;
    margin:.5rem;
    position:relative;
`;
const CardHeadline = styled.div`
    font-weight:bold;
    text-align:center;
`;
const CardDescription = styled.div`
    background:#aaa;
`;
const CloseIcon = styled.div`
    background:#ccc;
    border:1px solid #444;
    border-radius:50%;
    cursor:pointer;
    height:1.25rem;
    line-height:1.25rem;
    position:absolute;
    right:-.5rem;
    text-align:center;
    top:-.5rem;
    width:1.25rem;
    &:hover {
        background:${colorMagentaLachs}
    }
`;

class GearCard extends React.Component<IGearCardProps> {
    public constructor(props: IGearCardProps) {
        super(props);
        this.state = {
            dragging: false,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
    }

    public render() {
        const { item, slotId } = this.props;

        return (
            <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                {slotId && <CloseIcon onClick={this.handleCloseIconClick}>x</CloseIcon>}
                <CardHeadline>{item && item.name}</CardHeadline>
                <CardDescription>{item && item.desc}</CardDescription>
            </StyledCard>
        );
    }

    private handleCloseIconClick() {
        if (this.props.grid) {
            const { grid, slotKey } = this.props;
            const newGrid = {
                ...grid,
                slots: grid.slots.map((slot, idx) => {
                    if (idx === slotKey as number) {
                        return {
                            ...slot,
                            content: undefined,
                        };
                    }
                    return slot;
                }),
            };
            this.props.updateGear(newGrid);
            this.setState({
                active: false,
            });
        }
    }

    private handleDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("ids", JSON.stringify({
                id: this.props.id,
                slotKey: this.props.slotKey,
            }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearCard);
