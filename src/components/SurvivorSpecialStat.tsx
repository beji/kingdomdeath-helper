import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { updateSurvivorStat } from '../actions/survivorActions'
import { TextIcons } from '../data/Enums'
import { ID, IDefenseStat, ISpecialStat, IState, SpecialStats } from '../interfaces'
import { ShowLayerAction, UpdateSurvivorStatAction } from '../interfaces/actions'
import { ISpecialStatLayer, LayerType } from '../interfaces/layer'
import { StatElement, StatWrapper } from './SurvivorStatElements'

interface ISpecialStatStateProps {
  stat?: ISpecialStat
  survivor?: ID
}

interface ISpecialStatDispatchProps {
  updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction
  showLayer: (layer: ISpecialStatLayer) => ShowLayerAction
}

interface ISpecialStatOwnProps {
  id: ID
  statid: SpecialStats
}

interface ISpecialStatProps extends ISpecialStatStateProps, ISpecialStatDispatchProps, ISpecialStatOwnProps {}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction | ShowLayerAction>): ISpecialStatDispatchProps => ({
  showLayer: (layer: ISpecialStatLayer) => dispatch(showLayer(layer)),
  updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
})

const mapStateToProps = (state: IState, ownProps: ISpecialStatOwnProps): ISpecialStatStateProps => {
  const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)

  return {
    stat: survivor ? survivor.specialstats.find(specialstat => specialstat.stat === ownProps.statid) : undefined,
    survivor: survivor ? survivor.id : undefined,
  }
}

const renderSpecialStatText = (stat: ISpecialStat) => {
  if (stat) {
    switch (stat.stat) {
      case SpecialStats.huntxp: {
        if ([2, 6, 10, 15].includes(stat.value)) {
          return `${TextIcons.BOOK} Age`
        } else if (stat.value === 16) {
          return 'Retired'
        }
        break
      }
      case SpecialStats.weapon_proficiency: {
        if (stat.value === 8) {
          return 'Master'
        } else if (stat.value >= 3) {
          return 'Specialist'
        }
      }
      case SpecialStats.courage: {
        if (stat.value === 9) {
          return `${TextIcons.BOOK} See the Truth`
        } else if (stat.value >= 3) {
          return `${TextIcons.BOOK} Bold`
        }
      }
      case SpecialStats.understanding: {
        if (stat.value === 9) {
          return `${TextIcons.BOOK} White Secret`
        } else if (stat.value >= 3) {
          return `${TextIcons.BOOK} Insight`
        }
      }
      default:
        return ''
    }
  }
  return ''
}

const SurvivorSpecialStat: React.FunctionComponent<ISpecialStatProps> = ({ id, stat, showLayer }) => {
  const handleEditClick = () => {
    if (stat) {
      showLayer({
        stat: stat.stat,
        survivor: id,
        type: LayerType.specialstat,
      })
    }
  }
  if (stat) {
    return (
      <StatWrapper>
        <StatElement onClick={handleEditClick}>{stat.value}</StatElement>
        {renderSpecialStatText(stat)}
      </StatWrapper>
    )
  }
  return <React.Fragment />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorSpecialStat)
