import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import uuid from "uuid/v4";
import { ID, ISettlement } from "../interfaces";
import ExportForm from "./ExportForm";
import GearCard from "./GearCard";
import GearGrid from "./GearGrid";
import SettlementName from "./SettlementName";
import SocketConnector from "./SocketConnector";
import SurvivorListItem from "./SurvivorListItem";

const AppWrapper = styled.div`
    margin: 1vh 1vw;
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
    items: ID[];
}

const mapStateToProps = (state: ISettlement): IAppProps => {
    return {
        aliveCount: state.survivors.filter((survivor) => survivor.alive).length,
        geargrids: state.geargrids.map((grid) => grid.id),
        huntingSurvivors: state.survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id),
        id: state.id,
        items: state.items.map((item) => item.id),
        name: state.name,
        survivors: state.survivors.map((survivor) => survivor.id),
    };
};

class App extends React.Component<IAppProps> {
    public render() {
        const { geargrids, survivors, aliveCount, items } = this.props;

        return (
            <AppWrapper>
                <SettlementName />
                <SurvivorCardsWrapper>
                    {geargrids && geargrids.map((id, idx) => <GearGrid key={idx} id={id} />)}
                </SurvivorCardsWrapper>
                <div>
                    Population: {aliveCount ? aliveCount : 0}
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
                <ExportForm />
                <GearCard id={items[0]} />
                <SocketConnector />
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
