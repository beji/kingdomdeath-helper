import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions/";
import { updateGear } from "../actions/gearActions";
import { setName } from "../actions/settlementActions";
import { killSurvivor, reviveSurvivor, updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement } from "../interfaces";
import ExportForm from "./ExportForm";
import GearGrid from "./GearGrid";
import SettlementName from "./SettlementName";
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

const GearCard = styled.div`
    width:5vw;
    height:5vw;
    background:#aaa;
`;

interface IAppProps {
    huntingSurvivors?: string[];
    survivors?: string[];
    name?: string;
    aliveCount?: number;
    geargrids?: ID[];
}

const mapStateToProps = (state: ISettlement): IAppProps => {
    return {
        aliveCount: state.survivors.filter((survivor) => survivor.alive).length,
        geargrids: state.geargrids.map((grid) => grid.id),
        huntingSurvivors: state.survivors.filter((survivor) => survivor.hunting).map((survivor) => survivor.id),
        name: state.name,
        survivors: state.survivors.map((survivor) => survivor.id),
    };
};

class App extends Component<IAppProps> {
    public render() {
        const { geargrids, survivors, aliveCount } = this.props;
        return (
            <AppWrapper>
                <SettlementName setName={setName} />
                <SurvivorCardsWrapper>
                    {geargrids && geargrids.map((id, idx) => <GearGrid key={idx} id={id} updateGear={updateGear} />)}
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
                <GearCard draggable={true}>This a piece of Gear</GearCard>
            </AppWrapper>);
    }

    private renderSurvivorListItem(idx: number, id: ID) {
        return (
            <SurvivorListItem
                key={idx}
                id={id}
                addToHunt={addToHunt}
                removeFromHunt={removeFromHunt}
                updateSurvivor={updateSurvivor}
                killSurvivor={killSurvivor}
                reviveSurvivor={reviveSurvivor}
            />);
    }
}

export default connect(mapStateToProps)(App);
