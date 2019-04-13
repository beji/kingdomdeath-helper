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

interface IFightingArtslistState {
  artsToAdd: FightingArt[]
  artsToRemove: FightingArt[]
  arts: IFightingArt[]
}

interface IFightingArtslistStateProps {
  currentlySelectedArts?: FightingArt[]
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
          currentlySelectedArts: typeof survivor.fightingArts !== 'undefined' ? survivor.fightingArts.map(art => art.id) : [],
          survivor: survivor.id,
        }
      }
    }
  }

  return {
    currentlySelectedArts: undefined,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorFightingArtsAction | HideLayerAction>): IFightingArtslistDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateSurvivorFightingArt: (id: ID, arts: FightingArt[]) => dispatch(updateSurvivorFightingArt(id, arts)),
})

const FightingArtslist: React.FunctionComponent<IFightingArtslistProps> = ({ currentlySelectedArts = [], survivor, updateSurvivorFightingArt, hideLayer }) => {
  const [artsToAdd, setArtsToAdd] = useState<FightingArt[]>([])
  const [artsToRemove, setArtsToRemove] = useState<FightingArt[]>([])
  const [displayedArts, setDisplayedArts] = useState<IFightingArt[]>(fightingArts)

  const selectFightingArt = (newArt: FightingArt) => {
    const count = currentlySelectedArts.length + artsToAdd.length - artsToRemove.length
    if (count < 3) {
      setArtsToAdd(artsToAdd.concat(newArt))
      setArtsToRemove(artsToRemove.filter(art => art !== newArt))
    }
  }
  const deselectFightingArt = (artToDeselect: FightingArt) => {
    setArtsToAdd(artsToAdd.filter(art => art !== artToDeselect))
    setArtsToRemove(artsToRemove.concat(artToDeselect))
  }

  const renderListElement = (art: IFightingArt) => {
    const isSelected = (currentlySelectedArts.includes(art.id) && !artsToRemove.includes(art.id)) || artsToAdd.includes(art.id)
    if (isSelected) {
      return <SelectedListElement onClick={() => deselectFightingArt(art.id)}>{art.name}</SelectedListElement>
    }
    return <ListElement onClick={() => selectFightingArt(art.id)}>{art.name}</ListElement>
  }

  const submit = () => {
    if (typeof survivor !== 'undefined') {
      const arts = (currentlySelectedArts || []).concat(artsToAdd).filter(art => !artsToRemove.includes(art))
      updateSurvivorFightingArt(survivor, deduplicate(arts) as FightingArt[])
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
    const count = currentlySelectedArts.length + artsToAdd.length - artsToRemove.length
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
