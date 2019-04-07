import React from 'react'
import { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { updateSurvivorGender } from '../actions/survivorActions'
import { Gender, ID, IState, ISurvivor } from '../interfaces'
import { UpdateSurvivorGenderAction } from '../interfaces/actions'
import { capitalize, clone } from '../util'

interface IGenderEditState {
  editGender: boolean
}

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

class GenderEdit extends React.Component<IGenderEditProps, IGenderEditState> {
  public constructor(props: IGenderEditProps) {
    super(props)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleGenderClick = this.handleGenderClick.bind(this)
    this.state = {
      editGender: false,
    }
  }

  public render() {
    const { editGender } = this.state
    const gender = this.props.survivor ? this.props.survivor.gender : Gender.male
    if (!editGender) {
      return <span onClick={this.handleGenderClick}>{capitalize(Gender[gender])}</span>
    } else {
      return (
        <select onChange={this.handleGenderChange} defaultValue={gender.toString()}>
          <option value={Gender.male}>{capitalize(Gender[Gender.male])}</option>
          <option value={Gender.female}>{capitalize(Gender[Gender.female])}</option>
        </select>
      )
    }
  }

  private handleGenderClick() {
    this.setState({
      editGender: true,
    })
  }

  private handleGenderChange(e: SyntheticEvent<HTMLSelectElement>) {
    if (this.props.survivor) {
      const newGender = parseInt(e.currentTarget.value, 10) as Gender

      this.props.updateSurvivorGender(this.props.survivor.id, newGender)

      this.setState({
        editGender: false,
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenderEdit)
