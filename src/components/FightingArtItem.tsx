import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { IFightingArt, ISimpleLayer, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { ListItem } from './StyledComponents'

interface IFightingArtItemOwnProps {
  art: IFightingArt
}

interface IFightingArtItemDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IFightingArtItemProps extends IFightingArtItemOwnProps, IFightingArtItemDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IFightingArtItemDispatchProps => ({
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
})

class FightingArtItem extends React.Component<IFightingArtItemProps> {
  public constructor(props: IFightingArtItemProps) {
    super(props)

    this.showDescription = this.showDescription.bind(this)
  }

  public render() {
    const { art } = this.props
    return <ListItem onClick={this.showDescription}>{art.name}</ListItem>
  }
  private showDescription() {
    const { art } = this.props
    this.props.showLayer({
      content: art.description,
      headline: art.name,
      type: LayerType.simple,
    })
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(FightingArtItem)
