import disorders from 'data/final/disorder.json'
import Fuse from 'fuse.js'
import React, { SyntheticEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateSurvivorDisorders } from '../../actions'
import { Disorders, ID, IDisorder, IState, LayerType } from '../../interfaces'
import { HideLayerAction, UpdateSurvivorDisordersAction } from '../../interfaces/actions'
import { deduplicate } from '../../util'
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement, SimpleLayerHeadline } from './../StyledComponents'

interface IDisorderslistState {
  disordersToAdd: Disorders[]
  disordersToRemove: Disorders[]
  disorders: IDisorder[]
}

interface IDisorderslistStateProps {
  currentlySelectedDisorders?: Disorders[]
  id?: ID
}

interface IDisorderslistDispatchProps {
  hideLayer: () => HideLayerAction
  updateSurvivorDisorder: (id: ID, arts: Disorders[]) => UpdateSurvivorDisordersAction
}

interface IDisorderslistProps extends IDisorderslistStateProps, IDisorderslistDispatchProps {}

const mapStateToProps = (state: IState): IDisorderslistStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.disorderlist) {
    if (typeof state.interface.layer.survivor !== 'undefined') {
      const sid = state.interface.layer.survivor
      const survivor = state.settlement.survivors.find(s => s.id === sid)
      if (survivor) {
        return {
          currentlySelectedDisorders: survivor.disorders ? survivor.disorders.map(disorder => disorder.id) : [],
          id: sid,
        }
      }
    }
  }
  return {
    currentlySelectedDisorders: undefined,
    id: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorDisordersAction | HideLayerAction>): IDisorderslistDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorDisorder: (id: ID, arts: Disorders[]) => dispatch(updateSurvivorDisorders(id, arts)),
})

const Disorderslist: React.FunctionComponent<IDisorderslistProps> = ({ currentlySelectedDisorders = [], id, updateSurvivorDisorder, hideLayer }) => {
  const [disordersToRemove, setDisordersToRemove] = useState<Disorders[]>([])
  const [disordersToAdd, setDisordersToAdd] = useState<Disorders[]>([])
  const [displayedDisorders, setDisplayed] = useState<IDisorder[]>(disorders)

  const selectDisorder = (newDisorder: Disorders) => {
    const count = currentlySelectedDisorders.length + disordersToAdd.length - disordersToRemove.length
    if (count < 3) {
      setDisordersToAdd(disordersToAdd.concat(newDisorder))
      setDisordersToRemove(disordersToRemove.filter(disorder => disorder !== newDisorder))
    }
  }
  const deselectDisorder = (disorderToDeselect: Disorders) => {
    setDisordersToAdd(disordersToAdd.filter(disorder => disorder !== disorderToDeselect))
    setDisordersToRemove(disordersToRemove.concat(disorderToDeselect))
  }

  const renderListElement = (disorder: IDisorder) => {
    const currentlySelectedDisordersInner = currentlySelectedDisorders || []
    const isSelected = (currentlySelectedDisordersInner.includes(disorder.id) && !disordersToRemove.includes(disorder.id)) || disordersToAdd.includes(disorder.id)
    if (isSelected) {
      return <SelectedListElement onClick={() => deselectDisorder(disorder.id)}>{disorder.name}</SelectedListElement>
    }
    return <ListElement onClick={() => selectDisorder(disorder.id)}>{disorder.name}</ListElement>
  }

  const submit = () => {
    if (typeof id !== 'undefined') {
      const disorders = (currentlySelectedDisorders || []).concat(disordersToAdd).filter(art => !disordersToRemove.includes(art))
      updateSurvivorDisorder(id, deduplicate(disorders) as Disorders[])
      hideLayer()
    }
  }

  const handleFilter = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setDisplayed(disorders)
    } else {
      const fuse = new Fuse(disorders, {
        keys: ['name'],
        threshold: 0.5,
      })
      setDisplayed(fuse.search(event.currentTarget.value))
    }
  }

  if (typeof id !== 'undefined') {
    const count = currentlySelectedDisorders.length + disordersToAdd.length - disordersToRemove.length
    return (
      <ListWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <SimpleLayerHeadline>{count} / 3</SimpleLayerHeadline>
        <FilterInput type="text" placeholder="filter..." onChange={handleFilter} autoFocus={true} />
        <List>
          {displayedDisorders.map((disorder, idx) => (
            <React.Fragment key={idx}>{renderListElement(disorder)}</React.Fragment>
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
)(Disorderslist)
