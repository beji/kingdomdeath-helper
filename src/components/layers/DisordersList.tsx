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

interface IDisorderslistStateProps {
  selectedDisordersFromProps?: Disorders[]
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
          selectedDisordersFromProps: survivor.disorders ? survivor.disorders.map(disorder => disorder.id) : [],
          id: sid,
        }
      }
    }
  }
  return {
    selectedDisordersFromProps: undefined,
    id: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorDisordersAction | HideLayerAction>): IDisorderslistDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorDisorder: (id: ID, arts: Disorders[]) => dispatch(updateSurvivorDisorders(id, arts)),
})

const Disorderslist: React.FunctionComponent<IDisorderslistProps> = ({ selectedDisordersFromProps = [], id, updateSurvivorDisorder, hideLayer }) => {
  const [selectedDisorders, setSelectedDisorders] = useState<Disorders[]>(selectedDisordersFromProps)
  const [displayedDisorders, setDisplayed] = useState<IDisorder[]>(disorders)

  const selectDisorder = (newDisorder: Disorders) => {
    if (selectedDisorders.length < 3 && !selectedDisorders.includes(newDisorder)) {
      setSelectedDisorders(selectedDisorders.concat(newDisorder))
    }
  }
  const deselectDisorder = (disorderToDeselect: Disorders) => {
    setSelectedDisorders(selectedDisorders.filter(disorder => disorder !== disorderToDeselect))
  }

  const renderListElement = (disorder: IDisorder) => {
    const isSelected = selectedDisorders.includes(disorder.id)
    if (isSelected) {
      return <SelectedListElement onClick={() => deselectDisorder(disorder.id)}>{disorder.name}</SelectedListElement>
    }
    return <ListElement onClick={() => selectDisorder(disorder.id)}>{disorder.name}</ListElement>
  }

  const submit = () => {
    if (typeof id !== 'undefined') {
      updateSurvivorDisorder(id, deduplicate(selectedDisorders) as Disorders[])
      setDisplayed(disorders)
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
    const count = selectedDisorders.length
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
