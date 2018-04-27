import React from "react";
import { Component, Fragment, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { addToHunt, removeFromHunt } from "../actions";
import { killSurvivor, reviveSurvivor, updateSurvivor } from "../actions/survivorActions";
import { Gender, ID, IGearGrid, ISettlement } from "../interfaces";
import { AddToHuntAction, RemoveFromHuntAction } from "../interfaces/huntActions";
import { ISurvivor } from "../interfaces/survivor";
import { KillSurvivorAction, ReviveSurvivorAction, UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import FancyButton from "./FancyButton";
import SurvivorBaseStat from "./SurvivorBaseStat";

interface ISurvivorListItemStateProps {
    survivor?: ISurvivor;
    geargrids: IGearGrid[];
    huntSlots: Array<{
        gridId: number,
        survivorId?: ID,
    }>;
}

interface ISurvivorListItemDispatchProps {
    addToHunt: (id: ID, gridId: number) => AddToHuntAction;
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
    addToHunt: (id: ID, gridId: number) => dispatch(addToHunt(id, gridId)),
    killSurvivor: (id: ID) => dispatch(killSurvivor(id)),
    removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
    reviveSurvivor: (id: ID) => dispatch(reviveSurvivor(id)),
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorListItemOwnProps): ISurvivorListItemStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    const { geargrids } = state;
    return {
        geargrids: state.geargrids,
        huntSlots: geargrids.map((v, i) => {
            return { gridId: i, survivorId: geargrids[i].survivorId };
        }),
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
            const { huntSlots } = this.props;
            const { name, id, gender, gridId, alive, hunting } = this.props.survivor;
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
                    <Cell><SurvivorBaseStat id={id} stat={movement} /></Cell>
                    <Cell><SurvivorBaseStat id={id} stat={accuracy} /></Cell>
                    <Cell><SurvivorBaseStat id={id} stat={strength} /></Cell>
                    <Cell><SurvivorBaseStat id={id} stat={evasion} /></Cell>
                    <Cell><SurvivorBaseStat id={id} stat={luck} /></Cell>
                    <Cell><SurvivorBaseStat id={id} stat={speed} /></Cell>
                    <Cell>
                        {alive && (<div><select value={hunting ? gridId : "remove"} onChange={this.handleHuntBoxChange}><option value="remove">not hunting</option>{huntSlots.map((v, i) => <option key={i} value={i}>Hunter {v.gridId + 1}</option>)}</select></div>)}
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

    private handleHuntBoxChange(event: SyntheticEvent<HTMLSelectElement>) {
        if (this.props.survivor) {
            if (event.currentTarget.value !== "remove") {
                this.props.addToHunt(this.props.id, parseInt(event.currentTarget.value, 10));
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
            const updateData = {
                ...this.props.survivor,
                name: e.currentTarget.value,
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
