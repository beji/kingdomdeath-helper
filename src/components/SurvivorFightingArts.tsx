import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { ID, IFightingArt, IFightingartListLayer, IState, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import FightingArtItem from './FightingArtItem'
import { FancyButton } from './StyledComponents'

interface IFightingArtsStateProps {
  fightingArts: ReadonlyArray<IFightingArt>
}

interface IFightingArtsOwnProps {
  id: ID
}

interface IFightingArtsDispatchProps {
  showLayer: (layer: IFightingartListLayer) => ShowLayerAction
}

interface IFightingArtsProps extends IFightingArtsStateProps, IFightingArtsOwnProps, IFightingArtsDispatchProps {}

const FightingArtItemsWrapper = styled.div`
  text-align: left;
`

const FightingArtsWrapper = styled.div`
  flex: 1;
  flex-grow: 2;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
`

const mapStateToProps = (state: IState, ownProps: IFightingArtsOwnProps): IFightingArtsStateProps => {
  const survivor = state.settlement.survivors.find(s => s.id === ownProps.id)
  const fightingArts = survivor && survivor.fightingArts ? survivor.fightingArts : []
  return {
    fightingArts,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IFightingArtsDispatchProps => ({
  showLayer: (layer: IFightingartListLayer) => dispatch(showLayer(layer)),
})

const SurvivorFightingArts: React.FunctionComponent<IFightingArtsProps> = ({ id, showLayer, fightingArts }) => {
  const showFightingArtList = () => {
    showLayer({
      survivor: id,
      type: LayerType.fightingartlist,
    })
  }
  if (fightingArts.length > 0) {
    return (
      <FightingArtsWrapper>
        <FightingArtItemsWrapper>
          {fightingArts.map((art, idx) => (
            <FightingArtItem key={idx} art={art} />
          ))}
        </FightingArtItemsWrapper>
        <FancyButton onClick={showFightingArtList}>Manage Fighting Arts</FancyButton>
      </FightingArtsWrapper>
    )
  } else {
    return (
      <FightingArtsWrapper>
        <FancyButton onClick={showFightingArtList}>Manage Fighting Arts</FancyButton>
      </FightingArtsWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorFightingArts)
