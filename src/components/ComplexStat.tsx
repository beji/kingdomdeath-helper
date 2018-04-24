import React from "react";
import { SyntheticEvent } from "react";
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

const Input = styled.input`
    width:70%;
    margin:.5rem 0;
`;

const Label = styled.div`
    width:30%;
    margin:.5rem 0;
`;

const StatElement = styled.div`
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

class ComplexStat extends React.Component<IComplexStatProps, IComplexStatState> {
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
            <StatWrapper>
                {editComplexStat && this.renderEditState()}
                {!editComplexStat && <StatElement onClick={this.handleEditClick}>{this.renderCombinedComplexStat(stat)}</StatElement>}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { permanent, gear, token } = this.props.stat;
        return (
            <StatLayer>
                <Label>Perm</Label><Input type="number" defaultValue={permanent.toString()} name="permanent" onBlur={this.handleEditBlur} />
                <Label>Gear</Label><Input type="number" defaultValue={gear.toString()} name="gear" onBlur={this.handleEditBlur} />
                <Label>Token</Label><Input type="number" defaultValue={token.toString()} name="token" onBlur={this.handleEditBlur} />
                <button onClick={this.handleEditConfirm}>Check</button>
            </StatLayer>
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
            editComplexStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplexStat);
