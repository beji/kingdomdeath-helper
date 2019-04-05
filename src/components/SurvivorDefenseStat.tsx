import React, { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { updateSurvivorStat } from '../actions/survivorActions'
import { DefenseStats, IBaseStat, ID, IDefenseStat, IState } from '../interfaces'
import { ShowLayerAction, UpdateSurvivorStatAction } from '../interfaces/actions'
import { IDefenseStatLayer, LayerType } from '../interfaces/layer'
import Checkbox from './Checkbox'
import { StatElement, StatWrapper } from './SurvivorStatElements'

interface ISurvivorDefenseStatStatStateProps {
    survivor?: ID
    stat?: IDefenseStat
}

interface ISurvivorDefenseStatDispatchProps {
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction
    showLayer: (layer: IDefenseStatLayer) => ShowLayerAction
}

interface ISurvivorDefenseStatOwnProps {
    id: ID
    statid: DefenseStats
    renderWounds?: boolean
    concatToDisplay?: string
}

interface ISurvivorDefenceStatState {
    renderWounds: boolean
}

interface ISurvivorDefenseStatProps
    extends ISurvivorDefenseStatStatStateProps,
        ISurvivorDefenseStatOwnProps,
        ISurvivorDefenseStatDispatchProps {}

const mapDispatchToProps = (
    dispatch: Dispatch<UpdateSurvivorStatAction | ShowLayerAction>,
): ISurvivorDefenseStatDispatchProps => ({
    showLayer: (layer: IDefenseStatLayer) => dispatch(showLayer(layer)),
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) =>
        dispatch(updateSurvivorStat(stat, survivorId)),
})

const mapStateToProps = (state: IState, ownProps: ISurvivorDefenseStatOwnProps): ISurvivorDefenseStatStatStateProps => {
    const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)

    return {
        stat: survivor ? survivor.defenseStats.find(defensestat => defensestat.stat === ownProps.statid) : undefined,
        survivor: survivor ? survivor.id : undefined,
    }
}

class SurvivorDefenseStat extends React.Component<ISurvivorDefenseStatProps, ISurvivorDefenceStatState> {
    public constructor(props: ISurvivorDefenseStatProps) {
        super(props)
        this.state = {
            renderWounds: props.renderWounds === undefined ? true : props.renderWounds,
        }
        this.handleEditClick = this.handleEditClick.bind(this)
    }

    public render() {
        const { renderWounds } = this.state
        const { stat, concatToDisplay } = this.props
        if (stat) {
            return (
                <StatWrapper>
                    <StatElement onClick={this.handleEditClick}>
                        {stat.armor + stat.modifier}
                        {concatToDisplay && ' ' + concatToDisplay}
                    </StatElement>
                    {renderWounds && !stat.noWounds && !stat.onlyHeavyWound && (
                        <Checkbox onChange={this.toggleWound.bind(this, 'lightWound')} value={stat.lightWound} />
                    )}
                    {renderWounds && !stat.noWounds && (
                        <Checkbox
                            onChange={this.toggleWound.bind(this, 'heavyWound')}
                            value={stat.heavyWound}
                            highlight={true}
                        />
                    )}
                </StatWrapper>
            )
        }
        return ''
    }

    private toggleWound(woundType: string) {
        if (this.props.stat) {
            if (
                (woundType === 'lightWound' && !this.props.stat.heavyWound) ||
                (woundType === 'heavyWound' && this.props.stat.lightWound) ||
                (woundType === 'heavyWound' && this.props.stat.onlyHeavyWound)
            ) {
                const newState = {
                    ...this.props.stat,
                    [woundType]: !this.props.stat[woundType],
                }
                if (typeof this.props.survivor !== 'undefined') {
                    this.props.updateSurvivorStat(newState, this.props.survivor)
                }
            }
        }
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        if (this.props.stat) {
            this.props.showLayer({
                stat: this.props.stat.stat,
                survivor: this.props.id,
                type: LayerType.defensestat,
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SurvivorDefenseStat)
