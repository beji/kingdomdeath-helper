import React from "react";
import { Component, Fragment, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions";
import { updateSurvivor } from "../actions/survivorActions";
import { Gender, ID, ISettlement } from "../interfaces";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { IStats, ISurvivor } from "../interfaces/survivor";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";

interface ISurvivorListItemProps {
    id: ID;
    survivor?: ISurvivor;
    addToHunt: (id: ID) => AddToHuntAction;
    removeFromHunt: (id: ID) => RemoveFromHuntAction;
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
}

interface ISurvivorListItemState {
    editName: boolean;
    editGender: boolean;
}

const Cell = styled.td`
    border: 1px solid #333;
    padding: 0.25vh 0.25vw;
`;

const mapDispatchToProps = (dispatch: Dispatch<AddToHuntAction | RemoveFromHuntAction | UpdateSurvivorAction>) => ({
    addToHunt: (id: ID) => dispatch(addToHunt(id)),
    removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorListItemProps): ISurvivorListItemProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        id: ownProps.id,
        survivor: clone(survivor),
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
                    <Cell>{movement}</Cell>
                    <Cell>{accuracy}</Cell>
                    <Cell>{strength}</Cell>
                    <Cell>{evasion}</Cell>
                    <Cell>{luck}</Cell>
                    <Cell>{speed}</Cell>
                    <Cell>{alive && <input type="checkbox" checked={hunting} onChange={this.handleHuntBoxChange} />}</Cell>
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
            const { name, id, gender, alive, hunting, baseStats } = this.props.survivor;
            const updateData = {
                alive, baseStats, gender: newGender, hunting, id, name,
            } as ISurvivor;
            this.props.updateSurvivor(updateData);

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
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListItem);
