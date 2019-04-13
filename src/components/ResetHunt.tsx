import React from 'react'
import { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { resetHunt } from '../actions'
import { ResetHuntAction } from '../interfaces/actions'
import { FancyButton } from './StyledComponents'

interface IResetHuntProps {
  resetHunt: () => ResetHuntAction
}

const mapDispatchToProps = (dispatch: Dispatch<ResetHuntAction>): IResetHuntProps => ({
  resetHunt: () => dispatch(resetHunt()),
})

const ResetHunt: React.FunctionComponent<IResetHuntProps> = ({ resetHunt }) => {
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (window.confirm('You sure? This will reset all stat modifiers and tokens!')) {
      resetHunt()
    }
  }
  return <FancyButton onClick={handleClick}>⚠ Reset hunt ⚠</FancyButton>
}

export default connect(
  null,
  mapDispatchToProps,
)(ResetHunt)
