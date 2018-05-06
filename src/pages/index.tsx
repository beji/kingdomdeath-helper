import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CreateSurvivor from "../components/CreateSurvivor";
import GearGrid from "../components/GearGrid";
import ResetHunt from "../components/ResetHunt";
import SettlementName from "../components/SettlementName";
import SurvivorListItem from "../components/SurvivorListItem";
import { ID, ISettlement } from "../interfaces";

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
    huntingSurvivors?: string[];
    survivors?: string[];
    name?: string;
    aliveCount?: number;
    geargrids?: ID[];
    id?: ID;
}

const mapStateToProps = (state: ISettlement): IAppProps => {
    return {
        aliveCount: state.survivors.filter((survivor) => survivor.alive).length,
        geargrids: state.geargrids.map((grid) => grid.id),
        huntingSurvivors: state.survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id),
        id: state.id,
        name: state.name,
        survivors: state.survivors.map((survivor) => survivor.id),
    };
};

class App extends React.Component<IAppProps> {
    public render() {
        const { geargrids, survivors, aliveCount } = this.props;

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
                    Population: {aliveCount ? aliveCount : 0}, dead: {aliveCount && this.props.survivors ? this.props.survivors.length - aliveCount : "all of them apparently"}
                </div>
                <SurvivorList>
                    <thead>
                        <tr>
                            <th>Alive</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Movement</th>
                            <th>Accuracy</th>
                            <th>Strength</th>
                            <th>Evasion</th>
                            <th>Luck</th>
                            <th>Speed</th>
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

    private renderSurvivorListItem(idx: number, id: ID) {
        return (
            <SurvivorListItem
                key={idx}
                id={id}
            />);
    }
}

export default connect(mapStateToProps)(App);
