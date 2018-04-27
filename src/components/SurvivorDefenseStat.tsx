import React from "react";
import { createRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import FancyButton from "./FancyButton";
import { HeavyWound, Input, Label, LightWound, StatElement, StatLayer, StatLayerHeadline, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorDefenseStatStatStateProps {
    statKey?: string;
    survivor?: ISurvivor;
}

interface ISurvivorDefenseStatDispatchProps {
    updateSurvivorStat: (Stat: ISurvivorBaseStat | IHitLocation) => UpdateSurvivorStatAction;
}

interface ISurvivorDefenseStatOwnProps {
    id: ID;
    stat: IHitLocation;
}

interface ISurvivorDefenceStatState {
    editSurvivorStat: boolean;
}

interface ISurvivorDefenseStatProps extends ISurvivorDefenseStatStatStateProps, ISurvivorDefenseStatOwnProps, ISurvivorDefenseStatDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): ISurvivorDefenseStatDispatchProps => ({
    updateSurvivorStat: (stat: ISurvivorBaseStat | IHitLocation) => dispatch(updateSurvivorStat(stat)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorDefenseStatOwnProps): ISurvivorDefenseStatStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    const statKey = survivor && Object.keys(survivor.baseStats).reduce((a, c) => {
        return survivor.baseStats[c].id === ownProps.stat.id ? c : a;
    });

    return {
        statKey,
        survivor: clone(survivor),
    };
};

class SurvivorDefenseStat extends React.Component<ISurvivorDefenseStatProps, ISurvivorDefenceStatState> {
    private armorfield: any;

    public constructor(props: ISurvivorDefenseStatProps) {
        super(props);
        this.state = {
            editSurvivorStat: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupArmorRef = this.setupArmorRef.bind(this);

        this.armorfield = createRef();
    }

    public render() {
        const { editSurvivorStat } = this.state;
        const { stat } = this.props;
        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick}>{stat.armor}</StatElement>
                {!stat.noWounds && !stat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, "lightWound")} className={stat.lightWound ? "active" : ""} />}
                {!stat.noWounds && <HeavyWound onClick={this.toggleWound.bind(this, "heavyWound")} className={stat.heavyWound ? "active" : ""} />}
                {editSurvivorStat && this.renderEditState()}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { armor, label } = this.props.stat;
        return (
            <StatLayer>
                <StatLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {label}</StatLayerHeadline>
                <Label>Stat</Label><Input innerRef={this.setupArmorRef} type="number" defaultValue={armor.toString()} name="armor" />
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </StatLayer>
        );
    }

    private setupArmorRef(elem: any) {
        this.armorfield = elem;
    }

    private toggleWound(woundType: string) {
        if (this.props && woundType === "lightWound" || (woundType === "heavyWound" && this.props.stat.lightWound)) {
            const newState = {
                ...this.props.stat,
                [woundType]: !this.props.stat[woundType],
            };
            this.props.updateSurvivorStat(newState);
        }
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorStat: true,
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        const nextStat = {
            ...this.props.stat,
            armor: parseInt(this.armorfield.value, 10),
        };
        if (this.props) {
            this.props.updateSurvivorStat(nextStat);
        }
        this.setState({
            editSurvivorStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorDefenseStat);
