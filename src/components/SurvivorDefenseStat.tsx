import { LayerEvents } from "interfaces/layer";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { DefenseStats, IBaseStat, ID, IDefenseStat, ISettlement, ISurvivor } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import layerSubject from "../layerSubject";
import { capitalize, clone } from "../util";
import FancyButton from "./FancyButton";
import NumberEdit from "./NumberEdit";
import { HeavyWound, Label, LightWound, StatEdit, StatEditWrapper, StatElement, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorDefenseStatStatStateProps {
    survivor?: ISurvivor;
}

interface ISurvivorDefenseStatDispatchProps {
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISurvivorDefenseStatOwnProps {
    id: ID;
    stat: IDefenseStat;
    renderWounds?: boolean;
}

interface ISurvivorDefenceStatState {
    renderWounds: boolean;
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
    private modifierfield?: HTMLInputElement;

    public constructor(props: ISurvivorDefenseStatProps) {
        super(props);
        this.state = {
            renderWounds: props.renderWounds === undefined ? true : props.renderWounds,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupModifierRef = this.setupModifierRef.bind(this);
    }

    public render() {
        const { renderWounds } = this.state;
        const { stat } = this.props;
        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick}>{stat.armor + stat.modifier}</StatElement>
                {renderWounds && !stat.noWounds && !stat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, "lightWound")} className={stat.lightWound ? "active" : ""} />}
                {renderWounds && !stat.noWounds && <HeavyWound onClick={this.toggleWound.bind(this, "heavyWound")} className={stat.heavyWound ? "active" : ""} />}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { armor, stat, modifier } = this.props.stat;
        return (
            <React.Fragment>
                <StatEditWrapper>
                    <StatEdit>
                        <Label>Stat</Label><NumberEdit value={modifier} innerRef={this.setupModifierRef} addToDisplay={armor} />
                        <div>Gear total: {armor}</div>
                    </StatEdit>
                </StatEditWrapper>
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </React.Fragment>
        );
    }

    private setupModifierRef(elem: HTMLInputElement) {
        this.modifierfield = elem;
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
        const { stat } = this.props.stat;
        layerSubject.next({
            payload: {
                content: this.renderEditState(),
                headline: <React.Fragment>{this.props.survivor && this.props.survivor.name}'s {capitalize(DefenseStats[stat])}</React.Fragment>,
            },
            type: LayerEvents.show_simple,
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.modifierfield) {
            const nextStat = {
                ...this.props.stat,
                modifier: parseInt(this.modifierfield.value, 10),
            };
            if (this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor.id);
            }
        }
        layerSubject.next({
            payload: undefined,
            type: LayerEvents.hide,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorDefenseStat);
