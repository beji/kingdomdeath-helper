import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IDefenseStat, ISettlement, ISpecialStat, ISurvivor, SpecialStats } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { capitalize, clone, specialStatToString } from "../util";
import FancyButton from "./FancyButton";
import NumberEdit from "./NumberEdit";
import { Label, StatEdit, StatElement, StatLayer, StatLayerHeadline, StatWrapper } from "./SurvivorStatElements";

interface ISpecialStatStateProps {
    survivor?: ISurvivor;
}

interface ISpecialStatDispatchProps {
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISpecialStatOwnProps {
    id: ID;
    stat: ISpecialStat;
}

interface ISpecialStatProps extends ISpecialStatStateProps, ISpecialStatDispatchProps, ISpecialStatOwnProps { }

interface ISpecialStatState {
    editSurvivorStat: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): ISpecialStatDispatchProps => ({
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISpecialStatOwnProps): ISpecialStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);

    return {
        survivor: clone(survivor),
    };
};

class SurvivorSpecialStat extends React.Component<ISpecialStatProps, ISpecialStatState> {

    private valuefield?: HTMLInputElement;

    public constructor(props: ISpecialStatProps) {
        super(props);
        this.state = {
            editSurvivorStat: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupValueRef = this.setupValueRef.bind(this);
    }

    public render() {
        const { editSurvivorStat } = this.state;
        const { stat } = this.props;

        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick}>
                    {stat.value}
                </StatElement>
                {editSurvivorStat && this.renderEditState()}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { stat, value } = this.props.stat;
        return (
            <StatLayer>
                <StatLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {specialStatToString(stat)}</StatLayerHeadline>
                <StatEdit>
                    <Label>Value</Label><NumberEdit value={value} innerRef={this.setupValueRef} />
                </StatEdit>
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </StatLayer>
        );
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorStat: true,
        });
    }

    private setupValueRef(elem: HTMLInputElement) {
        this.valuefield = elem;
    }
    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.valuefield) {
            const nextStat = {
                ...this.props.stat,
                value: parseInt(this.valuefield.value, 10),
            };
            if (this.props && this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor.id);
            }
        }
        this.setState({
            editSurvivorStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorSpecialStat);