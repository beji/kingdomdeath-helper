import React from 'react'
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

interface ISurvivorDefenseStatProps extends ISurvivorDefenseStatStatStateProps, ISurvivorDefenseStatOwnProps, ISurvivorDefenseStatDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction | ShowLayerAction>): ISurvivorDefenseStatDispatchProps => ({
  showLayer: (layer: IDefenseStatLayer) => dispatch(showLayer(layer)),
  updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
})

const mapStateToProps = (state: IState, ownProps: ISurvivorDefenseStatOwnProps): ISurvivorDefenseStatStatStateProps => {
  const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)

  return {
    stat: survivor ? survivor.defenseStats.find(defensestat => defensestat.stat === ownProps.statid) : undefined,
    survivor: survivor ? survivor.id : undefined,
  }
}

const SurvivorDefenseStat: React.FunctionComponent<ISurvivorDefenseStatProps> = ({ renderWounds, stat, concatToDisplay, survivor, updateSurvivorStat, showLayer, id }) => {
  const toggleWound = (woundType: string) => {
    if (stat) {
      if ((woundType === 'lightWound' && !stat.heavyWound) || (woundType === 'heavyWound' && stat.lightWound) || (woundType === 'heavyWound' && stat.onlyHeavyWound)) {
        const newState = {
          ...stat,
          [woundType]: !stat[woundType],
        }
        if (typeof survivor !== 'undefined') {
          updateSurvivorStat(newState, survivor)
        }
      }
    }
  }

  const handleEditClick = () => {
    if (stat) {
      showLayer({
        stat: stat.stat,
        survivor: id,
        type: LayerType.defensestat,
      })
    }
  }
  if (stat) {
    return (
      <StatWrapper>
        <StatElement onClick={handleEditClick}>
          {stat.armor + stat.modifier}
          {concatToDisplay && ' ' + concatToDisplay}
        </StatElement>
        {renderWounds && !stat.noWounds && !stat.onlyHeavyWound && <Checkbox onChange={() => toggleWound('lightWound')} value={stat.lightWound} />}
        {renderWounds && !stat.noWounds && <Checkbox onChange={() => toggleWound('heavyWound')} value={stat.heavyWound} highlight={true} />}
      </StatWrapper>
    )
  }
  return <React.Fragment />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorDefenseStat)
