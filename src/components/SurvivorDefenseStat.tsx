import { LayerEvents } from "interfaces/layer";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { DefenseStats, IBaseStat, ID, IDefenseStat, ISettlement } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import layerSubject from "../layerSubject";
import { capitalize } from "../util";
import NumberEdit from "./NumberEdit";
import { FancyButton } from "./StyledComponents";
import { HeavyWound, Label, LightWound, StatEdit, StatEditWrapper, StatElement, StatWrapper } from "./SurvivorStatElements";

interface ISurvivorDefenseStatStatStateProps {
    survivor?: ID;
    survivorname?: string;
    stat?: IDefenseStat;
}

interface ISurvivorDefenseStatDispatchProps {
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISurvivorDefenseStatOwnProps {
    id: ID;
    statid: DefenseStats;
    renderWounds?: boolean;
    concatToDisplay?: string;
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
        stat: survivor ? survivor.defenseStats.find((defensestat) => defensestat.stat === ownProps.statid) : undefined,
        survivor: survivor ? survivor.id : undefined,
        survivorname: survivor ? survivor.name : "",
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

        this.setupModifierRef = this.setupModifierRef.bind(this);
    }

    public render() {
        const { renderWounds } = this.state;
        const { stat, concatToDisplay } = this.props;
        if (stat) {
            return (
                <StatWrapper>
                    <StatElement onClick={this.handleEditClick}>{stat.armor + stat.modifier}{concatToDisplay && " " + concatToDisplay}</StatElement>
                    {renderWounds && !stat.noWounds && !stat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, "lightWound")} className={stat.lightWound ? "active" : ""} />}
                    {renderWounds && !stat.noWounds && <HeavyWound onClick={this.toggleWound.bind(this, "heavyWound")} className={stat.heavyWound ? "active" : ""} />}
                </StatWrapper>
            );
        }
        return "";
    }

    private setupModifierRef(elem: HTMLInputElement) {
        this.modifierfield = elem;
    }

    private toggleWound(woundType: string) {
        if (this.props.stat) {
            if (woundType === "lightWound" || (woundType === "heavyWound" && this.props.stat.lightWound) || (woundType === "heavyWound" && this.props.stat.onlyHeavyWound)) {
                const newState = {
                    ...this.props.stat,
                    [woundType]: !this.props.stat[woundType],
                };
                if (this.props.survivor) {
                    this.props.updateSurvivorStat(newState, this.props.survivor);
                }
            }
        }
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        if (this.props.stat) {
            const { stat, armor, modifier } = this.props.stat;
            layerSubject.next({
                payload: {
                    content: (
                        <React.Fragment>
                        <StatEditWrapper>
                            <StatEdit>
                                <Label>Stat</Label><NumberEdit value={modifier} innerRef={this.setupModifierRef} addToDisplay={armor} />
                                <div>Gear total: {armor}</div>
                            </StatEdit>
                        </StatEditWrapper>
                        <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
                    </React.Fragment>
                    ),
                    headline: <React.Fragment>{this.props.survivor && this.props.survivorname}'s {capitalize(DefenseStats[stat])}</React.Fragment>,
                },
                type: LayerEvents.show_simple,
            });
        }

    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.props.stat && this.modifierfield) {
            const nextStat = {
                ...this.props.stat,
                modifier: parseInt(this.modifierfield.value, 10),
            };
            if (this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor);
            }
        }
        layerSubject.next({
            payload: undefined,
            type: LayerEvents.hide,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorDefenseStat);
