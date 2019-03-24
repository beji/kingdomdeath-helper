import React from "react";
import { connect, Dispatch } from "react-redux";
import styled from "styled-components";
import { setPlayerName } from "../actions";
import { Affinity, AffinityTypes, ID, IGearGrid, IState } from "../interfaces";
import { SetPlayerNameAction } from "../interfaces/actions";
import { colors } from "../theme";
import AffinityIcon from "./AffinityIcon";
import GridSlot from "./GridSlot";
import Link from "./Link";
import NameEdit from "./NameEdit";
import { Card, StyledText } from "./StyledComponents";
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

interface IGearGridDispatchProps {
    setPlayerName: (name: string, gridId: ID) => SetPlayerNameAction;
}

interface IGearGridProps extends IGearGridStateProps, IGearGridOwnProps, IGearGridDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<SetPlayerNameAction>): IGearGridDispatchProps => ({
    setPlayerName: (name: string, gridId: ID) => dispatch(setPlayerName(name, gridId)),
});

const mapStateToProps = (state: IState, ownProps: IGearGridOwnProps): IGearGridStateProps => {
    const geargrid = state.settlement.geargrids.find((v) => {
        return v.id === ownProps.id;
    });
    return {
        grid: geargrid,
    };
};

class GearGrid extends React.Component<IGearGridProps, IGearGridState> {
    public constructor(props: IGearGridProps) {
        super(props);
        this.handleSetPlayerName = this.handleSetPlayerName.bind(this);
    }

    public render() {
        const PlayerCard = styled.div`
            border: 1px solid ${colors.hintedBorder};
            padding: .5rem;
            width:47vw;
            margin:1vh 1%;
            @media only screen
              and (max-width: 420px) {
                    width: 98%;
            }
        `;
        const StyledGrid = styled(Card)`
            display:flex;
            flex-wrap:wrap;
            width:100%;
            margin: 1vh 0;
        `;
        const PlayerCardHeadline = styled.div`
            color: ${colors.text};
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
                        <div>Player: <NameEdit name={grid.playername || "not assigned"} updateFunc={this.handleSetPlayerName} /> </div>
                        <Link to={`/card/${id}`}>Open slot on own page</Link>
                    </PlayerCardHeadline>
                    {typeof grid.survivorId !== "undefined" && <SurvivorCard key={grid.id} id={grid.survivorId} />}
                    <GridAffinities>
                        <StyledText>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 0 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.red} type={AffinityTypes.grid} /></StyledText>
                        <StyledText>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 1 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.green} type={AffinityTypes.grid} /></StyledText>
                        <StyledText>{grid.affinities && grid.affinities.reduce((acc, curr) => curr === 2 ? acc + 1 : acc, 0)}x <AffinityIcon affinity={Affinity.blue} type={AffinityTypes.grid} /></StyledText>
                    </GridAffinities>
                    <StyledGrid>
                        {Object.keys(grid.slots).map((v, i, slots) => <GridSlot key={i} gridId={grid.id} slotId={grid.slots[i].id} />)}
                    </StyledGrid>
                </PlayerCard>
            );
        } else {
            return "No valid grid id given!";
        }
    }

    private handleSetPlayerName(newName: string) {
        this.props.setPlayerName(newName, this.props.id);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearGrid);
