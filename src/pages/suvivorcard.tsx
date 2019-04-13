import React from 'react'
import { RouteComponentProps } from 'react-router'
import { PlayerCard, PlayerCardHeadline } from '../components/GearGrid'
import Link from '../components/Link'
import SurvivorCard from '../components/SurvivorCard'

interface IPageMatchParams {
  cardnumber: string
}

const SurvivorCardPage: React.FunctionComponent<RouteComponentProps<IPageMatchParams>> = ({ match }) => (
  <PlayerCard>
    <PlayerCardHeadline>
      <Link to={`/`}>Back to overview</Link>
    </PlayerCardHeadline>
    <SurvivorCard id={parseInt(match.params.cardnumber, 10)} />
  </PlayerCard>
)

export default SurvivorCardPage
