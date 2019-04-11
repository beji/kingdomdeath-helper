import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { IFightingArt, ISimpleLayer, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { colorMagentaLachs } from './StyledComponents'

interface IFightingArtItemOwnProps {
  art: IFightingArt
}

interface IFightingArtItemDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IFightingArtItemProps extends IFightingArtItemOwnProps, IFightingArtItemDispatchProps {}

const FightingArtItemWrapper = styled.div`
  cursor: pointer;
  margin-top: 1vh;
  margin-bottom: 1vh;
  &:before {
    content: '►';
    color: ${colorMagentaLachs};
    margin-right: 0.25rem;
  }
`

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

  return <FightingArtItemWrapper onClick={showDescription}>{art.name}</FightingArtItemWrapper>
}

export default connect(
  null,
  mapDispatchToProps,
)(FightingArtItem)
