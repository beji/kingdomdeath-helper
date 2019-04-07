import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { BaseStats, IBaseStat, ID, IState } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { IBaseStatLayer, LayerType } from '../interfaces/layer'
import { StatElement, StatWrapper } from './SurvivorStatElements'

interface IBaseStatStateProps {
  survivor?: ID
  survivorname?: string
  stat?: IBaseStat
}

interface IBaseStatDispatchProps {
  showLayer: (layer: IBaseStatLayer) => ShowLayerAction
}

interface IBaseStatOwnProps {
  id: ID
  statid: BaseStats
}

interface IBaseStatProps extends IBaseStatStateProps, IBaseStatDispatchProps, IBaseStatOwnProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IBaseStatDispatchProps => ({
  showLayer: (layer: IBaseStatLayer) => dispatch(showLayer(layer)),
})

const mapStateToProps = (state: IState, ownProps: IBaseStatOwnProps): IBaseStatStateProps => {
  const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)

  return {
    stat: survivor ? survivor.baseStats.find(basestat => basestat.stat === ownProps.statid) : undefined,
    survivor: survivor ? survivor.id : undefined,
    survivorname: survivor ? survivor.name : '',
  }
}

class SurvivorBaseStat extends React.Component<IBaseStatProps> {
  private permfield?: HTMLInputElement
  private gearfield?: HTMLInputElement
  private tokenfield?: HTMLInputElement

  public constructor(props: IBaseStatProps) {
    super(props)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  public render() {
    const { stat } = this.props
    if (stat) {
      const classes = [stat.gear > 0 ? 'gear' : '', stat.token > 0 ? 'token' : '']
      return (
        <StatWrapper>
          <StatElement onClick={this.handleEditClick} className={classes.map(v => v).join(' ')}>
            {stat.permanent + stat.gear + stat.token}
          </StatElement>
        </StatWrapper>
      )
    }
    return ''
  }

  private handleEditClick() {
    if (this.props.stat) {
      this.props.showLayer({
        stat: this.props.stat.stat,
        survivor: this.props.id,
        type: LayerType.basestat,
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorBaseStat)
