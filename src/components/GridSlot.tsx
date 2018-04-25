import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { ID, ISettlement } from "../interfaces";
import { IGearGrid } from "../interfaces/gear";
import { UpdateGearGridAction } from "../interfaces/gearActions";

interface IGridSlotState {
    active: boolean;
    grid?: IGearGrid;
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
        this.handleDragEnter.bind(this);
        this.handleDragLeave.bind(this);
        this.handleGridDrop.bind(this);
    }

    public render() {
        const StyledElement = styled.div`
            border:1px solid #444;
            width:33.33333%;
            height:10vh;
            &.active {
                background:#aaa;
            }
        `;
        return (
            <StyledElement
                className={this.state.active ? "active" : ""}
                onDrop={this.handleGridDrop}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
            >
                {this.state.grid && this.state.grid.slots[this.props.slotId].content}
            </StyledElement>
        );
    }

    private handleGridDrop() {
        const slotId = this.props.slotId;
        if (this.props.grid) {
            this.props.grid.slots[slotId] = {
                ...this.props.grid.slots[slotId],
                content: "dropped",
            };
            this.props.updateGear(this.props.grid);
        }
        this.setState({
            active: false,
            grid: this.props.grid,
        });
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
