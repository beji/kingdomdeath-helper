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

class SpecialStatLayer extends React.Component<ISpecialStatLayerProps> {
  private valueRef?: HTMLInputElement

  public constructor(props: ISpecialStatLayerProps) {
    super(props)
    this.hideLayer = this.hideLayer.bind(this)

    this.handleEditConfirm = this.handleEditConfirm.bind(this)
    this.setupValueRef = this.setupValueRef.bind(this)
  }
  public render() {
    if (this.props.stat && this.props.survivorname) {
      const { survivorname } = this.props
      const { stat, value } = this.props.stat
      return (
        <SimpleLayerWrapper>
          <CloseIcon onClick={this.hideLayer}>X</CloseIcon>
          <SimpleLayerHeadline>
            {survivorname}'s {specialStatToString(stat)}
          </SimpleLayerHeadline>
          <StatEditWrapper>
            <StatEdit>
              <Label>Value</Label>
              <NumberEdit value={value} innerRef={this.setupValueRef} />
            </StatEdit>
          </StatEditWrapper>
          <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
        </SimpleLayerWrapper>
      )
    } else {
      return ''
    }
  }

  private setupValueRef(elem: HTMLInputElement) {
    this.valueRef = elem
  }

  private hideLayer() {
    this.props.hideLayer()
  }

  private handleEditConfirm() {
    if (this.props.stat && this.valueRef) {
      const nextStat = {
        ...this.props.stat,
        value: parseInt(this.valueRef.value, 10),
      }
      if (typeof this.props.survivor !== 'undefined') {
        this.props.updateSurvivorStat(nextStat, this.props.survivor)
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecialStatLayer)
