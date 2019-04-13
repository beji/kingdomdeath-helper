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

const FightingArtItem: React.FunctionComponent<IFightingArtItemProps> = ({ art, showLayer }) => {
  const showDescription = () => {
    showLayer({
      content: art.description,
      headline: art.name,
      type: LayerType.simple,
    })
  }

  return <ListItem onClick={showDescription}>{art.name}</ListItem>
}

export default connect(
  null,
  mapDispatchToProps,
)(FightingArtItem)
