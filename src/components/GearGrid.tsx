import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement } from "../interfaces";
import { IGearGrid, IGridSlot } from "../interfaces/gear";
import SurvivorCard from "./SurvivorCard";

interface IGearGridState {
    grid: IGearGrid;
}

interface IGearGridProps {
    id: ID;
    grid?: IGearGrid;
}

const mapStateToProps = (state: ISettlement, ownProps: IGearGridProps): IGearGridProps => {
    const geargrid = state.geargrids.find((v) => v.id === ownProps.id);
    return {
        grid: geargrid,
        id: ownProps.id,
        ...ownProps,
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
        const StyledElement = styled.div`
            border:1px solid #444;
            width:33.33333%;
            height:7vh;
        `;
        if (this.props.grid) {
            const activeGrid = this.props.grid;
            return (
                <PlayerCard>
                    <SurvivorCard key={activeGrid.id} id={activeGrid.survivorId} updateSurvivor={updateSurvivor}/>
                    <StyledGrid>
                        {Object.keys(activeGrid.slots).map((v, i) => <StyledElement key={i}>{activeGrid.id} - {i}</StyledElement>)}
                    </StyledGrid>
                </PlayerCard>
            );
        }
    }
}

export default connect(mapStateToProps)(GearGrid);
