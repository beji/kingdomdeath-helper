import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement } from "../interfaces";
import { IGearGrid } from "../interfaces/gear";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import SurvivorCard from "./SurvivorCard";

interface IGearGridState {
    grid?: IGearGrid;
}

interface IGearGridStateProps {
    grid?: IGearGrid;
}

interface IGearGridDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGearGridOwnProps {
    id: ID;
}

interface IGearGridProps extends IGearGridStateProps, IGearGridDispatchProps, IGearGridOwnProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGearGridDispatchProps => ({
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGearGridOwnProps): IGearGridStateProps => {
    const geargrid = state.geargrids.find((v) => v.id === ownProps.id);
    return {
        grid: geargrid,
    };
};

class GearGrid extends React.Component<IGearGridProps, IGearGridState> {
    public constructor(props: IGearGridProps) {
        super(props);
    }

    public render() {
        const PlayerCard = styled.div`
            width:47vw;
            margin:1vh 1vw;
        `;
        const StyledGrid = styled.div`
            display:flex;
            flex-wrap:wrap;
            width:100%;
            margin: 1vh 0;
        `;
        if (this.props.grid) {
            const activeGrid = this.props.grid;
            return (
                <PlayerCard>
                    <SurvivorCard key={activeGrid.id} id={activeGrid.survivorId} updateSurvivor={updateSurvivor} />
                    <StyledGrid>
                        {Object.keys(activeGrid.slots).map((v, i) => this.renderGridElement(activeGrid, i))}
                    </StyledGrid>
                </PlayerCard>
            );
        }
    }

    private renderGridElement(grid: IGearGrid, i: number) {
        const StyledElement = styled.div`
            border:1px solid #444;
            width:33.33333%;
            height:7vh;
        `;
        return (
            <StyledElement key={i} onDrop={this.handleGridDrop.bind(this, i)} onDragOver={this.handleDragOver}>{grid.slots[i].content}</StyledElement>
        );
    }

    private handleGridDrop(index: number) {
        if (this.props.grid) {
            console.log("before", this.props.grid.slots[index]);
            this.props.grid.slots[index] = {
                ...this.props.grid.slots[index],
                content: "dropped",
            };
            console.log("after", this.props.grid.slots[index]);
            this.props.updateGear(this.props.grid);
        }
        this.setState({
            grid: this.props.grid,
        });
    }

    private handleDragOver(e: SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearGrid);
