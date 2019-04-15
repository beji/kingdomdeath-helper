import fightingArts from 'data/final/fightingarts'
import Fuse from 'fuse.js'
import { HideLayerAction, UpdateSurvivorFightingArtsAction } from 'interfaces/actions'
import React, { SyntheticEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateSurvivorFightingArt } from '../../actions'
import { FightingArt, ID, IFightingArt, IState, LayerType } from '../../interfaces'
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement, SimpleLayerHeadline } from '../StyledComponents'
import { deduplicate } from '../../util'

interface IFightingArtslistStateProps {
  selectedFightingArtsFromProps: FightingArt[]
  survivor?: ID
}

interface IFightingArtslistDispatchProps {
  hideLayer: () => HideLayerAction
  updateSurvivorFightingArt: (id: ID, arts: FightingArt[]) => UpdateSurvivorFightingArtsAction
}

interface IFightingArtslistProps extends IFightingArtslistStateProps, IFightingArtslistDispatchProps {}

const mapStateToProps = (state: IState): IFightingArtslistStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.fightingartlist) {
    if (typeof state.interface.layer.survivor !== 'undefined') {
      const sid = state.interface.layer.survivor
      const survivor = state.settlement.survivors.find(s => s.id === sid)
      if (survivor) {
        return {
          selectedFightingArtsFromProps: typeof survivor.fightingArts !== 'undefined' ? survivor.fightingArts.map(art => art.id) : [],
          survivor: survivor.id,
        }
      }
    }
  }

  return {
    selectedFightingArtsFromProps: [],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorFightingArtsAction | HideLayerAction>): IFightingArtslistDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorFightingArt: (id: ID, arts: FightingArt[]) => dispatch(updateSurvivorFightingArt(id, arts)),
})

const FightingArtslist: React.FunctionComponent<IFightingArtslistProps> = ({ selectedFightingArtsFromProps, survivor, updateSurvivorFightingArt, hideLayer }) => {
  const [selectedFightingArts, setSelectedFightingArts] = useState<FightingArt[]>(selectedFightingArtsFromProps)
  const [displayedArts, setDisplayedArts] = useState<IFightingArt[]>(fightingArts)

  const selectFightingArt = (newArt: FightingArt) => {
    if (selectedFightingArts.length < 3 && !selectedFightingArts.includes(newArt)) {
      setSelectedFightingArts(selectedFightingArts.concat(newArt))
    }
  }
  const deselectFightingArt = (artToDeselect: FightingArt) => {
    setSelectedFightingArts(selectedFightingArts.filter(art => art !== artToDeselect))
  }

  const renderListElement = (art: IFightingArt) => {
    const isSelected = selectedFightingArts.includes(art.id)
    if (isSelected) {
      return <SelectedListElement onClick={() => deselectFightingArt(art.id)}>{art.name}</SelectedListElement>
    }
    return <ListElement onClick={() => selectFightingArt(art.id)}>{art.name}</ListElement>
  }

  const submit = () => {
    if (typeof survivor !== 'undefined') {
      updateSurvivorFightingArt(survivor, deduplicate(selectedFightingArts) as FightingArt[])
      setDisplayedArts(fightingArts)
      hideLayer()
    }
  }

  const handleFilter = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setDisplayedArts(fightingArts)
    } else {
      const fuse = new Fuse(fightingArts, {
        keys: ['name'],
        threshold: 0.5,
      })
      setDisplayedArts(fuse.search(event.currentTarget.value))
    }
  }
  if (typeof survivor !== 'undefined') {
    const count = selectedFightingArts.length
    return (
      <ListWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <SimpleLayerHeadline>{count} / 3</SimpleLayerHeadline>
        <FilterInput type="text" placeholder="filter..." onChange={handleFilter} autoFocus={true} />
        <List>
          {displayedArts.map((art, idx) => (
            <React.Fragment key={idx}>{renderListElement(art)}</React.Fragment>
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
)(FightingArtslist)
