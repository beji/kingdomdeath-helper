import React from "react";
import { Component, Fragment, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions";
import { killSurvivor, reviveSurvivor, updateSurvivorName } from "../actions/survivorActions";
import { DefenseStats, IBaseStat, ID, IDefenseStat, IGearGrid, IState, ISurvivor } from "../interfaces";
import { AddToHuntAction, KillSurvivorAction, RemoveFromHuntAction, ReviveSurvivorAction, UpdateSurvivorNameAction } from "../interfaces/actions";
import { clone } from "../util";
import GenderEdit from "./GenderEdit";
import NameEdit from "./NameEdit";
import { FancyButton } from "./StyledComponents";
import SurvivorBaseStat from "./SurvivorBaseStat";
import SurvivorDefenseStat from "./SurvivorDefenseStat";

interface ISurvivorListItemStateProps {
    survivor?: ISurvivor;
    geargrids: ReadonlyArray<IGearGrid>;
    huntSlots: Array<{
        gridId: number,
        playername: string;
        survivorId?: ID,
    }>;
}

interface ISurvivorListItemDispatchProps {
    addToHunt: (id: ID, gridId: number) => AddToHuntAction;
    removeFromHunt: (id: ID) => RemoveFromHuntAction;
    killSurvivor: (id: ID) => KillSurvivorAction;
    reviveSurvivor: (id: ID) => ReviveSurvivorAction;
    updateSurvivorName: (id: ID, name: string) => UpdateSurvivorNameAction;
}

interface ISurvivorListItemOwnProps {
    id: ID;
}

interface ISurvivorListItemProps extends ISurvivorListItemOwnProps, ISurvivorListItemStateProps, ISurvivorListItemDispatchProps { }

const Cell = styled.td`
    border: 1px solid #333;
    padding: 0.25vh 0.25vw;
`;

const mapDispatchToProps = (dispatch: Dispatch<AddToHuntAction | RemoveFromHuntAction | KillSurvivorAction | ReviveSurvivorAction | UpdateSurvivorNameAction>): ISurvivorListItemDispatchProps => ({
    addToHunt: (id: ID, gridId: number) => dispatch(addToHunt(id, gridId)),
    killSurvivor: (id: ID) => dispatch(killSurvivor(id)),
    removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
    reviveSurvivor: (id: ID) => dispatch(reviveSurvivor(id)),
    updateSurvivorName: (id: ID, name: string) => dispatch(updateSurvivorName(id, name)),
});

const mapStateToProps = (state: IState, ownProps: ISurvivorListItemOwnProps): ISurvivorListItemStateProps => {
    const survivor = state.settlement.survivors.find((v) => v.id === ownProps.id);
    const { geargrids } = state.settlement;
    return {
        geargrids: state.settlement.geargrids,
        huntSlots: geargrids.map((v, i) => {
            return {
                gridId: i,
                playername: v.playername || `Slot ${i + 1}`,
                survivorId: v.survivorId,
            };
        }),
        survivor: clone(survivor),
    };
};

class SurvivorListItem extends Component<ISurvivorListItemProps> {
    public constructor(props: ISurvivorListItemProps) {
        super(props);
        this.handleHuntBoxChange = this.handleHuntBoxChange.bind(this);

        this.handleKillClick = this.handleKillClick.bind(this);
        this.handleReviveClick = this.handleReviveClick.bind(this);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
    }

    public render() {
        if (this.props.survivor) {
            const { huntSlots } = this.props;
            const { name, id, gender, gridId, alive, hunting, baseStats, defenseStats } = this.props.survivor;

            return (
                <tr>
                    <Cell>{!alive && <Fragment>✝</Fragment>}</Cell>
                    <Cell>
                        <NameEdit name={name} updateFunc={this.handleNameUpdate} />
                    </Cell>
                    <Cell>
                        <GenderEdit id={id} />
                    </Cell>
                    {this.renderDefStats(defenseStats, id)}
                    {this.renderBaseStats(baseStats, id)}
                    <Cell>
                        {alive && (<div><select value={hunting ? gridId : "remove"} onChange={this.handleHuntBoxChange}><option value="remove">not hunting</option>{huntSlots.map((v, i) => <option key={i} value={i}>Grid: {v.playername}</option>)}</select></div>)}
                    </Cell>
                    <Cell>
                        {alive ? <FancyButton onClick={this.handleKillClick}>Kill</FancyButton> : <FancyButton onClick={this.handleReviveClick}>Revive</FancyButton>}
                    </Cell>
                </tr>
            );
        } else {
            return "";
        }
    }

    private renderBaseStats(baseStats: ReadonlyArray<IBaseStat>, id: ID) {
        return baseStats.map((basestat, idx) => {
            return (
                <Cell key={idx}><SurvivorBaseStat id={id} statid={basestat.stat} /></Cell>);
        });
    }

    private renderDefStats(defenseStats: ReadonlyArray<IDefenseStat>, id: ID) {
        return defenseStats.filter((defStat) => defStat.stat === DefenseStats.brain || defStat.stat === DefenseStats.survival).map((defStat, idx) => {
            return (
                <Cell key={idx}><SurvivorDefenseStat id={id} statid={defStat.stat} renderWounds={false} /></Cell>);
        });
    }

    private handleNameUpdate(newName: string) {
        if (this.props.survivor) {
            this.props.updateSurvivorName(this.props.survivor.id, newName);
        }
    }

    private handleHuntBoxChange(event: SyntheticEvent<HTMLSelectElement>) {
        if (this.props.survivor) {
            if (event.currentTarget.value !== "remove") {
                this.props.addToHunt(this.props.id, parseInt(event.currentTarget.value, 10));
            } else {
                this.props.removeFromHunt(this.props.id);
            }
        }
    }

    private handleKillClick(e: SyntheticEvent<HTMLButtonElement>) {
        this.props.killSurvivor(this.props.id);
    }
    private handleReviveClick(e: SyntheticEvent<HTMLButtonElement>) {
        this.props.reviveSurvivor(this.props.id);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListItem);
