import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { showLayer } from "../actions";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IDefenseStat, ISpecialStat, IState, SpecialStats } from "../interfaces";
import { ShowLayerAction, UpdateSurvivorStatAction } from "../interfaces/actions";
import { ISpecialStatLayer, LayerType } from "../interfaces/layer";
import { StatElement, StatWrapper } from "./SurvivorStatElements";

interface ISpecialStatStateProps {
    stat?: ISpecialStat;
    survivor?: ID;
}

interface ISpecialStatDispatchProps {
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
    showLayer: (layer: ISpecialStatLayer) => ShowLayerAction;
}

interface ISpecialStatOwnProps {
    id: ID;
    statid: SpecialStats;
}

interface ISpecialStatProps extends ISpecialStatStateProps, ISpecialStatDispatchProps, ISpecialStatOwnProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction | ShowLayerAction>): ISpecialStatDispatchProps => ({
    showLayer: (layer: ISpecialStatLayer) => dispatch(showLayer(layer)),
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: IState, ownProps: ISpecialStatOwnProps): ISpecialStatStateProps => {
    const survivor = state.settlement.survivors.find((v) => v.id === ownProps.id);

    return {
        stat: survivor ? survivor.specialstats.find((specialstat) => specialstat.stat === ownProps.statid) : undefined,
        survivor: survivor ? survivor.id : undefined,
    };
};

class SurvivorSpecialStat extends React.Component<ISpecialStatProps> {

    public constructor(props: ISpecialStatProps) {
        super(props);
        this.state = {
            showFightingArtList: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.renderSpecialStatText = this.renderSpecialStatText.bind(this);
    }

    public render() {
        const { stat } = this.props;
        if (stat) {
            return (
                <StatWrapper>
                    <StatElement onClick={this.handleEditClick}>
                        {stat.value}
                    </StatElement>
                    {this.renderSpecialStatText()}
                </StatWrapper>
            );
        }
        return "";
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        if (this.props.stat) {
            const { stat, value } = this.props.stat;
            this.props.showLayer({
                stat,
                survivor: this.props.id,
                type: LayerType.specialstat,
            });
        }
    }

    private renderSpecialStatText() {
        if (this.props.stat) {
            const { stat } = this.props;

            switch (stat.stat) {
                case SpecialStats.weapon_proficiency: {
                    if (stat.value === 8) {
                        return "Master";
                    } else if (stat.value >= 3) {
                        return "Specialist";
                    }
                }
                case SpecialStats.courage: {
                    if (stat.value === 9) {
                        return "See the Truth";
                    } else if (stat.value >= 3) {
                        return "Bold";
                    }
                }
                case SpecialStats.understanding: {
                    if (stat.value === 9) {
                        return "White Secret";
                    } else if (stat.value >= 3) {
                        return "Insight";
                    }
                }
                default: return "";
            }
        }
        return "";
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorSpecialStat);
