import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { ID, IDisorder, IDisorderListLayer, IState, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import DisorderItem from './DisorderItem'
import { FancyButton } from './StyledComponents'

interface ISurvivorDisordersOwnProps {
  id: ID
}

interface ISurvivorDisordersStateProps {
  disorders: ReadonlyArray<IDisorder>
}

interface ISurvivorDisordersDispatchProps {
  showLayer: (layer: IDisorderListLayer) => ShowLayerAction
}

interface ISurvivorDisordersProps extends ISurvivorDisordersOwnProps, ISurvivorDisordersStateProps, ISurvivorDisordersDispatchProps {}

const DisordersWrapper = styled.div`
  flex: 1;
  flex-grow: 2;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`

const ItemWrapper = styled.div`
  text-align: left;
`

const mapStateToProps = (state: IState, ownProps: ISurvivorDisordersOwnProps): ISurvivorDisordersStateProps => {
  const survivor = state.settlement.survivors.find(s => s.id === ownProps.id)
  const disorders = survivor && survivor.disorders ? survivor.disorders : []
  return {
    disorders,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): ISurvivorDisordersDispatchProps => ({
  showLayer: (layer: IDisorderListLayer) => dispatch(showLayer(layer)),
})

const SurvivorDisorders: React.FunctionComponent<ISurvivorDisordersProps> = ({ id, disorders }) => {
  const showList = () => {
    showLayer({
      survivor: id,
      type: LayerType.disorderlist,
    })
  }
  if (disorders.length > 0) {
    return (
      <DisordersWrapper>
        <ItemWrapper>
          {disorders.map((disorder, idx) => (
            <DisorderItem key={idx} disorder={disorder} />
          ))}
        </ItemWrapper>
        <FancyButton onClick={showList}>Manage Disorders</FancyButton>
      </DisordersWrapper>
    )
  } else {
    return (
      <DisordersWrapper>
        <FancyButton onClick={showList}>Manage Disorders</FancyButton>
      </DisordersWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorDisorders)
