import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { Affinity, AffinityTypes, ID, IGearGrid, ISettlement } from "../interfaces";
import AffinityIcon from "./AffinityIcon";
import GridSlot from "./GridSlot";
import Link from "./Link";
import { media } from "./StyledComponents";
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
            margin:1vh 1%;
            @media only screen
              and (max-width: 420px) {
                    width: 98%;
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
        const GridAffinities = styled.div`
            display:flex;
            font-size:.875rem;
            justify-content: space-around;
            margin: .25rem;
        `;

        if (this.props.grid) {
            const { grid, id } = this.props;
            return (
                <PlayerCard>
                    <PlayerCardHeadline>
                        <Link to={`/card/${id}`}>Huntslot {id}</Link>
                    </PlayerCardHeadline>
                    {grid.survivorId && <SurvivorCard key={grid.id} id={grid.survivorId} updateSurvivor={updateSurvivor} />}
                    <GridAffinities>
                        <div>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 0 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.red} type={AffinityTypes.grid}/></div>
                        <div>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 1 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.green} type={AffinityTypes.grid}/></div>
                        <div>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 2 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.blue} type={AffinityTypes.grid}/></div>
                    </GridAffinities>
                    <StyledGrid>
                        {Object.keys(grid.slots).map((v, i, slots) => <GridSlot key={i} gridId={grid.id} slotId={grid.slots[i].id} />)}
                    </StyledGrid>
                </PlayerCard>
            );
        }
    }
}

export default connect(mapStateToProps)(GearGrid);
