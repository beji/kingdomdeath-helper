import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { baseStatToString, clone } from "../util";
import FancyButton from "./FancyButton";
import NumberEdit from "./NumberEdit";
import { Label, StatEdit, StatElement, StatLayer, StatLayerHeadline, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorBaseStatStateProps {
    survivor?: ISurvivor;
}

interface ISurvivorBaseStatDispatchProps {
    updateSurvivorStat: (stat: ISurvivorBaseStat | IHitLocation, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISurvivorBaseStatOwnProps {
    id: ID;
    stat: ISurvivorBaseStat;
}

interface ISurvivorBaseStatProps extends ISurvivorBaseStatStateProps, ISurvivorBaseStatDispatchProps, ISurvivorBaseStatOwnProps { }

interface ISurvivorBaseStatState {
    editSurvivorStat: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): ISurvivorBaseStatDispatchProps => ({
    updateSurvivorStat: (stat: ISurvivorBaseStat | IHitLocation, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorBaseStatOwnProps): ISurvivorBaseStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);

    return {
        survivor: clone(survivor),
    };
};

class SurvivorBaseStat extends React.Component<ISurvivorBaseStatProps, ISurvivorBaseStatState> {

    private permfield?: HTMLInputElement;
    private gearfield?: HTMLInputElement;
    private tokenfield?: HTMLInputElement;

    public constructor(props: ISurvivorBaseStatProps) {
        super(props);
        this.state = {
            editSurvivorStat: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupPermRef = this.setupPermRef.bind(this);
        this.setupGearRef = this.setupGearRef.bind(this);
        this.setupTokenRef = this.setupTokenRef.bind(this);

    }

    public render() {
        const { editSurvivorStat } = this.state;
        const { stat } = this.props;
        const classes = [
            stat.gear > 0 ? "gear" : "",
            stat.token > 0 ? "token" : "",
        ];

        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick} className={classes.map((v) => v).join(" ")}>
                    {stat.permanent + stat.gear + stat.token}
                </StatElement>
                {editSurvivorStat && this.renderEditState()}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { permanent, gear, token, stat } = this.props.stat;
        return (
            <StatLayer>
                <StatLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {baseStatToString(stat)}</StatLayerHeadline>
                <StatEdit>
                    <Label>Permanent</Label><NumberEdit value={permanent} innerRef={this.setupPermRef} />
                </StatEdit>
                <StatEdit>
                    <Label>Gear</Label><NumberEdit value={gear} innerRef={this.setupGearRef} />
                </StatEdit>
                <StatEdit>
                    <Label>Token</Label><NumberEdit value={token} innerRef={this.setupTokenRef} />
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

    private setupPermRef(elem: HTMLInputElement) {
        this.permfield = elem;
    }

    private setupGearRef(elem: HTMLInputElement) {
        this.gearfield = elem;
    }

    private setupTokenRef(elem: HTMLInputElement) {
        this.tokenfield = elem;
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.gearfield && this.permfield && this.tokenfield) {
            const nextStat = {
                ...this.props.stat,
                gear: parseInt(this.gearfield.value, 10),
                permanent: parseInt(this.permfield.value, 10),
                token: parseInt(this.tokenfield.value, 10),
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

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorBaseStat);
