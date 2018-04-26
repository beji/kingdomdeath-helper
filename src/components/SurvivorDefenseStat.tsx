import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IHitLocation, ISettlement, ISurvivor, ISurvivorBaseStat } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import { HeavyWound, LightWound, StatWrapper } from "./SurvivorStatElements";

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

class SurvivorDefenseStat extends React.Component<ISurvivorDefenseStatProps> {
    public render() {
        const { stat } = this.props;
        return (
            <StatWrapper>
                {stat.armor}
                {!stat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, "lightWound")} className={stat.lightWound ? "active" : ""} />}
                <HeavyWound onClick={this.toggleWound.bind(this, "heavyWound")} className={stat.heavyWound ? "active" : ""} />
            </StatWrapper>
        );
    }

    private toggleWound(woundType: string) {
        console.log("taggleWound");
        if (this.props && woundType === "lightWound" || (woundType === "heavyWound" && this.props.stat.lightWound)) {
            const newState = {
                ...this.props.stat,
                [woundType]: !this.props.stat[woundType],
            };
            this.props.updateSurvivorStat(newState);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorDefenseStat);
