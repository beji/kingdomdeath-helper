import weaponproficiencies from 'data/final/selectableStats'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { updateSurvivorWeaponProficiencyLevel } from '../actions/survivorActions'
import { ID, IState, ISurvivor, IWeaponProficiencyLayer, LayerType } from '../interfaces'
import { ShowLayerAction, UpdateSurvivorWeaponProficiencyLevelAction } from '../interfaces/actions'
import Checkbox from './Checkbox'
import { FancyButton } from './StyledComponents'
import WeaponProficiencyItem from './WeaponProficiencyItem'

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

const Wrapper = styled.section`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.card.border.hint};
  border-top: 1px solid ${props => props.theme.card.border.hint};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`
const ManageBox = styled.div`
  flex: 1;
  margin-top: 0.5vh;
`

const ProficiencyBox = styled.div`
  flex: 1;
`

const BoxWithMargins = styled.div`
  flex: 1;
  margin-top: 1vh;
  margin-bottom: 1vh;
`

class SurvivorWeaponProficiency extends React.Component<ISurvivorWeaponProficiencyProps> {
  public constructor(props: ISurvivorWeaponProficiencyProps) {
    super(props)
    this.renderRankText = this.renderRankText.bind(this)
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
      <Wrapper>
        <ManageBox>
          <FancyButton onClick={this.showWeaponProficiencies}>Manage weapon proficiency</FancyButton>
        </ManageBox>
        <ProficiencyBox>
          {typeof weaponproficiency.proficiency !== 'undefined' && <WeaponProficiencyItem proficiency={weaponproficiencies[weaponproficiency.proficiency]} />}
        </ProficiencyBox>
        <BoxWithMargins>
          {Array.apply(null, Array(8)).map((_el, n) => {
            const active = n < weaponproficiency.value
            const same = n === weaponproficiency.value - 1
            const highlight = n === 2 || n === 7
            // We pass n + 1 as arrays are zero based but displayed xp levels are not
            return <Checkbox key={n} highlight={highlight} value={active} onChange={() => this.props.updateSurvivorWeaponProficiencyLevel(id, same ? n : n + 1)} />
          })}
        </BoxWithMargins>
        {this.renderRankText()}
      </Wrapper>
    )
  }

  private renderRankText() {
    const { survivor } = this.props
    if (typeof survivor === 'undefined') {
      return <BoxWithMargins />
    }
    const {
      weaponproficiency: { value: value },
    } = survivor

    if (value === 8) {
      return <BoxWithMargins>Master</BoxWithMargins>
    } else if (value >= 3) {
      return <BoxWithMargins>Specialist</BoxWithMargins>
    } else {
      return <BoxWithMargins />
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurvivorWeaponProficiency)
