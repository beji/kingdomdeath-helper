import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateSurvivorStat } from '../../actions'
import { DefenseStats, IBaseStat, ID, IDefenseStat, IState, LayerType } from '../../interfaces'
import { HideLayerAction, UpdateSurvivorStatAction } from '../../interfaces/actions'
import { capitalize } from '../../util'
import NumberEdit from '../NumberEdit'
import { CloseIcon, FancyButton, SimpleLayerHeadline, SimpleLayerWrapper } from '../StyledComponents'
import { Label, StatEdit, StatEditWrapper } from '../SurvivorStatElements'

interface IDefenseStatLayerStateProps {
  survivor?: ID
  survivorname?: string
  stat?: IDefenseStat
}

interface IDefenseStatLayerDispatchProps {
  hideLayer: () => HideLayerAction
  updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction
}

interface IDefenseStatLayerProps extends IDefenseStatLayerStateProps, IDefenseStatLayerDispatchProps {}

const mapStateToProps = (state: IState): IDefenseStatLayerStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.defensestat) {
    const layerData = state.interface.layer
    const survivor = state.settlement.survivors.find(s => s.id === layerData.survivor)
    if (survivor) {
      const stat = survivor.defenseStats.find(defensestat => defensestat.stat === layerData.stat)
      if (stat) {
        return {
          stat,
          survivor: survivor.id,
          survivorname: survivor.name,
        }
      }
    }
  }
  return {
    stat: undefined,
    survivor: undefined,
    survivorname: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateSurvivorStatAction>): IDefenseStatLayerDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
})

const DefenseStatLayer: React.FunctionComponent<IDefenseStatLayerProps> = ({ hideLayer, stat, survivor, updateSurvivorStat, survivorname }) => {
  let modifierfield: HTMLInputElement | null = null

  const setupModifierRef = (elem: HTMLInputElement) => (modifierfield = elem)

  const handleEditConfirm = () => {
    if (stat && modifierfield) {
      const nextStat = {
        ...stat,
        modifier: parseInt(modifierfield.value, 10),
      }
      if (typeof survivor !== 'undefined') {
        updateSurvivorStat(nextStat, survivor)
      }
    }
  }

  if (stat && survivorname) {
    const { armor, modifier } = stat
    return (
      <SimpleLayerWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <SimpleLayerHeadline>
          {survivorname}'s {capitalize(DefenseStats[stat.stat])}
        </SimpleLayerHeadline>
        <StatEditWrapper>
          <StatEdit>
            <Label>Stat</Label>
            <NumberEdit value={modifier} innerRef={setupModifierRef} addToDisplay={armor} />
            <div>Gear total: {armor}</div>
          </StatEdit>
        </StatEditWrapper>
        <FancyButton onClick={handleEditConfirm}>Save &#x2713;</FancyButton>
      </SimpleLayerWrapper>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefenseStatLayer)
