import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement } from "../interfaces";
import { IGearGrid } from "../interfaces/gear";
import GridSlot from "./GridSlot";
import SurvivorCard from "./SurvivorCard";

interface IGearGridState {
    grid?: IGearGrid;
}

interface IGearGridStateProps {
    grid?: IGearGrid;
}

interface IGearGridOwnProps {
    id: ID;
}

interface IGearGridProps extends IGearGridStateProps, IGearGridOwnProps { }

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
            @media (max-width:900px) {
                width: 98vh;
            }
        `;
        const StyledGrid = styled.div`
            display:flex;
            flex-wrap:wrap;
            width:100%;
            margin: 1vh 0;
        `;
        const PlayerCardHeadline = styled.div`
            font-weight:bold;
            text-align:center;
            margin:.5vh 0;
        `;

        if (this.props.grid) {
            const { grid, id } = this.props;
            return (
                <PlayerCard>
                    <PlayerCardHeadline>Huntslot {id}</PlayerCardHeadline>
                    {grid.survivorId && <SurvivorCard key={grid.id} id={grid.survivorId} updateSurvivor={updateSurvivor} />}
                    <StyledGrid>
                        {Object.keys(grid.slots).map((v, i) => <GridSlot key={i} gridId={grid.id} slotId={i} />)}
                    </StyledGrid>
                </PlayerCard>
            );
        }
    }
}

export default connect(mapStateToProps)(GearGrid);
