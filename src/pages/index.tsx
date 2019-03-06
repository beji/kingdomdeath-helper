import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CreateSurvivor from "../components/CreateSurvivor";
import GearGrid from "../components/GearGrid";
import ResetHunt from "../components/ResetHunt";
import SettlementName from "../components/SettlementName";
import SurvivorListItem, { Cell } from "../components/SurvivorListItem";
import { Gender, ID, IState, UUID } from "../interfaces";

const AppWrapper = styled.div`
`;

const SurvivorCardsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: -1vh -1vw;
`;

const SurvivorList = styled.div`
    display: block;
    max-width: 100%;
    overflow-x: auto;
    margin: 2vh 0;
`;

const SurvivorListHead = styled.div`
    display: none;
    flex: wrap;
    margin: 0;
    padding: 0;
    @media only screen
      and (min-device-width: 667px) {
        display: flex;
        flex: wrap;
    }
`;

const SurvivorListHeadCell = Cell.extend`
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    overflow: hidden;
    font-weight: bold;
    border-color: #fff;
`;

interface IAppProps {
    huntingSurvivors?: ID[];
    survivors?: ID[];
    name?: string;
    aliveCount?: number;
    aliveFemale?: number;
    aliveMale?: number;
    geargrids?: ID[];
    id?: UUID;
}

const mapStateToProps = (state: IState): IAppProps => {
    const { survivors } = state.settlement;
    return {
        aliveCount: survivors.filter((survivor) => survivor.alive).length,
        aliveFemale: survivors.filter((survivor) => survivor.alive && survivor.gender === Gender.female).length,
        aliveMale: survivors.filter((survivor) => survivor.alive && survivor.gender === Gender.male).length,
        geargrids: state.settlement.geargrids.map((grid) => grid.id),
        huntingSurvivors: state.settlement.survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id),
        id: state.settlement.id,
        name: state.settlement.name,
        survivors: state.settlement.survivors.map((survivor) => survivor.id),
    };
};

class App extends React.Component<IAppProps> {
    public render() {
        const { geargrids, survivors, aliveCount, aliveFemale, aliveMale } = this.props;

        return (
            <AppWrapper>
                <SettlementName />
                <SurvivorCardsWrapper>
                    {geargrids && geargrids.map((id, idx) => <GearGrid key={idx} id={id} />)}
                </SurvivorCardsWrapper>
                <div>
                    <ResetHunt />
                </div>
                <div>
                    Population: {aliveCount ? aliveCount : 0} (&#x2642; {aliveMale}, &#x2640; {aliveFemale}),
                    dead: {aliveCount && this.props.survivors ? this.props.survivors.length - aliveCount : "all of them apparently"}
                </div>
                <SurvivorList>
                    <SurvivorListHead>
                        <SurvivorListHeadCell>Name</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Alive</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Gender</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Insanity</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Survival</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Accuracy</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Evasion</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Luck</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Movement</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Speed</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Strength</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Hunting</SurvivorListHeadCell>
                        <SurvivorListHeadCell>Kill/Revive</SurvivorListHeadCell>
                    </SurvivorListHead>
                    {survivors && survivors.map((id, idx) => this.renderSurvivorListItem(idx, id))}
                </SurvivorList>
                <CreateSurvivor />
            </AppWrapper>);
    }

    private renderSurvivorListItem(idx: number, id: ID) {
        return (
            <SurvivorListItem
                key={idx}
                id={id}
            />);
    }
}

export default connect(mapStateToProps)(App);
