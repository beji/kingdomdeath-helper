import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { ID, ISettlement } from "../interfaces";
import { IGearGrid } from "../interfaces/gear";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import { clone } from "../util";
import FancyButton from "./FancyButton";
import GearCard from "./GearCard";

interface IGridSlotState {
    active: boolean;
}

interface IGridSlotStateProps {
    grid?: IGearGrid;
}

interface IGridSlotDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGridSlotOwnProps {
    gridId: ID;
    slotId: number;
}

interface IGridSlotProps extends IGridSlotStateProps, IGridSlotOwnProps, IGridSlotDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGridSlotDispatchProps => ({
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGridSlotOwnProps): IGridSlotStateProps => {
    const geargrid = state.geargrids.find((v) => v.id === ownProps.gridId);
    return {
        grid: geargrid,
    };
};

class GridSlot extends React.Component<IGridSlotProps, IGridSlotState> {
    public constructor(props: IGridSlotProps) {
        super(props);
        this.state = {
            active: false,
        };

        this.handleGridDrop = this.handleGridDrop.bind(this);
    }

    public render() {
        const StyledElement = styled.div`
            border:1px solid #444;
            width:33.33333%;
            height:10vh;
            text-align:center;
            line-height:10vh;
            &.active {
                background:#aaa;
            }
        `;
        const { slotId, grid } = this.props;
        const content = grid && grid.slots[this.props.slotId].content;
        return (
            <StyledElement
                className={this.state.active ? "active" : ""}
                onDrop={this.generateHandler(slotId, this.handleGridDrop)}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter.bind(this, slotId)}
                onDragLeave={this.handleDragLeave.bind(this, slotId)}
            >
                {content && <GearCard id={content} slotId={slotId} />}
                {!content && <FancyButton>+</FancyButton>}
            </StyledElement>
        );
    }

    private generateHandler = (value: any, method: any) => (...e: Array<SyntheticEvent<HTMLDivElement>>) => method(value, ...e);

    private handleGridDrop(slotId: number, e: SyntheticEvent<HTMLDivElement>) {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        console.log(event.dataTransfer.getData("ids"));
        const data = JSON.parse(event.dataTransfer.getData("ids"));

        if (this.props.grid) {
            const newGrid = this.props.grid;
            newGrid.slots[slotId].content = data.id;
            if (data.slotId) {
                newGrid.slots[data.slotId].content = undefined;
            }
            this.props.updateGear(clone(newGrid));

            this.setState({
                active: false,
            });
        }
    }

    private handleDragEnter() {
        if (!this.state.active) {
            this.setState({
                active: true,
            });
        }
    }

    private handleDragLeave() {
        this.setState({
            active: false,
        });
    }

    private handleDragOver(e: SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridSlot);
