import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { setPlayerName, showLayer } from '../actions'
import { set as gearSets } from '../data/ItemDataHelper'
import { Affinity, AffinityTypes, GearSet, ID, IGearGrid, ISimpleLayer, IState, LayerType } from '../interfaces'
import { SetPlayerNameAction, ShowLayerAction } from '../interfaces/actions'
import { colors } from '../theme'
import AffinityIcon from './AffinityIcon'
import GridSlot from './GridSlot'
import NameEdit from './NameEdit'
import { Card, StyledText } from './StyledComponents'
import SurvivorCard from './SurvivorCard'

interface IGearGridState {
  grid?: IGearGrid
}

interface IGearGridStateProps {
  grid?: IGearGrid
}

interface IGearGridOwnProps {
  id: ID
}

interface IGearGridDispatchProps {
  setPlayerName: (name: string, gridId: ID) => SetPlayerNameAction
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IGearGridProps extends IGearGridStateProps, IGearGridOwnProps, IGearGridDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<SetPlayerNameAction | ShowLayerAction>): IGearGridDispatchProps => ({
  setPlayerName: (name: string, gridId: ID) => dispatch(setPlayerName(name, gridId)),
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
})

const mapStateToProps = (state: IState, ownProps: IGearGridOwnProps): IGearGridStateProps => {
  const geargrid = state.settlement.geargrids.find(v => {
    return v.id === ownProps.id
  })
  return {
    grid: geargrid,
  }
}

export const PlayerCard = styled.div`
  max-width: 80%;
  margin: 0 auto;
`

export const PlayerCardHeadline = styled.div`
  color: ${colors.text};
  font-weight: bold;
  text-align: center;
  margin: 0.5vh 0;
`

class GearGrid extends React.Component<IGearGridProps, IGearGridState> {
  public constructor(props: IGearGridProps) {
    super(props)
    this.handleSetPlayerName = this.handleSetPlayerName.bind(this)
  }

  public render() {
    const StyledGrid = styled(Card)`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin: 1vh 0;
    `
    const GridAffinities = styled.div`
      display: flex;
      font-size: 0.875rem;
      justify-content: space-around;
      margin: 0.25rem;
    `
    const GearSets = styled.div`
      padding: 0.25rem;
      text-align: center;
    `

    if (this.props.grid) {
      const { grid } = this.props
      return (
        <PlayerCard>
          <PlayerCardHeadline>
            <div>
              Player: <NameEdit name={grid.playername || 'not assigned'} updateFunc={this.handleSetPlayerName} />{' '}
            </div>
          </PlayerCardHeadline>
          {typeof grid.survivorId !== 'undefined' && <SurvivorCard key={grid.id} id={grid.survivorId} />}
          <GridAffinities>
            <StyledText>
              {grid.affinities && grid.affinities.reduce((acc, curr) => (curr === 0 ? acc + 1 : acc), 0)}x <AffinityIcon affinity={Affinity.red} type={AffinityTypes.grid} />
            </StyledText>
            <StyledText>
              {grid.affinities && grid.affinities.reduce((acc, curr) => (curr === 1 ? acc + 1 : acc), 0)}x <AffinityIcon affinity={Affinity.green} type={AffinityTypes.grid} />
            </StyledText>
            <StyledText>
              {grid.affinities && grid.affinities.reduce((acc, curr) => (curr === 2 ? acc + 1 : acc), 0)}x <AffinityIcon affinity={Affinity.blue} type={AffinityTypes.grid} />
            </StyledText>
          </GridAffinities>
          <StyledGrid>
            {Object.keys(grid.slots).map((v, i) => (
              <GridSlot key={i} gridId={grid.id} slotId={grid.slots[i].id} />
            ))}
          </StyledGrid>
          <GearSets>
            {/* tslint:disable-next-line: jsx-no-lambda */}
            {grid.gearSets && grid.gearSets.length > 0 && (
              <>
                Full gearsets:{' '}
                {grid.gearSets.map((setId: GearSet, idx: number) => (
                  <a key={idx} onClick={() => this.showGearSetDescription(setId)}>
                    {gearSets[setId].name}
                  </a>
                ))}
              </>
            )}
          </GearSets>
        </PlayerCard>
      )
    } else {
      return 'No valid grid id given!'
    }
  }

  private handleSetPlayerName(newName: string) {
    this.props.setPlayerName(newName, this.props.id)
  }

  private showGearSetDescription(setId: GearSet) {
    const { bonus } = gearSets[setId]
    if (bonus) {
      this.props.showLayer({
        content: bonus.desc,
        headline: name,
        type: LayerType.simple,
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GearGrid)
