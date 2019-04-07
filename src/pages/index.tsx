import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CreateSurvivor from '../components/CreateSurvivor'
import GearGrid from '../components/GearGrid'
import ResetHunt from '../components/ResetHunt'
import SettlementName from '../components/SettlementName'
import { Card, StyledText } from '../components/StyledComponents'
import SurvivorListItem, { Cell } from '../components/SurvivorListItem'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import { Gender, ID, IState, UUID } from '../interfaces'
import { colors } from '../theme'

const AppWrapper = styled.div``

const SurvivorList = styled(Card)`
  display: block;
  max-width: 100%;
  overflow-x: auto;
  margin: 2vh 0;
`

const SurvivorListHead = styled.div`
  display: none;
  flex: wrap;
  margin: 0;
  padding: 0;
  @media only screen and (min-device-width: 667px) {
    display: flex;
    flex: wrap;
  }
`

const SurvivorListHeadCell = styled(Cell)`
  flex: 1;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
  font-weight: bold;
  border-color: ${colors.hintedBorder};
`

interface IGearGridEntry {
  name?: string
  id: ID
}

interface IAppProps {
  huntingSurvivors?: ID[]
  survivors?: ID[]
  name?: string
  aliveCount?: number
  aliveFemale?: number
  aliveMale?: number
  geargrids?: IGearGridEntry[]
  id?: UUID
}

const mapStateToProps = (state: IState): IAppProps => {
  const { survivors } = state.settlement
  return {
    aliveCount: survivors.filter(survivor => survivor.alive).length,
    aliveFemale: survivors.filter(survivor => survivor.alive && survivor.gender === Gender.female).length,
    aliveMale: survivors.filter(survivor => survivor.alive && survivor.gender === Gender.male).length,
    geargrids: state.settlement.geargrids.map(grid => {
      return {
        id: grid.id,
        name: grid.playername,
      }
    }),
    huntingSurvivors: state.settlement.survivors.filter(survivor => survivor.hunting).map(survivor => survivor.id),
    id: state.settlement.id,
    name: state.settlement.name,
    survivors: state.settlement.survivors.map(survivor => survivor.id),
  }
}

class App extends React.Component<IAppProps> {
  public render() {
    const { geargrids, survivors, aliveCount, aliveFemale, aliveMale } = this.props

    return (
      <AppWrapper>
        <SettlementName />
        <TabList>
          {geargrids &&
            geargrids.map(
              ({ id, name }, idx) =>
                name && (
                  <Tab label={name} key={idx}>
                    <GearGrid id={id} />
                  </Tab>
                ),
            )}
        </TabList>
        <div>
          <ResetHunt />
        </div>
        <StyledText>
          Population: {aliveCount ? aliveCount : 0} (&#x2642; {aliveMale}, &#x2640; {aliveFemale}), dead:{' '}
          {aliveCount && this.props.survivors ? this.props.survivors.length - aliveCount : 'all of them apparently'}
        </StyledText>
        <SurvivorList>
          <SurvivorListHead>
            <SurvivorListHeadCell>Name</SurvivorListHeadCell>
            <SurvivorListHeadCell>Gender</SurvivorListHeadCell>
            <SurvivorListHeadCell>Insanity</SurvivorListHeadCell>
            <SurvivorListHeadCell>Survival</SurvivorListHeadCell>
            <SurvivorListHeadCell>Accuracy</SurvivorListHeadCell>
            <SurvivorListHeadCell>Evasion</SurvivorListHeadCell>
            <SurvivorListHeadCell>Luck</SurvivorListHeadCell>
            <SurvivorListHeadCell>Movement</SurvivorListHeadCell>
            <SurvivorListHeadCell>Speed</SurvivorListHeadCell>
            <SurvivorListHeadCell>Strength</SurvivorListHeadCell>
            <SurvivorListHeadCell>Hunting</SurvivorListHeadCell>
            <SurvivorListHeadCell>Kill/Revive</SurvivorListHeadCell>
          </SurvivorListHead>
          {survivors && survivors.map((id, idx) => this.renderSurvivorListItem(idx, id))}
        </SurvivorList>
        <CreateSurvivor />
      </AppWrapper>
    )
  }

  private renderSurvivorListItem(idx: number, id: ID) {
    return <SurvivorListItem key={idx} id={id} />
  }
}

export default connect(mapStateToProps)(App)
