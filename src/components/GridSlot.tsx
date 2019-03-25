import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { showLayer, updateGear } from "../actions";
import { ID, IGearGrid, IGearListLayer, IState, Item, LayerType } from "../interfaces";
import { ShowLayerAction, UpdateGearGridAction } from "../interfaces/actions";
import { colors } from "../theme";
import { clone } from "../util";
import GearCard from "./GearCard";
import { FancyButton } from "./StyledComponents";

interface IGridSlotState {
    active: boolean;
}

interface IGridSlotStateProps {
    grid?: IGearGrid;
    slotKey?: number;
}

interface IGridSlotDispatchProps {
    showLayer: (layer: IGearListLayer) => ShowLayerAction;
    updateGear: (grid: IGearGrid) => UpdateGearGridAction;
}

interface IGridSlotOwnProps {
    gridId: ID;
    slotId: ID;
}

interface IGridSlotProps extends IGridSlotStateProps, IGridSlotOwnProps, IGridSlotDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction | UpdateGearGridAction>): IGridSlotDispatchProps => ({
    showLayer: (layer: IGearListLayer) => dispatch(showLayer(layer)),
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: IState, ownProps: IGridSlotOwnProps): IGridSlotStateProps => {
    const geargrid = state.settlement.geargrids.find((v) => v.id === ownProps.gridId);
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
        };

        this.handleGridDrop = this.handleGridDrop.bind(this);
        this.handleGearListOpen = this.handleGearListOpen.bind(this);
    }

    public render() {
        const StyledElement = styled.div`
            border:1px solid ${colors.hintedBorder};
            width:33.33333%;
            min-height:10vh;
            text-align:center;
            line-height:10vh;
            &.active {
                background:#aaa;
            }
        `;
        const { slotId, grid, slotKey } = this.props;
        const { active } = this.state;
        const content = grid && grid.slots[this.props.slotKey as number].content;
        return (
            <StyledElement
                className={active ? "active" : ""}
                onDrop={this.generateHandler(slotKey, this.handleGridDrop)}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter.bind(this, slotKey)}
                onDragLeave={this.handleDragLeave.bind(this, slotKey)}
            >
                {content !== undefined && grid && <GearCard id={content} slotId={slotId} gridId={grid.id} />}
                {content === undefined && <FancyButton onClick={this.handleGearListOpen}>+</FancyButton>}
            </StyledElement>
        );
    }

    private generateHandler = (value: any, method: any) => (...e: Array<SyntheticEvent<HTMLDivElement>>) => method(value, ...e);

    private handleGearListOpen() {
        const { gridId, slotId } = this.props;
        this.props.showLayer({
            gridId,
            slotId,
            type: LayerType.gearlist,
        });
    }

    private handleGridDrop(slotKey: number, e: SyntheticEvent<HTMLDivElement>) {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        const data = JSON.parse(event.dataTransfer.getData("ids"));
        const { grid } = this.props;
        if (grid) {
            const newGrid = {
                ...grid,
                slots: grid.slots.map((slot, idx) => {
                    if (data.slotKey && idx === data.slotKey) {
                        return {
                            ...slot,
                            content: undefined,
                        };
                    }
                    if (idx === slotKey) {
                        return {
                            ...slot,
                            content: data.id,
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
