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

class DisorderItem extends React.Component<IDisorderItemProps> {
  public constructor(props: IDisorderItemProps) {
    super(props)

    this.showDescription = this.showDescription.bind(this)
  }

  public render() {
    const { disorder } = this.props
    return <ListItem onClick={this.showDescription}>{disorder.name}</ListItem>
  }
  private showDescription() {
    const { disorder } = this.props
    this.props.showLayer({
      content: disorder.description,
      headline: disorder.name,
      type: LayerType.simple,
    })
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(DisorderItem)
