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

class InnovationsPage extends React.Component<IInnovationsPageProps> {
  public render() {
    return (
      <StyledText>
        <h1>Taken</h1>
        <ul>{this.props.innovated.map((innovation, idx) => this.renderInnovation(innovation, idx, InnovationState.Taken))}</ul>
        <h1>Available</h1>
        <ul>{this.props.available.map((innovation, idx) => this.renderInnovation(innovation, idx, InnovationState.Available))}</ul>
        <h1>Not available</h1>
        <ul>{this.props.not_available.map((innovation, idx) => this.renderInnovation(innovation, idx, InnovationState.Not_Available))}</ul>
      </StyledText>
    )
  }

  private renderInnovation(id: Innovations, idx: number, state: InnovationState) {
    const innovation = innovations[id]
    return (
      <ListItem key={idx}>
        <Content>{innovation.name}</Content>
        <Content>
          <FancyButton onClick={this.handleDetailClick.bind(this, id)}>🔍</FancyButton>
        </Content>
        {(state === InnovationState.Available || state === InnovationState.Not_Available) && (
          <Content>
            <FancyButton onClick={this.handleAddClick.bind(this, id)}>Take</FancyButton>
          </Content>
        )}
        {state === InnovationState.Taken && (
          <Content>
            <FancyButton onClick={this.handleRemoveClick.bind(this, id)}>Remove</FancyButton>
          </Content>
        )}
      </ListItem>
    )
  }

  private handleDetailClick(id: Innovations) {
    const innovation = innovations[id]
    this.props.showLayer({
      content: innovation.description,
      headline: innovation.name,
      type: LayerType.simple,
    })
  }

  private handleAddClick(id: Innovations) {
    this.props.addInnovation(id)
  }

  private handleRemoveClick(id: Innovations) {
    this.props.removeInnovation(id)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InnovationsPage)
