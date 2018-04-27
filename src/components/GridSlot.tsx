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
import GearList from "./GearList";

interface IGridSlotState {
    active: boolean;
    showGearList: boolean;
}

interface IGridSlotStateProps {
    grid?: IGearGrid;
    slotKey?: number;
}

interface IGridSlotDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGridSlotOwnProps {
    gridId: ID;
    slotId: ID;
}

interface IGridSlotProps extends IGridSlotStateProps, IGridSlotOwnProps, IGridSlotDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGridSlotDispatchProps => ({
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGridSlotOwnProps): IGridSlotStateProps => {
    const geargrid = state.geargrids.find((v) => v.id === ownProps.gridId);
    let slotKey;
    if (geargrid) {
        geargrid.slots.forEach((v, i) => {
            if (v.id === ownProps.slotId) {
                slotKey = i;
            }
        });
    }
    return {
        grid: geargrid,
        slotKey,
    };
};

class GridSlot extends React.Component<IGridSlotProps, IGridSlotState> {
    public constructor(props: IGridSlotProps) {
        super(props);
        this.state = {
            active: false,
            showGearList: false,
        };

        this.handleGridDrop = this.handleGridDrop.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);
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
        const { slotId, grid, slotKey } = this.props;
        const { active, showGearList } = this.state;
        const content = grid && grid.slots[this.props.slotKey as number].content;
        return (
            <StyledElement
                className={active ? "active" : ""}
                onDrop={this.generateHandler(slotKey, this.handleGridDrop)}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter.bind(this, slotKey)}
                onDragLeave={this.handleDragLeave.bind(this, slotKey)}
            >
                {content && <GearCard id={content} slotId={slotId}/>}
                {!content && <FancyButton onClick={this.handleButtonClick}>+</FancyButton>}
                {showGearList && <GearList onItemSelect={this.handleItemSelect}/>}
            </StyledElement>
        );
    }

    private generateHandler = (value: any, method: any) => (...e: Array<SyntheticEvent<HTMLDivElement>>) => method(value, ...e);

    private handleItemSelect(itemId: ID) {
        if (this.props.grid) {
            const {grid, slotId} = this.props;
            const newGrid = {
                ...grid,
                slots: grid.slots.map((v) => {
                    if (v.id === slotId) {
                        return {
                            ...v,
                            content: itemId,
                        };
                    }
                    return v;
                }),
            };
            console.log(newGrid);
            this.props.updateGear(clone(newGrid));
        }

        this.setState({
            showGearList: false,
        });
    }

    private handleButtonClick() {
        this.setState({
            showGearList: true,
        });
    }

    private handleGridDrop(slotId: number, e: SyntheticEvent<HTMLDivElement>) {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        console.log(event.dataTransfer.getData("ids"));
        const data = JSON.parse(event.dataTransfer.getData("ids"));

        if (this.props.grid) {
            const newGrid = clone(this.props.grid);
            newGrid.slots[slotId].content = data.id;
            if (data.slotId) {
                newGrid.slots[data.slotId].content = undefined;
            }
            this.props.updateGear(newGrid);

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
