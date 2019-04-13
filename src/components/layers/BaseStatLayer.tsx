import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateSurvivorStat } from '../../actions'
import { BaseStats, IBaseStat, ID, IDefenseStat, IState, LayerType } from '../../interfaces'
import { HideLayerAction, UpdateSurvivorStatAction } from '../../interfaces/actions'
import { capitalize } from '../../util'
import NumberEdit from '../NumberEdit'
import { CloseIcon, FancyButton, SimpleLayerHeadline, SimpleLayerWrapper } from '../StyledComponents'
import { Label, StatEdit, StatEditWrapper } from '../SurvivorStatElements'

interface IBaseStatLayerStateProps {
  survivor?: ID
  survivorname?: string
  stat?: IBaseStat
}

interface IBaseStatLayerDispatchProps {
  hideLayer: () => HideLayerAction
  updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction
}

interface IBaseStatLayerProps extends IBaseStatLayerStateProps, IBaseStatLayerDispatchProps {}

const mapStateToProps = (state: IState): IBaseStatLayerStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.basestat) {
    const layerData = state.interface.layer
    const survivor = state.settlement.survivors.find(s => s.id === layerData.survivor)
    if (survivor) {
      const stat = survivor.baseStats.find(basestat => basestat.stat === layerData.stat)
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

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateSurvivorStatAction>): IBaseStatLayerDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
})

const BaseStatLayer: React.FunctionComponent<IBaseStatLayerProps> = ({ hideLayer, stat, survivor, updateSurvivorStat, survivorname }) => {
  let permfield: HTMLInputElement | null = null
  let gearfield: HTMLInputElement | null = null
  let tokenfield: HTMLInputElement | null = null

  const setupPermRef = (elem: HTMLInputElement) => (permfield = elem)
  const setupGearRef = (elem: HTMLInputElement) => (gearfield = elem)
  const setupTokenRef = (elem: HTMLInputElement) => (tokenfield = elem)

  const handleEditConfirm = () => {
    if (gearfield && permfield && tokenfield && stat) {
      const nextStat = {
        ...stat,
        gear: parseInt(gearfield.value, 10),
        permanent: parseInt(permfield.value, 10),
        token: parseInt(tokenfield.value, 10),
      }
      if (typeof survivor !== 'undefined') {
        updateSurvivorStat(nextStat, survivor)
      }
    }
  }

  if (stat && survivorname) {
    const { permanent, gear, token } = stat
    return (
      <SimpleLayerWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <SimpleLayerHeadline>
          {survivorname}'s {capitalize(BaseStats[stat.stat])}
        </SimpleLayerHeadline>
        <StatEditWrapper>
          <StatEdit>
            <Label>Permanent</Label>
            <NumberEdit value={permanent} innerRef={setupPermRef} />
          </StatEdit>
          <StatEdit>
            <Label>Gear</Label>
            <NumberEdit value={gear} innerRef={setupGearRef} />
          </StatEdit>
          <StatEdit>
            <Label>Token</Label>
            <NumberEdit value={token} innerRef={setupTokenRef} />
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
)(BaseStatLayer)
