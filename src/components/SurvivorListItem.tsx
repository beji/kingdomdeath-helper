import React from "react";
import { Component, Fragment, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions";
import { killSurvivor, reviveSurvivor, updateSurvivor } from "../actions/survivorActions";
import { Gender, ID, ISettlement } from "../interfaces";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ISurvivor } from "../interfaces/survivor";
import { KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import ComplexStat from "./ComplexStat";

interface ISurvivorListItemStateProps {
    survivor?: ISurvivor;
}

interface ISurvivorListItemDispatchProps {
    addToHunt: (id: ID) => AddToHuntAction;
    removeFromHunt: (id: ID) => RemoveFromHuntAction;
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
    killSurvivor: (id: ID) => KillSurvivorAction;
    reviveSurvivor: (id: ID) => ReviveSurvivorAction;
}

interface ISurvivorListItemOwnProps {
    id: ID;
}

interface ISurvivorListItemProps extends ISurvivorListItemOwnProps, ISurvivorListItemStateProps, ISurvivorListItemDispatchProps { }

interface ISurvivorListItemState {
    editName: boolean;
    editGender: boolean;
}

const Cell = styled.td`
    border: 1px solid #333;
    padding: 0.25vh 0.25vw;
`;

const mapDispatchToProps = (dispatch: Dispatch<AddToHuntAction | RemoveFromHuntAction | UpdateSurvivorAction | KillSurvivorAction | ReviveSurvivorAction>): ISurvivorListItemDispatchProps => ({
    addToHunt: (id: ID) => dispatch(addToHunt(id)),
    killSurvivor: (id: ID) => dispatch(killSurvivor(id)),
    removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
    reviveSurvivor: (id: ID) => dispatch(reviveSurvivor(id)),
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorListItemOwnProps): ISurvivorListItemStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        survivor: clone(survivor),
    };
};

class SurvivorListItem extends Component<ISurvivorListItemProps, ISurvivorListItemState> {
    public constructor(props: ISurvivorListItemProps) {
        super(props);
        this.handleHuntBoxChange = this.handleHuntBoxChange.bind(this);
        this.state = {
            editGender: false,
            editName: false,
        };
        this.handleNameBlur = this.handleNameBlur.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);

        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleGenderClick = this.handleGenderClick.bind(this);

        this.handleKillClick = this.handleKillClick.bind(this);
        this.handleReviveClick = this.handleReviveClick.bind(this);

    }

    public render() {
        if (this.props.survivor) {
            const { name, id, gender, alive, hunting } = this.props.survivor;
            const { movement, accuracy, strength, evasion, luck, speed } = this.props.survivor.baseStats;
            const { editName, editGender } = this.state;
            return (
                <tr>
                    <Cell>{!alive && <Fragment>✝</Fragment>}</Cell>
                    <Cell>
                        {editName && <input type="text" defaultValue={name} onBlur={this.handleNameBlur} />}
                        {!editName && <span onClick={this.handleNameClick}>{name}</span>}
                    </Cell>
                    <Cell>
                        {editGender && this.renderGenderSelect()}
                        {!editGender && <span onClick={this.handleGenderClick}>{gender}</span>}
                    </Cell>
                    <Cell><ComplexStat id={id} stat={movement} /></Cell>
                    <Cell><ComplexStat id={id} stat={accuracy} /></Cell>
                    <Cell><ComplexStat id={id} stat={strength} /></Cell>
                    <Cell><ComplexStat id={id} stat={evasion} /></Cell>
                    <Cell><ComplexStat id={id} stat={luck} /></Cell>
                    <Cell><ComplexStat id={id} stat={speed} /></Cell>
                    <Cell>{alive && <input type="checkbox" checked={hunting} onChange={this.handleHuntBoxChange} />}</Cell>
                    <Cell>
                        {alive ? <button onClick={this.handleKillClick}>Kill</button> : <button onClick={this.handleReviveClick}>Revive</button>}
                    </Cell>
                </tr>
            );
        } else {
            return "";
        }

    }

    private handleHuntBoxChange(event: SyntheticEvent<HTMLInputElement>) {
        if (this.props.survivor) {
            if (!this.props.survivor.hunting) {
                this.props.addToHunt(this.props.id);
            } else {
                this.props.removeFromHunt(this.props.id);
            }
        }
    }

    private handleNameClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editName: true,
        });
    }
    private handleNameBlur(e: SyntheticEvent<HTMLInputElement>) {
        if (this.props.survivor) {
            const { name, id, gender, alive, hunting, baseStats } = this.props.survivor;
            const updateData = {
                alive, baseStats, gender, hunting, id, name: e.currentTarget.value,
            } as ISurvivor;
            this.props.updateSurvivor(updateData);
            this.setState({
                editName: false,
            });
        }
    }

    private handleGenderClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editGender: true,
        });
    }

    private handleGenderChange(e: SyntheticEvent<HTMLSelectElement>) {
        if (this.props.survivor) {
            const newGender = e.currentTarget.value === "M" ? Gender.Male : Gender.Female;

            this.props.updateSurvivor({
                ...this.props.survivor,
                gender: newGender,
            });

            this.setState({
                editGender: false,
            });
        }
    }

    private renderGenderSelect() {
        if (this.props.survivor) {
            return (
                <select onChange={this.handleGenderChange} defaultValue={this.props.survivor.gender}>
                    <option value={Gender.Male}>M</option>
                    <option value={Gender.Female}>F</option>
                </select>);
        } else {
            return "";
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
