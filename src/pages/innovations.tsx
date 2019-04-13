import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import innovations from '../../data/final/innovations'
import { addInnovation, removeInnovation, showLayer } from '../actions'
import { FancyButton, StyledText } from '../components/StyledComponents'
import { ISimpleLayer, IState, LayerType } from '../interfaces'
import { AddInnovationAction, RemoveInnovationAction, ShowLayerAction } from '../interfaces/actions'
import { Innovations } from '../interfaces/innovations'

interface IInnovationsPageStateProps {
  innovated: ReadonlyArray<Innovations>
  available: ReadonlyArray<Innovations>
  not_available: ReadonlyArray<Innovations>
}

interface IInnovationsPageDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
  addInnovation: (id: Innovations) => AddInnovationAction
  removeInnovation: (id: Innovations) => RemoveInnovationAction
}

interface IInnovationsPageProps extends IInnovationsPageStateProps, IInnovationsPageDispatchProps {}

const mapStateToProps = (state: IState): IInnovationsPageStateProps => {
  const available = innovations
    .filter(innovation => !state.settlement.innovations.includes(innovation.id))
    .filter(innovation => !innovation.consequence_of || state.settlement.innovations.includes(innovation.consequence_of))
    .map(innovation => innovation.id)
  return {
    available,
    innovated: state.settlement.innovations,
    not_available: innovations
      .filter(innovation => !available.includes(innovation.id))
      .filter(innovation => !state.settlement.innovations.includes(innovation.id))
      .map(innovation => innovation.id),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction | AddInnovationAction | RemoveInnovationAction>): IInnovationsPageDispatchProps => ({
  addInnovation: (id: Innovations) => dispatch(addInnovation(id)),
  removeInnovation: (id: Innovations) => dispatch(removeInnovation(id)),
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
})

const enum InnovationState {
  Taken,
  Available,
  Not_Available,
}

const ListItem = styled.li`
  display: flex;
  max-width: 30rem;
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  &:last-child {
    border-bottom: 1px solid #ccc;
  }
`
const Content = styled.span`
  flex: 1;
`

const InnovationsPage: React.FunctionComponent<IInnovationsPageProps> = ({ showLayer, addInnovation, removeInnovation, innovated, available, not_available }) => {
  const handleDetailClick = (id: Innovations) => {
    const innovation = innovations[id]
    showLayer({
      content: innovation.description,
      headline: innovation.name,
      type: LayerType.simple,
    })
  }
  const renderInnovation = (id: Innovations, idx: number, state: InnovationState) => {
    const innovation = innovations[id]
    return (
      <ListItem key={idx}>
        <Content>{innovation.name}</Content>
        <Content>
          <FancyButton onClick={() => handleDetailClick(id)}>🔍</FancyButton>
        </Content>
        {(state === InnovationState.Available || state === InnovationState.Not_Available) && (
          <Content>
            <FancyButton onClick={() => addInnovation(id)}>Take</FancyButton>
          </Content>
        )}
        {state === InnovationState.Taken && (
          <Content>
            <FancyButton onClick={() => removeInnovation(id)}>Remove</FancyButton>
          </Content>
        )}
      </ListItem>
    )
  }
  return (
    <StyledText>
      <h1>Taken</h1>
      <ul>{innovated.map((innovation, idx) => renderInnovation(innovation, idx, InnovationState.Taken))}</ul>
      <h1>Available</h1>
      <ul>{available.map((innovation, idx) => renderInnovation(innovation, idx, InnovationState.Available))}</ul>
      <h1>Not available</h1>
      <ul>{not_available.map((innovation, idx) => renderInnovation(innovation, idx, InnovationState.Not_Available))}</ul>
    </StyledText>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnovationsPage)
