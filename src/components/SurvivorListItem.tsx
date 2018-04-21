import React from "react";
import { Component, Fragment, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions";
import { setSurvivorGender, setSurvivorName } from "../actions/survivorActions";
import { Gender, ID, ISettlement, ISurvivor } from "../interfaces";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { IStats } from "../interfaces/survivor";
import { SetSurvivorGenderAction, SetSurvivorNameAction } from "../interfaces/survivorActions";

interface ISurvivorListItemProps {
    id: ID;
    name?: string;
    gender?: Gender;
    alive?: boolean;
    hunting?: boolean;
    baseStats?: IStats;
    addToHunt: (id: ID) => AddToHuntAction;
    removeFromHunt: (id: ID) => RemoveFromHuntAction;
    setSurvivorName: (id: ID, name: string) => SetSurvivorNameAction;
    setSurvivorGender: (id: ID, gender: Gender) => SetSurvivorGenderAction;
}

interface ISurvivorListItemState {
    editName: boolean;
    editGender: boolean;
}

const Cell = styled.td`
    border: 1px solid #333;
    padding: 0.25vh 0.25vw;
`;

const mapDispatchToProps = (dispatch: Dispatch<AddToHuntAction | RemoveFromHuntAction | SetSurvivorNameAction | SetSurvivorGenderAction>) => ({
    addToHunt: (id: ID) => dispatch(addToHunt(id)),
    removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
    setSurvivorGender: (id: ID, gender: Gender) => dispatch(setSurvivorGender(id, gender)),
    setSurvivorName: (id: ID, name: string) => dispatch(setSurvivorName(id, name)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorListItemProps): ISurvivorListItemProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        id: ownProps.id,
        ...survivor,
        ...ownProps,
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
    }

    public render() {
        const { name, id, gender, alive, hunting } = this.props;
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
                <Cell>{this.props.baseStats && this.props.baseStats.movement}</Cell>
                <Cell>{this.props.baseStats && this.props.baseStats.accuracy}</Cell>
                <Cell>{this.props.baseStats && this.props.baseStats.strength}</Cell>
                <Cell>{this.props.baseStats && this.props.baseStats.evasion}</Cell>
                <Cell>{this.props.baseStats && this.props.baseStats.luck}</Cell>
                <Cell>{this.props.baseStats && this.props.baseStats.speed}</Cell>
                <Cell>{alive && <input type="checkbox" checked={hunting} onChange={this.handleHuntBoxChange} />}</Cell>
            </tr>
        );
    }

    private handleHuntBoxChange(event: SyntheticEvent<HTMLInputElement>) {
        if (!this.props.hunting) {
            this.props.addToHunt(this.props.id);
        } else {
            this.props.removeFromHunt(this.props.id);
        }
    }

    private handleNameClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editName: true,
        });
    }
    private handleNameBlur(e: SyntheticEvent<HTMLInputElement>) {
        this.props.setSurvivorName(this.props.id, e.currentTarget.value);
        this.setState({
            editName: false,
        });
    }

    private handleGenderClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editGender: true,
        });
    }
    private handleGenderChange(e: SyntheticEvent<HTMLSelectElement>) {
        const newGender = e.currentTarget.value === "M" ? Gender.Male : Gender.Female;
        this.props.setSurvivorGender(this.props.id, newGender);
        this.setState({
            editGender: false,
        });
    }

    private renderGenderSelect() {
        return (
            <select onChange={this.handleGenderChange}>
                <option value={Gender.Male} selected={this.props.gender === Gender.Male}>M</option>
                <option value={Gender.Female} selected={this.props.gender === Gender.Female}>F</option>
            </select>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListItem);
