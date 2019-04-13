import React, { useState } from 'react'
import { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { updateSurvivorGender } from '../actions/survivorActions'
import { Gender, ID, IState, ISurvivor } from '../interfaces'
import { UpdateSurvivorGenderAction } from '../interfaces/actions'
import { capitalize, clone } from '../util'

interface IGenderEditDispatchProps {
  updateSurvivorGender: (id: ID, gender: Gender) => UpdateSurvivorGenderAction
}

interface IGenderEditStateProps {
  survivor?: ISurvivor
}

interface IGenderEditOwnProps {
  id: ID
}

interface IGenderEditProps extends IGenderEditOwnProps, IGenderEditStateProps, IGenderEditDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorGenderAction>): IGenderEditDispatchProps => ({
  updateSurvivorGender: (id: ID, gender: Gender) => dispatch(updateSurvivorGender(id, gender)),
})

const mapStateToProps = (state: IState, ownProps: IGenderEditOwnProps): IGenderEditStateProps => {
  const survivor = state.settlement.survivors.find(v => v.id === ownProps.id)
  return {
    survivor: clone(survivor),
  }
}

const GenderEdit: React.FunctionComponent<IGenderEditProps> = ({ survivor, updateSurvivorGender }) => {
  const [editGender, setEdit] = useState(false)
  const handleGenderClick = () => setEdit(true)

  const handleGenderChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    if (typeof survivor !== 'undefined') {
      const newGender = parseInt(e.currentTarget.value, 10) as Gender
      updateSurvivorGender(survivor.id, newGender)
      setEdit(false)
    }
  }
  const gender = typeof survivor !== 'undefined' ? survivor.gender : Gender.male
  if (!editGender) {
    return <span onClick={handleGenderClick}>{capitalize(Gender[gender])}</span>
  } else {
    return (
      <select onChange={handleGenderChange} defaultValue={gender.toString()}>
        <option value={Gender.male}>{capitalize(Gender[Gender.male])}</option>
        <option value={Gender.female}>{capitalize(Gender[Gender.female])}</option>
      </select>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenderEdit)
