import Fuse from 'fuse.js'
import React, { KeyboardEvent, SyntheticEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { hideLayer, updateGear } from '../../actions'
import items from '../../data/ItemDataHelper'
import { ID, IGearGrid, IItem, IState, Item, LayerType } from '../../interfaces'
import { HideLayerAction, UpdateGearGridAction } from '../../interfaces/actions'
import { clone } from '../../util'
import { CloseIcon, FilterInput, List, ListElement, ListWrapper } from '../StyledComponents'

interface IGearListStateProps {
  slotId?: ID
  grid?: IGearGrid
}

interface IGearListDispatchProps {
  hideLayer: () => HideLayerAction
  updateGear: (grid: IGearGrid) => UpdateGearGridAction
}

interface IGearListProps extends IGearListStateProps, IGearListDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateGearGridAction>): IGearListDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
  updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
})

const mapStateToProps = (state: IState): IGearListStateProps => {
  if (state.interface.layer && state.interface.layer.type === LayerType.gearlist) {
    const { gridId, slotId } = state.interface.layer
    const geargrid = state.settlement.geargrids.find(v => v.id === gridId)
    let slotKey
    if (geargrid) {
      geargrid.slots.forEach((v, i) => {
        if (v.id === slotId) {
          slotKey = i
        }
      })
    }
    return {
      grid: geargrid,
      slotId: slotKey,
    }
  } else {
    return {}
  }
}

const GearList: React.FunctionComponent<IGearListProps> = ({ grid, slotId, updateGear, hideLayer }) => {
  const [displayedItems, setDisplayedItems] = useState<ReadonlyArray<IItem>>(items)

  const handleItemSelect = (itemId: Item) => {
    if (grid && typeof slotId !== 'undefined') {
      const newGrid: IGearGrid = {
        ...grid,
        slots: grid.slots.map(slot => {
          if (slot.id === slotId) {
            return {
              ...slot,
              content: itemId,
            }
          }
          return slot
        }),
      }
      updateGear(clone(newGrid))
      setDisplayedItems(items)
      hideLayer()
    }
  }

  const handleFilter = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setDisplayedItems(items)
    } else {
      const fuse = new Fuse(items, {
        keys: ['name'],
        threshold: 0.5,
      })
      setDisplayedItems(
        fuse.search(event.currentTarget.value).map(item => ({
          ...item,
          name: item.name.replace(new RegExp(event.currentTarget.value, 'gi'), '<b>$&</b>'),
        })),
      )
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleItemSelect(displayedItems[0].id)
    }
  }

  if (grid && typeof slotId !== 'undefined') {
    return (
      <ListWrapper>
        <CloseIcon onClick={hideLayer}>X</CloseIcon>
        <FilterInput type="text" placeholder="filter..." onChange={handleFilter} onKeyPress={handleKeyPress} autoFocus={true} />
        <List>
          {displayedItems.map((v, i) => (
            <ListElement key={i} onClick={() => handleItemSelect(v.id)} dangerouslySetInnerHTML={{ __html: v.name }} />
          ))}
        </List>
      </ListWrapper>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GearList)
