import React from "react";
import { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement, ISurvivor } from "../interfaces";
import { IComplexStat } from "../interfaces/survivor";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";

interface IComplexStatProps {
    id: ID;
    stat: IComplexStat;
    statKey?: string;
    survivor?: ISurvivor;
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
}

interface IComplexStatState {
    editComplexStat: boolean;
    stat: IComplexStat;
}
const EditInput = styled.input`
    width:25%;
`;

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorAction>) => ({
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: IComplexStatProps): IComplexStatProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    const statKey = survivor && Object.keys(survivor.baseStats).reduce((a, c) => {
        return survivor.baseStats[c].label === ownProps.stat.label ? c : a;
    });
    const stat = survivor && statKey && survivor.baseStats[statKey];

    return {
        id: ownProps.id,
        stat: clone(stat),
        statKey,
        survivor: clone(survivor),
        ...ownProps,
    };
};

class ComplexStat extends Component<IComplexStatProps, IComplexStatState> {
    public constructor(props: IComplexStatProps) {
        super(props);
        this.state = {
            editComplexStat: false,
            stat: props.stat,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditBlur = this.handleEditBlur.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);
    }

    public render() {
        const { editComplexStat } = this.state;
        const { stat } = this.props;

        return (
            <div>
                {editComplexStat && this.renderEditState()}
                {!editComplexStat && <span onClick={this.handleEditClick}>{this.renderCombinedComplexStat(stat)}</span>}
            </div>
        );
    }

    private renderEditState() {
        return (
            <div>
                P<EditInput type="number" defaultValue={this.props.stat.permanent.toString()} title="permanent" onBlur={this.handleEditBlur} />
                G<EditInput type="number" defaultValue={this.props.stat.gear.toString()} title="gear" onBlur={this.handleEditBlur} />
                T<EditInput type="number" defaultValue={this.props.stat.token.toString()} title="token" onBlur={this.handleEditBlur} />
                <button onClick={this.handleEditConfirm}>Check</button>
            </div>
        );
    }

    private renderCombinedComplexStat(stat: IComplexStat) {
        return stat.permanent + stat.gear + stat.token;
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editComplexStat: true,
        });
    }

    private handleEditBlur(e: SyntheticEvent<HTMLInputElement>) {
        const newState = this.state.stat;
        newState[e.currentTarget.title] = parseInt(e.currentTarget.value, 10);
        this.setState({
            stat: newState,
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.props.survivor && this.props.statKey) {
            this.props.survivor.baseStats[this.props.statKey] = {
                ...this.props.survivor.baseStats[this.props.statKey],
                gear: this.state.stat.gear,
                permanent: this.state.stat.permanent,
                token: this.state.stat.token,
            };
            this.props.updateSurvivor(this.props.survivor);
        }
        this.setState({
            editComplexStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplexStat);
