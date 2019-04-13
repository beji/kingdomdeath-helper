import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { createSurvivor } from '../actions/survivorActions'
import { CreateSurvivorAction } from '../interfaces/actions'
import { FancyButton } from './StyledComponents'

interface ICreateSurvivorDispatchProps {
  createSurvivor: () => CreateSurvivorAction
}

const mapDispatchToProps = (dispatch: Dispatch<CreateSurvivorAction>): ICreateSurvivorDispatchProps => ({
  createSurvivor: () => dispatch(createSurvivor()),
})

const CreateSurvivor: React.FunctionComponent<ICreateSurvivorDispatchProps> = ({ createSurvivor }) => <FancyButton onClick={() => createSurvivor()}>Create Survivor</FancyButton>

export default connect(
  null,
  mapDispatchToProps,
)(CreateSurvivor)
