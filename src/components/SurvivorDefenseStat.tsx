import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { DefenseStats, IBaseStat, ID, IDefenseStat, ISettlement, ISurvivor } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { capitalize, clone } from "../util";
import FancyButton from "./FancyButton";
import NumberEdit from "./NumberEdit";
import { HeavyWound, Label, LightWound, StatEdit, StatElement, StatLayer, StatLayerHeadline, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorDefenseStatStatStateProps {
    survivor?: ISurvivor;
}

interface ISurvivorDefenseStatDispatchProps {
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISurvivorDefenseStatOwnProps {
    id: ID;
    stat: IDefenseStat;
}

interface ISurvivorDefenceStatState {
    editSurvivorStat: boolean;
}

interface ISurvivorDefenseStatProps extends ISurvivorDefenseStatStatStateProps, ISurvivorDefenseStatOwnProps, ISurvivorDefenseStatDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): ISurvivorDefenseStatDispatchProps => ({
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorDefenseStatOwnProps): ISurvivorDefenseStatStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);

    return {
        survivor: clone(survivor),
    };
};

class SurvivorDefenseStat extends React.Component<ISurvivorDefenseStatProps, ISurvivorDefenceStatState> {
    private armorfield?: HTMLInputElement;
    private modifierfield?: HTMLInputElement;

    public constructor(props: ISurvivorDefenseStatProps) {
        super(props);
        this.state = {
            editSurvivorStat: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupArmorRef = this.setupArmorRef.bind(this);
        this.setupModifierRef = this.setupModifierRef.bind(this);
    }

    public render() {
        const { editSurvivorStat } = this.state;
        const { stat } = this.props;
        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick}>{stat.armor + stat.modifier}</StatElement>
                {!stat.noWounds && !stat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, "lightWound")} className={stat.lightWound ? "active" : ""} />}
                {!stat.noWounds && <HeavyWound onClick={this.toggleWound.bind(this, "heavyWound")} className={stat.heavyWound ? "active" : ""} />}
                {editSurvivorStat && this.renderEditState()}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { armor, stat, modifier } = this.props.stat;
        return (
            <StatLayer>
                <StatLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {capitalize(DefenseStats[stat])}</StatLayerHeadline>
                <StatEdit>
                    <Label>Stat</Label><NumberEdit value={armor} innerRef={this.setupArmorRef} />
                </StatEdit>
                <StatEdit>
                    <Label>Modifier</Label><NumberEdit value={modifier} innerRef={this.setupModifierRef} />
                </StatEdit>
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </StatLayer>
        );
    }

    private setupModifierRef(elem: HTMLInputElement) {
        this.modifierfield = elem;
    }

    private setupArmorRef(elem: HTMLInputElement) {
        this.armorfield = elem;
    }

    private toggleWound(woundType: string) {
        if (this.props && woundType === "lightWound" || (woundType === "heavyWound" && this.props.stat.lightWound) || (woundType === "heavyWound" && this.props.stat.onlyHeavyWound)) {
            const newState = {
                ...this.props.stat,
                [woundType]: !this.props.stat[woundType],
            };
            if (this.props.survivor) {
                this.props.updateSurvivorStat(newState, this.props.survivor.id);
            }
        }
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorStat: true,
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.armorfield && this.modifierfield) {
            const nextStat = {
                ...this.props.stat,
                armor: parseInt(this.armorfield.value, 10),
                modifier: parseInt(this.modifierfield.value, 10),
            };
            if (this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor.id);
            }
        }
        this.setState({
            editSurvivorStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorDefenseStat);
