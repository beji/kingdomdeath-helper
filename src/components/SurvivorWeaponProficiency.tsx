import weaponproficiencies from 'data/final/weaponproficiencies'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { updateSurvivorWeaponProficiencyLevel } from '../actions/survivorActions'
import { ID, IState, ISurvivor, IWeaponProficiencyLayer, LayerType } from '../interfaces'
import { ShowLayerAction, UpdateSurvivorWeaponProficiencyLevelAction } from '../interfaces/actions'
import Checkbox from './Checkbox'
import { FancyButton } from './StyledComponents'

interface ISurvivorWeaponProficiencyStateProps {
  survivor?: ISurvivor
}

interface ISurvivorWeaponProficiencyOwnProps {
  id: ID
}

interface ISurvivorWeaponProficiencyDispatchProps {
  showLayer: (layer: IWeaponProficiencyLayer) => ShowLayerAction
  updateSurvivorWeaponProficiencyLevel: (id: ID, level: number) => UpdateSurvivorWeaponProficiencyLevelAction
}

interface ISurvivorWeaponProficiencyProps extends ISurvivorWeaponProficiencyStateProps, ISurvivorWeaponProficiencyOwnProps, ISurvivorWeaponProficiencyDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction | UpdateSurvivorWeaponProficiencyLevelAction>): ISurvivorWeaponProficiencyDispatchProps => ({
  showLayer: (layer: IWeaponProficiencyLayer) => dispatch(showLayer(layer)),
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

  private showWeaponProficiencies = () => {
    this.props.showLayer({
      survivor: this.props.id,
      type: LayerType.weaponproficiencylist,
    })
  }

  public render() {
    const { survivor } = this.props
    if (typeof survivor === 'undefined') {
      return <React.Fragment />
    }
    const { weaponproficiency, id } = survivor
    return (
      <div>
        <div>
          <FancyButton onClick={this.showWeaponProficiencies}>Manage weapon proficiency</FancyButton>
        </div>
        {typeof weaponproficiency.proficiency !== 'undefined' && <div>{weaponproficiencies[weaponproficiency.proficiency].name}</div>}
        <div>
          {Array.apply(null, Array(8)).map((_el, n) => {
            const active = n < weaponproficiency.value
            const same = n === weaponproficiency.value - 1
            const highlight = n === 2 || n === 7
            // We pass n + 1 as arrays are zero based but displayed xp levels are not
            return <Checkbox key={n} highlight={highlight} value={active} onChange={() => this.props.updateSurvivorWeaponProficiencyLevel(id, same ? n : n + 1)} />
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorWeaponProficiency)
