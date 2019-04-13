import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateSurvivorStat } from '../../actions'
import { ID, ISpecialStat, IState, LayerType } from '../../interfaces'
import { HideLayerAction, UpdateSurvivorStatAction } from '../../interfaces/actions'
import { specialStatToString } from '../../util'
import NumberEdit from '../NumberEdit'
import { CloseIcon, FancyButton, SimpleLayerHeadline, SimpleLayerWrapper } from '../StyledComponents'
import { Label, StatEdit, StatEditWrapper } from '../SurvivorStatElements'

interface ISpecialStatLayerStateProps {
  survivor?: ID
  survivorname?: string
  stat?: ISpecialStat
}

interface ISpecialStatLayerDispatchProps {
  hideLayer: () => HideLayerAction
  updateSurvivorStat: (stat: ISpecialStat, survivorId: ID) => UpdateSurvivorStatAction
}

interface ISpecialStatLayerProps extends ISpecialStatLayerStateProps, ISpecialStatLayerDispatchProps {}

const mapStateToProps = (state: IState): ISpecialStatLayerStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.specialstat) {
    const layerData = state.interface.layer
    const survivor = state.settlement.survivors.find(s => s.id === layerData.survivor)
    if (survivor) {
      const stat = survivor.specialstats.find(specialstat => specialstat.stat === layerData.stat)
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

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateSurvivorStatAction>): ISpecialStatLayerDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorStat: (stat: ISpecialStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
})

const SpecialStatLayer: React.FunctionComponent<ISpecialStatLayerProps> = ({ stat, survivor, survivorname, hideLayer, updateSurvivorStat }) => {
  let valueRef: HTMLInputElement | null = null
  const setupValueRef = (elem: HTMLInputElement) => (valueRef = elem)

  const handleEditConfirm = () => {
    if (stat && valueRef) {
      const nextStat = {
        ...stat,
        value: parseInt(valueRef.value, 10),
      }
      if (typeof survivor !== 'undefined') {
        updateSurvivorStat(nextStat, survivor)
      }
    }
  }
  if (stat && survivorname) {
    const { value } = stat
    return (
      <SimpleLayerWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <SimpleLayerHeadline>
          {survivorname}'s {specialStatToString(stat.stat)}
        </SimpleLayerHeadline>
        <StatEditWrapper>
          <StatEdit>
            <Label>Value</Label>
            <NumberEdit value={value} innerRef={setupValueRef} />
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
)(SpecialStatLayer)
