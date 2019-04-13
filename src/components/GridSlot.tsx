import React, { SyntheticEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer, updateGear } from '../actions'
import { ID, IGearGrid, IGearListLayer, IState, LayerType } from '../interfaces'
import { ShowLayerAction, UpdateGearGridAction } from '../interfaces/actions'
import { colors } from '../theme'
import GearCard from './GearCard'
import { FancyButton } from './StyledComponents'

interface IGridSlotState {
  active: boolean
}

interface IGridSlotStateProps {
  grid?: IGearGrid
  slotKey?: number
}

interface IGridSlotDispatchProps {
  showLayer: (layer: IGearListLayer) => ShowLayerAction
  updateGear: (grid: IGearGrid) => UpdateGearGridAction
}

interface IGridSlotOwnProps {
  gridId: ID
  slotId: ID
}

interface IGridSlotProps extends IGridSlotStateProps, IGridSlotOwnProps, IGridSlotDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction | UpdateGearGridAction>): IGridSlotDispatchProps => ({
  showLayer: (layer: IGearListLayer) => dispatch(showLayer(layer)),
  updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
})

const mapStateToProps = (state: IState, ownProps: IGridSlotOwnProps): IGridSlotStateProps => {
  const geargrid = state.settlement.geargrids.find(v => v.id === ownProps.gridId)
  let slotKey
  if (geargrid) {
    geargrid.slots.forEach((v, i) => {
      if (v.id === ownProps.slotId) {
        slotKey = i
      }
    })
  }
  return {
    grid: geargrid,
    slotKey,
  }
}

const StyledElement = styled.div`
  border: 1px solid ${colors.hintedBorder};
  width: 33.33333%;
  min-height: 10vh;
  text-align: center;
  line-height: 10vh;
  &.active {
    background: #aaa;
  }
`

const GridSlot: React.FunctionComponent<IGridSlotProps> = ({ grid, slotKey, showLayer, updateGear, gridId, slotId }) => {
  const [active, setActive] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateHandler = (value: any, method: any) => (...e: SyntheticEvent<HTMLDivElement>[]) => method(value, ...e)

  const handleGearListOpen = () => {
    showLayer({
      gridId,
      slotId,
      type: LayerType.gearlist,
    })
  }

  const handleGridDrop = (slotKey: number, e: SyntheticEvent<HTMLDivElement>) => {
    const event = e.nativeEvent as Event & { dataTransfer: DataTransfer }
    const data = JSON.parse(event.dataTransfer.getData('ids'))
    if (typeof grid !== 'undefined') {
      const newGrid = {
        ...grid,
        slots: grid.slots.map((slot, idx) => {
          if (data.slotKey && idx === data.slotKey) {
            return {
              ...slot,
              content: undefined,
            }
          }
          if (idx === slotKey) {
            return {
              ...slot,
              content: data.id,
            }
          }
          return slot
        }),
      }
      updateGear(newGrid)

      setActive(false)
    }
  }

  const handleDragEnter = () => {
    if (!active) {
      setActive(true)
    }
  }

  const handleDragLeave = () => {
    setActive(false)
  }

  const handleDragOver = (e: SyntheticEvent<HTMLDivElement>) => e.preventDefault()

  const content = grid && grid.slots[slotKey as number].content
  return (
    <StyledElement
      className={active ? 'active' : ''}
      onDrop={generateHandler(slotKey, handleGridDrop)}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {content !== undefined && grid && <GearCard id={content} slotId={slotId} gridId={grid.id} />}
      {content === undefined && <FancyButton onClick={handleGearListOpen}>+</FancyButton>}
    </StyledElement>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridSlot)
