import React from 'react'
import { RouteComponentProps } from 'react-router'
import { PlayerCard, PlayerCardHeadline } from '../components/GearGrid'
import Link from '../components/Link'
import SurvivorCard from '../components/SurvivorCard'

interface IPageMatchParams {
  cardnumber: string
}

class SurvivorCardPage extends React.Component<RouteComponentProps<IPageMatchParams>> {
  public render() {
    const { match } = this.props
    return (
      <PlayerCard>
        <PlayerCardHeadline>
          <Link to={`/`}>Back to overview</Link>
        </PlayerCardHeadline>
        <SurvivorCard id={parseInt(match.params.cardnumber, 10)} />
      </PlayerCard>
    )
  }
}

export default SurvivorCardPage
