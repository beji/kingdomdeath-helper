import React, { Fragment, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { addToHunt, removeFromHunt } from '../actions'
import { killSurvivor, removeSurvivor, reviveSurvivor, updateSurvivorName } from '../actions/survivorActions'
import { BaseStats, DefenseStats, IBaseStat, ID, IDefenseStat, IGearGrid, IState, ISurvivor } from '../interfaces'
import { AddToHuntAction, KillSurvivorAction, RemoveFromHuntAction, RemoveSurvivorAction, ReviveSurvivorAction, UpdateSurvivorNameAction } from '../interfaces/actions'
import { colors } from '../theme'
import { capitalize, clone, darken } from '../util'
import GenderEdit from './GenderEdit'
import Link from './Link'
import NameEdit from './NameEdit'
import { colorMagentaLachs, FancyButton } from './StyledComponents'
import SurvivorBaseStat from './SurvivorBaseStat'
import SurvivorDefenseStat from './SurvivorDefenseStat'

interface ISurvivorListItemStateProps {
  survivor?: ISurvivor
  geargrids: ReadonlyArray<IGearGrid>
  huntSlots: {
    gridId: number
    playername: string
    survivorId?: ID
  }[]
}

interface ISurvivorListItemDispatchProps {
  addToHunt: (id: ID, gridId: number) => AddToHuntAction
  removeFromHunt: (id: ID) => RemoveFromHuntAction
  killSurvivor: (id: ID) => KillSurvivorAction
  reviveSurvivor: (id: ID) => ReviveSurvivorAction
  removeSurvivor: (id: ID) => RemoveSurvivorAction
  updateSurvivorName: (id: ID, name: string) => UpdateSurvivorNameAction
}

interface ISurvivorListItemOwnProps {
  id: ID
}

interface ISurvivorListItemProps extends ISurvivorListItemOwnProps, ISurvivorListItemStateProps, ISurvivorListItemDispatchProps {}

export const Cell = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 1vh 1vw;
  border: 1px solid ${colors.hintedBorder};
  text-align: center;
  @media only screen and (min-device-width: 667px) {
    flex: 1;
    flex-shrink: 0;
    text-align: left;
  }
`

const NameCell = styled(Cell)`
  border-color: ${darken(colorMagentaLachs, 0.2)};
  border-width: 0.2rem;
  @media only screen and (min-device-width: 667px) {
    border-color: ${colors.hintedBorder};
    border-width: 1px;
  }
`

const ItemWrapper = styled.div`
  margin-bottom: 2vh;
  padding: 0;
  @media only screen and (min-device-width: 667px) {
    display: flex;
    flex: wrap;
    margin: 0;
  }
`

const SmallSpaceLabel = styled.div`
  display: block;
  font-weight: bold;
  :after {
    content: ':';
  }
  @media only screen and (min-device-width: 667px) {
    display: none;
  }
`

const FullscreenLink = styled(Link)`
  text-decoration: none;
`

const mapDispatchToProps = (
  dispatch: Dispatch<AddToHuntAction | RemoveFromHuntAction | KillSurvivorAction | ReviveSurvivorAction | UpdateSurvivorNameAction | RemoveSurvivorAction>,
): ISurvivorListItemDispatchProps => ({
  addToHunt: (id: ID, gridId: number) => dispatch(addToHunt(id, gridId)),
  killSurvivor: (id: ID) => dispatch(killSurvivor(id)),
  removeFromHunt: (id: ID) => dispatch(removeFromHunt(id)),
  removeSurvivor: (id: ID) => dispatch(removeSurvivor(id)),
  reviveSurvivor: (id: ID) => dispatch(reviveSurvivor(id)),
  updateSurvivorName: (id: ID, name: string) => dispatch(updateSurvivorName(id, name)),
})

const mapStateToProps = (state: IState, ownProps: ISurvivorListItemOwnProps): ISurvivorListItemStateProps => {
  const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)
  const { geargrids } = state.settlement
  return {
    geargrids: state.settlement.geargrids,
    huntSlots: geargrids.map((v, i) => {
      return {
        gridId: i,
        playername: v.playername || `Slot ${i + 1}`,
        survivorId: v.survivorId,
      }
    }),
    survivor: clone(survivor),
  }
}

const renderBaseStats = (baseStats: ReadonlyArray<IBaseStat>, id: ID) =>
  baseStats.map((basestat, idx) => (
    <Cell key={idx}>
      <SmallSpaceLabel>{capitalize(BaseStats[basestat.stat])}</SmallSpaceLabel>
      <SurvivorBaseStat id={id} statid={basestat.stat} />
    </Cell>
  ))

const renderDefStats = (defenseStats: ReadonlyArray<IDefenseStat>, id: ID) =>
  defenseStats
    .filter(defStat => defStat.stat === DefenseStats.brain || defStat.stat === DefenseStats.survival)
    .map((defStat, idx) => (
      <Cell key={idx}>
        <SmallSpaceLabel>{capitalize(DefenseStats[defStat.stat])}</SmallSpaceLabel>
        <SurvivorDefenseStat id={id} statid={defStat.stat} renderWounds={false} />
      </Cell>
    ))

const SurvivorListItem: React.FunctionComponent<ISurvivorListItemProps> = ({
  id,
  survivor,
  updateSurvivorName,
  addToHunt,
  removeFromHunt,
  killSurvivor,
  reviveSurvivor,
  removeSurvivor,
  huntSlots,
}) => {
  const handleNameUpdate = (newName: string) => {
    if (survivor) {
      updateSurvivorName(survivor.id, newName)
    }
  }

  const handleHuntBoxChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    if (survivor) {
      if (event.currentTarget.value !== 'remove') {
        addToHunt(id, parseInt(event.currentTarget.value, 10))
      } else {
        removeFromHunt(id)
      }
    }
  }

  const handleKillClick = () => killSurvivor(id)

  const handleReviveClick = () => reviveSurvivor(id)

  const handleRemoveClick = () => {
    if (survivor) {
      if (window.confirm("You sure? this can't be undone!")) {
        removeSurvivor(survivor.id)
      }
    }
  }

  if (survivor) {
    const { name, id, gridId, alive, hunting, baseStats, defenseStats } = survivor

    return (
      <ItemWrapper>
        <NameCell>
          <SmallSpaceLabel>Name</SmallSpaceLabel>
          <NameEdit name={name} updateFunc={handleNameUpdate} />
          {!alive && <Fragment>✝</Fragment>}
          <FullscreenLink to={`/card/${id}`}>⛶</FullscreenLink>
        </NameCell>
        <Cell>
          <SmallSpaceLabel>Gender</SmallSpaceLabel>
          <GenderEdit id={id} />
        </Cell>
        {renderDefStats(defenseStats, id)}
        {renderBaseStats(baseStats, id)}
        <Cell>
          <SmallSpaceLabel>Hunting</SmallSpaceLabel>
          {alive && (
            <div>
              <select value={hunting ? gridId : 'remove'} onChange={handleHuntBoxChange}>
                <option value="remove">not hunting</option>
                {huntSlots.map((v, i) => (
                  <option key={i} value={i}>
                    Grid: {v.playername}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Cell>
        <Cell>
          <SmallSpaceLabel>Kill/Revive/Remove</SmallSpaceLabel>
          {alive ? <FancyButton onClick={handleKillClick}>Kill</FancyButton> : <FancyButton onClick={handleReviveClick}>Revive</FancyButton>}
          {!hunting && <FancyButton onClick={handleRemoveClick}>Remove</FancyButton>}
        </Cell>
      </ItemWrapper>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorListItem)
