import React from "react";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";

interface ISurvivorBaseStatStateProps {
    statKey?: string;
    survivor?: ISurvivor;
}

interface ISurvivorBaseStatDispatchProps {
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
}

interface ISurvivorBaseStatOwnProps {
    id: ID;
    stat: ISurvivorBaseStat;
}

interface ISurvivorBaseStatProps extends ISurvivorBaseStatStateProps, ISurvivorBaseStatDispatchProps, ISurvivorBaseStatOwnProps { }

interface ISurvivorBaseStatState {
    editSurvivorBaseStat: boolean;
    stat: ISurvivorBaseStat;
}

const Input = styled.input`
    width:70%;
    margin:.5rem 0;
`;

const Label = styled.div`
    width:30%;
    margin:.5rem 0;
`;

const LayerHeadline = styled.div`
    font-weight:bold;
    padding:.5rem;
    text-align:center;
    width:100%;
`;

const StatElement = styled.div`
    cursor:pointer;
    padding: .25rem;
    text-align:center;
`;

const StatWrapper = styled.div`
    position:relative;
`;

const StatLayer = styled.div`
    background:#fff;
    border:1px solid #ddd;
    border-radius: .5rem;
    box-shadow:3px 3px 10px;
    display:flex;
    flex-wrap:wrap;
    left:50%;
    padding:.5rem;
    position:absolute;
    top:50%;
    transform:translate3d(-50%, -50%, 0);
    width:30vw;
    z-index:10;
`;

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorAction>): ISurvivorBaseStatDispatchProps => ({
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorBaseStatOwnProps): ISurvivorBaseStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    const statKey = survivor && Object.keys(survivor.baseStats).reduce((a, c) => {
        return survivor.baseStats[c].id === ownProps.stat.id ? c : a;
    });
    const stat = survivor && statKey && survivor.baseStats[statKey];

    return {
        statKey,
        survivor: clone(survivor),
    };
};

class SurvivorBaseStat extends React.Component<ISurvivorBaseStatProps, ISurvivorBaseStatState> {
    public constructor(props: ISurvivorBaseStatProps) {
        super(props);
        this.state = {
            editSurvivorBaseStat: false,
            stat: props.stat,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditBlur = this.handleEditBlur.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);
    }

    public render() {
        const { editSurvivorBaseStat } = this.state;
        const { stat } = this.props;

        return (
            <StatWrapper>
                {editSurvivorBaseStat && this.renderEditState()}
                {!editSurvivorBaseStat && <StatElement onClick={this.handleEditClick}>{this.renderCombinedSurvivorBaseStat(stat)}</StatElement>}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { permanent, gear, token, label } = this.props.stat;
        return (
            <StatLayer>
                <LayerHeadline>{this.props.survivor && this.props.survivor.name}'s {label}</LayerHeadline>
                <Label>Perm</Label><Input type="number" defaultValue={permanent.toString()} name="permanent" onBlur={this.handleEditBlur} />
                <Label>Gear</Label><Input type="number" defaultValue={gear.toString()} name="gear" onBlur={this.handleEditBlur} />
                <Label>Token</Label><Input type="number" defaultValue={token.toString()} name="token" onBlur={this.handleEditBlur} />
                <button onClick={this.handleEditConfirm}>Save &#x2713;</button>
            </StatLayer>
        );
    }

    private renderCombinedSurvivorBaseStat(stat: ISurvivorBaseStat) {
        return stat.permanent + stat.gear + stat.token;
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorBaseStat: true,
        });
    }

    private handleEditBlur(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            stat: {
                ...this.state.stat,
                [e.currentTarget.name]: parseInt(e.currentTarget.value, 10),
            },
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.props.survivor && this.props.statKey) {
            this.props.survivor.baseStats[this.props.statKey] = {
                ...this.state.stat,
            };
            this.props.updateSurvivor(this.props.survivor);
        }
        this.setState({
            editSurvivorBaseStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorBaseStat);
