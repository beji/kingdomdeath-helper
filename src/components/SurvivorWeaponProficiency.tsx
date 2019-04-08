import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { updateSurvivorWeaponProficiencyLevel } from '../actions/survivorActions'
import { ID, IState, ISurvivor } from '../interfaces'
import { UpdateSurvivorWeaponProficiencyLevelAction } from '../interfaces/actions'
import Checkbox from './Checkbox'

interface ISurvivorWeaponProficiencyStateProps {
  survivor?: ISurvivor
}

interface ISurvivorWeaponProficiencyOwnProps {
  id: ID
}

interface ISurvivorWeaponProficiencyDispatchProps {
  updateSurvivorWeaponProficiencyLevel: (id: ID, level: number) => UpdateSurvivorWeaponProficiencyLevelAction
}

interface ISurvivorWeaponProficiencyProps extends ISurvivorWeaponProficiencyStateProps, ISurvivorWeaponProficiencyOwnProps, ISurvivorWeaponProficiencyDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorWeaponProficiencyLevelAction>): ISurvivorWeaponProficiencyDispatchProps => ({
  updateSurvivorWeaponProficiencyLevel: (id: ID, level: number) => dispatch(updateSurvivorWeaponProficiencyLevel(id, level)),
})

const mapStateToProps = (state: IState, ownProps: ISurvivorWeaponProficiencyOwnProps): ISurvivorWeaponProficiencyStateProps => {
  const survivor = state.settlement.survivors.find(s => s.id === ownProps.id)
  return {
    survivor,
  }
}

class SurvivorWeaponProficiency extends React.Component<ISurvivorWeaponProficiencyProps> {
  public constructor(props: ISurvivorWeaponProficiencyProps) {
    super(props)
  }
  public render() {
    const { survivor } = this.props
    if (typeof survivor === 'undefined') {
      return <React.Fragment />
    }
    const { weaponproficiency, id } = survivor
    return (
      <div>
        {Array.apply(null, Array(8)).map((_el, n) => {
          const active = n < weaponproficiency.value
          const same = n === weaponproficiency.value - 1
          const highlight = n === 2 || n === 7
          // We pass n + 1 as arrays are zero based but displayed xp levels are not
          return <Checkbox key={n} highlight={highlight} value={active} onChange={() => this.props.updateSurvivorWeaponProficiencyLevel(id, same ? n : n + 1)} />
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorWeaponProficiency)
