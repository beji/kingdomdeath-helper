import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { IDisorder, ISimpleLayer, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { ListItem } from './StyledComponents'

interface IDisorderItemOwnProps {
  disorder: IDisorder
}

interface IDisorderItemDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IDisorderItemProps extends IDisorderItemOwnProps, IDisorderItemDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IDisorderItemDispatchProps => ({
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
})

const DisorderItem: React.FunctionComponent<IDisorderItemProps> = ({ disorder, showLayer }) => {
  const showDescription = () => {
    showLayer({
      content: disorder.description,
      headline: disorder.name,
      type: LayerType.simple,
    })
  }
  return <ListItem onClick={showDescription}>{disorder.name}</ListItem>
}

export default connect(
  null,
  mapDispatchToProps,
)(DisorderItem)
