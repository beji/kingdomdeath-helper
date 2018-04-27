import React from "react";
import { SyntheticEvent } from "react";
import { createRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import FancyButton from "./FancyButton";
import { Input, Label, StatElement, StatLayer, StatLayerHeadline, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorBaseStatStateProps {
    statKey?: string;
    survivor?: ISurvivor;
}

interface ISurvivorBaseStatDispatchProps {
    updateSurvivorStat: (Stat: ISurvivorBaseStat | IHitLocation) => UpdateSurvivorStatAction;
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
    updateSurvivorStat: (stat: ISurvivorBaseStat | IHitLocation) => dispatch(updateSurvivorStat(stat)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorBaseStatOwnProps): ISurvivorBaseStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    const statKey = survivor && Object.keys(survivor.baseStats).reduce((a, c) => {
        return survivor.baseStats[c].id === ownProps.stat.id ? c : a;
    });

    return {
        statKey,
        survivor: clone(survivor),
    };
};

class SurvivorBaseStat extends React.Component<ISurvivorBaseStatProps, ISurvivorBaseStatState> {

    private permfield: any;
    private gearfield: any;
    private tokenfield: any;

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

        this.permfield = createRef();
        this.gearfield = createRef();
        this.tokenfield = createRef();
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
        const { permanent, gear, token, label } = this.props.stat;
        return (
            <StatLayer>
                <StatLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {label}</StatLayerHeadline>
                <Label>Perm</Label><Input innerRef={this.setupPermRef} type="number" defaultValue={permanent.toString()} name="permanent" />
                <Label>Gear</Label><Input innerRef={this.setupGearRef} type="number" defaultValue={gear.toString()} name="gear" />
                <Label>Token</Label><Input innerRef={this.setupTokenRef} type="number" defaultValue={token.toString()} name="token" />
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </StatLayer>
        );
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorStat: true,
        });
    }

    private setupPermRef(elem: any) {
        this.permfield = elem;
    }

    private setupGearRef(elem: any) {
        this.gearfield = elem;
    }

    private setupTokenRef(elem: any) {
        this.tokenfield = elem;
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        const nextStat = {
            ...this.props.stat,
            gear: parseInt(this.gearfield.value, 10),
            permanent: parseInt(this.permfield.value, 10),
            token: parseInt(this.tokenfield.value, 10),
        };
        if (this.props) {
            this.props.updateSurvivorStat(nextStat);
        }
        this.setState({
            editSurvivorStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorBaseStat);
