import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CreateSurvivor from "../components/CreateSurvivor";
import GearGrid from "../components/GearGrid";
import ResetHunt from "../components/ResetHunt";
import SettlementName from "../components/SettlementName";
import SurvivorListItem from "../components/SurvivorListItem";
import { Gender, IState, UUID } from "../interfaces";

const AppWrapper = styled.div`
`;

const SurvivorCardsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: -1vh -1vw;
`;

const SurvivorList = styled.table`
    border-collapse: collapse;
`;

interface IAppProps {
    huntingSurvivors?: UUID[];
    survivors?: UUID[];
    name?: string;
    aliveCount?: number;
    aliveFemale?: number;
    aliveMale?: number;
    geargrids?: UUID[];
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
                    <thead>
                        <tr>
                            <th>Alive</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Insanity</th>
                            <th>Survival</th>
                            <th>Accuracy</th>
                            <th>Evasion</th>
                            <th>Luck</th>
                            <th>Movement</th>
                            <th>Speed</th>
                            <th>Strength</th>
                            <th>Hunting</th>
                            <th>Kill/Revive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {survivors && survivors.map((id, idx) => this.renderSurvivorListItem(idx, id))}
                    </tbody>
                </SurvivorList>
                <CreateSurvivor />
            </AppWrapper>);
    }

    private renderSurvivorListItem(idx: number, id: UUID) {
        return (
            <SurvivorListItem
                key={idx}
                id={id}
            />);
    }
}

export default connect(mapStateToProps)(App);
