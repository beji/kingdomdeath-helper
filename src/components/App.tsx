import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions/";
import { setName } from "../actions/settlementActions";
import { setSurvivorGender, setSurvivorName } from "../actions/survivorActions";
import { ID, ISettlement } from "../interfaces";
import ExportForm from "./ExportForm";
import SettlementName from "./SettlementName";
import SurvivorCard from "./SurvivorCard";
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
}

const mapStateToProps = (state: ISettlement): IAppProps => {
    return {
        aliveCount: state.survivors.filter((survivor) => survivor.alive).length,
        huntingSurvivors: state.survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id),
        name: state.name,
        survivors: state.survivors.map((survivor) => survivor.id),
    };
};

class App extends Component<IAppProps> {
    public render() {
        const { huntingSurvivors, survivors, aliveCount } = this.props;
        return (
            <AppWrapper>
                <SettlementName setName={setName} />
                <SurvivorCardsWrapper>
                    {huntingSurvivors && huntingSurvivors.map((id, idx) => <SurvivorCard key={idx} id={id} />)}
                </SurvivorCardsWrapper>
                <div>
                    Alive: {aliveCount ? aliveCount : 0}
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
                        </tr>
                    </thead>
                    <tbody>
                        {survivors && survivors.map((id, idx) => this.renderSurvivorListItem(idx, id))}
                    </tbody>
                </SurvivorList>
                <ExportForm />
            </AppWrapper>);
    }

    private renderSurvivorListItem(idx: number, id: ID) {
        return (
            <SurvivorListItem
                key={idx}
                id={id}
                addToHunt={addToHunt}
                removeFromHunt={removeFromHunt}
                setSurvivorName={setSurvivorName}
                setSurvivorGender={setSurvivorGender}
            />);
    }
}

export default connect(mapStateToProps)(App);
