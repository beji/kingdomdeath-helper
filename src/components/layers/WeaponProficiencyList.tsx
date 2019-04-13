import weaponproficiencies from 'data/final/weaponproficiencies'
import Fuse from 'fuse.js'
import { HideLayerAction, UpdateSurvivorWeaponProficiencyAction } from 'interfaces/actions'
import React, { SyntheticEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateWeaponProficiency } from '../../actions'
import { ID, IState, IWeaponProficiency, LayerType } from '../../interfaces'
import { WeaponProficiency } from '../../interfaces'
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement } from '../StyledComponents'

interface IWeaponProficiencylistState {
  selected?: WeaponProficiency
  proficiencies: ReadonlyArray<IWeaponProficiency>
}

interface IWeaponProficiencylistStateProps {
  currentlySelectedProficiency?: IWeaponProficiency
  survivor?: ID
}

interface IWeaponProficiencylistDispatchProps {
  hideLayer: () => HideLayerAction
  updateWeaponProficiency: (survivorId: ID, proficiency?: WeaponProficiency) => UpdateSurvivorWeaponProficiencyAction
}

interface IWeaponProficiencylistProps extends IWeaponProficiencylistStateProps, IWeaponProficiencylistDispatchProps {}

const mapStateToProps = (state: IState): IWeaponProficiencylistStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.weaponproficiencylist) {
    if (typeof state.interface.layer.survivor !== 'undefined') {
      const sid = state.interface.layer.survivor
      const survivor = state.settlement.survivors.find(s => s.id === sid)
      if (survivor) {
        return {
          currentlySelectedProficiency: typeof survivor.weaponProficiency !== 'undefined' ? survivor.weaponProficiency : undefined,
          survivor: survivor.id,
        }
      }
    }
  }

  return {
    currentlySelectedProficiency: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorWeaponProficiencyAction | HideLayerAction>): IWeaponProficiencylistDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateWeaponProficiency: (survivorId: ID, proficiency?: WeaponProficiency) => dispatch(updateWeaponProficiency(survivorId, proficiency)),
})

const WeaponProficiencylist: React.FunctionComponent<IWeaponProficiencylistProps> = ({ survivor, updateWeaponProficiency, hideLayer }) => {
  const [selected, setSelected] = useState<WeaponProficiency | undefined>(undefined)
  const [displayedProficiencies, setDisplayedProficiencies] = useState<ReadonlyArray<IWeaponProficiency>>(weaponproficiencies)

  const renderListElement = (proficiency: IWeaponProficiency) => {
    const isSelected = typeof selected !== 'undefined' && proficiency.id === selected
    if (isSelected) {
      return <SelectedListElement onClick={() => setSelected(undefined)}>{proficiency.name}</SelectedListElement>
    }
    return <ListElement onClick={() => setSelected(proficiency.id)}>{proficiency.name}</ListElement>
  }

  const submit = () => {
    if (typeof survivor !== 'undefined') {
      updateWeaponProficiency(survivor, selected)
      hideLayer()
    }
  }

  const handleFilter = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setDisplayedProficiencies(weaponproficiencies)
    } else {
      const fuse = new Fuse(weaponproficiencies, {
        keys: ['name'],
        threshold: 0.5,
      })
      setDisplayedProficiencies(fuse.search(event.currentTarget.value))
    }
  }

  if (typeof survivor !== 'undefined') {
    return (
      <ListWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <FilterInput type="text" placeholder="filter..." onChange={handleFilter} autoFocus={true} />
        <List>
          {displayedProficiencies.map((proficiency, idx) => (
            <React.Fragment key={idx}>{renderListElement(proficiency)}</React.Fragment>
          ))}
        </List>
        <FancyButton onClick={submit}>Submit</FancyButton>
      </ListWrapper>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeaponProficiencylist)
