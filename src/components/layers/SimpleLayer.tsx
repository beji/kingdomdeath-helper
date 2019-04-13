import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer } from '../../actions'
import { ISimpleLayer, IState, LayerType } from '../../interfaces'
import { HideLayerAction } from '../../interfaces/actions'
import { clone } from '../../util'
import { CloseIcon, SimpleLayerHeadline, SimpleLayerWrapper } from '../StyledComponents'

interface ISimpleLayerStateProps {
  layer?: ISimpleLayer
}

interface ISimpleLayerDispatchProps {
  hideLayer: () => HideLayerAction
}

interface ISimpleLayerProps extends ISimpleLayerStateProps, ISimpleLayerDispatchProps {}

const mapStateToProps = (state: IState): ISimpleLayerStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.simple) {
    return {
      layer: clone(state.interface.layer),
    }
  }
  return {
    layer: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction>): ISimpleLayerDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
})

const SimpleLayer: React.FunctionComponent<ISimpleLayerProps> = ({ hideLayer, layer }) => {
  if (layer) {
    const { headline, content } = layer
    return (
      <SimpleLayerWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        {headline && <SimpleLayerHeadline>{headline}</SimpleLayerHeadline>}
        {content}
      </SimpleLayerWrapper>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleLayer)
