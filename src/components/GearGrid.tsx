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
                        {Object.keys(activeGrid.slots).map((v, i) => <GridSlot key={i} gridId={activeGrid.id} slotId={i} />)}
                    </StyledGrid>
                </PlayerCard>
            );
        }
    }
}

export default connect(mapStateToProps)(GearGrid);
