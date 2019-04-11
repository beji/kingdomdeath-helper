import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { IDisorder, ISimpleLayer, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { colorMagentaLachs } from './StyledComponents'

interface IDisorderItemOwnProps {
  disorder: IDisorder
}

interface IDisorderItemDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IDisorderItemProps extends IDisorderItemOwnProps, IDisorderItemDispatchProps {}

const DisorderItemWrapper = styled.div`
  cursor: pointer;
  margin-top: 1vh;
  margin-bottom: 1vh;
  &:before {
    content: '►';
    color: ${colorMagentaLachs};
    margin-right: 0.25rem;
  }
`

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
  return <DisorderItemWrapper onClick={showDescription}>{disorder.name}</DisorderItemWrapper>
}

export default connect(
  null,
  mapDispatchToProps,
)(DisorderItem)
