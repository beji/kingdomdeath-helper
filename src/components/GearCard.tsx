import marked from 'marked'
import React, { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { showLayer } from '../actions'
import { updateGear } from '../actions/gearActions'
import items from '../data/ItemDataHelper'
import { AffinityTypes, DefenseStats, IAffinity, ID, IGearGrid, IGridSlot, IItem, ISimpleLayer, IState, Item, ItemType, LayerType, StatType } from '../interfaces'
import { ShowLayerAction, UpdateGearGridAction } from '../interfaces/actions'
import { capitalize } from '../util'
import AffinityIcon from './AffinityIcon'
import { Card, FancyButton } from './StyledComponents'

interface IGearCardDispatchProps {
  updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IGearCardStateProps {
  item?: IItem
  grid?: IGearGrid
  slotKey?: number
  slot?: IGridSlot
  affinityActive?: boolean
  setActive?: boolean
  showDescButton: boolean
}

interface IGearCardOwnProps {
  id: Item
  gridId?: ID
  slotId?: ID
}

interface IGearCardProps extends IGearCardOwnProps, IGearCardDispatchProps, IGearCardStateProps {}

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction | ShowLayerAction>): IGearCardDispatchProps => ({
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
  updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
})

const mapStateToProps = (state: IState, ownProps: IGearCardOwnProps): IGearCardStateProps => {
  const grid = typeof ownProps.gridId !== 'undefined' ? state.settlement.geargrids[ownProps.gridId] : undefined
  const item = items.find((itm: IItem) => itm.id === ownProps.id)
  const showDescButton = item ? item.desc.length > 150 : false
  let slotKey
  let affinityActive = false
  let setActive = false

  if (grid) {
    grid.slots.forEach((slot, idx) => {
      if (slot.id === ownProps.slotId) {
        slotKey = idx
        affinityActive = slot.affinityActive as boolean
        setActive = slot.setActive as boolean
      }
    })
  }

  return {
    affinityActive,
    grid,
    item,
    setActive,
    showDescButton,
    slotKey,
  }
}

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.gear.background};
  color: ${({ theme }) => theme.gear.text.base};
  line-height: 1rem;
  padding: 1rem;
  margin: 0.5rem;
  min-height: 10rem;
  position: relative;
`
const CardHeadline = styled.div`
  ${({ theme }) => theme.page.font.serif}
  font-weight: bold;
  padding-left: 1rem;
  text-align: center;
`
const CardDescription = styled.div`
  border: 1px solid ${({ theme }) => theme.gear.border.highlight};
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  p {
    margin: 0;
  }
`
const CardTypes = styled.div`
  font-size: 0.625rem;
  padding-left: 1rem;
`
const CardStatsWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
`
const Shield = styled.div`
  align-self: flex-start;
  background: black;
  color: white;
  font-size: 0.825rem;
  padding: 0.25rem 0.25rem 0;
  position: relative;
  text-align: center;
  width: 1.75rem;
  &:after {
    content: ' ';
    width: 0;
    height: 0;
    border-top: 1rem solid black;
    border-right: 0.875rem solid transparent;
    border-left: 0.875rem solid transparent;
    position: absolute;
    top: 100%;
    left: 0;
  }
`
const ShieldArmorType = styled.div`
  font-size: 0.5rem;
  line-height: 0.5rem;
`
const WeaponWrapper = styled.div`
  border: 1px solid #333;
  border-radius: 0.5rem;
  background: #757575;
  color: #fff;
  font-weight: bold;
  font-size: 0.875rem;
  margin-right: 0.125rem;
  padding: 0.25rem 0.125rem 0.125rem;
  text-align: center;
  width: 1.5rem;
  z-index: 2;
`
const WeaponAcc = styled.div`
  background: #333;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin-bottom: 1px;
  padding: 0.25rem 0;
  position: relative;
  &:after {
    content: '+';
    position: absolute;
    top: 50%;
    right: -5%;
  }
`
const WeaponSpeed = styled.div`
  background: #333;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 0.25rem 0;
`

const AffinityWrapper = styled.div`
  background: rgba(100, 100, 100, 0.3);
  border: 1px solid ${({ theme }) => theme.gear.border.hint};
  color: ${({ theme }) => theme.gear.text.hint};
  font-size: 0.875rem;
  padding: 0.125rem;
  text-align: left;
  &.active {
    background: transparent;
    border-color: ${({ theme }) => theme.gear.border.highlight};
    color: inherit;
  }
  &:empty {
    background: transparent;
    padding: 0;
    border: 0;
  }
`

const AffinityRequirments = styled.span`
  display: inline-block;
  padding: 0.125rem;
  margin-right: 0.25rem;
`

const AffintyDescription = styled.div`
  display: inline;
  font-size: 0.75rem;
  p {
    display: inline;
    margin: 0;
  }
`

const MadeAt = styled.div`
  font-size: 0.625rem;
  margin-top: 0.25rem;
  text-align: center;
`

const CloseIcon = styled.div`
  background: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.card.border.hint};
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  height: 1.25rem;
  line-height: 1.25rem;
  position: absolute;
  right: -0.5rem;
  text-align: center;
  top: -0.5rem;
  width: 1.25rem;
  &:hover {
    background: ${({ theme }) => theme.card.border.highlight};
    color: #fff;
  }
`

const GearCard: React.FunctionComponent<IGearCardProps> = props => {
  const renderAffinity = (item: IItem) => {
    const { affinity } = item
    const directions: string[] = ['top', 'left', 'bottom', 'right']
    if (affinity) {
      return (
        <div>
          <AffinityWrapper className={props.affinityActive ? 'active' : ''}>
            {affinity.bonus && affinity.bonus.require && (
              <AffinityRequirments>
                {affinity.bonus.require.map((aff: IAffinity, idx: number) => (
                  <AffinityIcon key={idx} type={aff.connection} affinity={aff.color} />
                ))}
              </AffinityRequirments>
            )}
            {affinity.bonus && <AffintyDescription dangerouslySetInnerHTML={{ __html: marked(affinity.bonus.desc) }} />}
          </AffinityWrapper>
          {directions.map(
            (direction: string, idx) =>
              affinity[direction] !== undefined && <AffinityIcon key={idx} affinity={affinity[direction]} type={AffinityTypes.connect} direction={direction} />,
          )}
        </div>
      )
    }
    return <React.Fragment />
  }

  const handleCloseIconClick = () => {
    if (props.grid) {
      const { grid, slotKey } = props
      const newGrid = {
        ...grid,
        slots: grid.slots.map((slot, idx) => {
          if (idx === (slotKey as number)) {
            return {
              ...slot,
              content: undefined,
            }
          }
          return slot
        }),
      }
      props.updateGear(newGrid)
    }
  }

  const handleDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
    const event = e.nativeEvent as Event & { dataTransfer: DataTransfer }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData(
        'ids',
        JSON.stringify({
          id: props.id,
          slotKey: props.slotKey,
        }),
      )
    }
  }

  const showDescription = () => {
    const { item } = props
    if (item) {
      const { desc, name } = item
      props.showLayer({
        content: desc,
        headline: name,
        type: LayerType.simple,
      })
    }
  }

  if (props.item) {
    const { item, slotId, showDescButton } = props
    const { desc, name, types, weapon, obtained } = item
    const armorStat = item.stats && item.stats.find(stat => stat.type === StatType.defense)
    const isShield = item.stats && item.stats.length === 5
    return (
      <StyledCard onDragStart={handleDragStart} draggable={true}>
        {typeof slotId !== 'undefined' && <CloseIcon onClick={handleCloseIconClick}>x</CloseIcon>}
        <CardHeadline>{name}</CardHeadline>
        <CardTypes>{types && types.map((type, idx) => <span key={idx}>{ItemType[type]} </span>)}</CardTypes>
        {showDescButton && <FancyButton onClick={showDescription}>Description</FancyButton>}
        {!showDescButton && desc && <CardDescription dangerouslySetInnerHTML={{ __html: marked(desc) }} />}
        <CardStatsWrapper>
          {weapon && (
            <WeaponWrapper>
              <div>{weapon.speed}</div>
              <WeaponAcc>{weapon.accuracy}</WeaponAcc>
              <WeaponSpeed>{weapon.strength}</WeaponSpeed>
            </WeaponWrapper>
          )}
          {armorStat && (
            <Shield>
              {armorStat.amount} <ShieldArmorType>{isShield ? 'all' : capitalize(DefenseStats[armorStat.stat])}</ShieldArmorType>
            </Shield>
          )}
        </CardStatsWrapper>
        {renderAffinity(item)}
        {obtained && <MadeAt>{obtained}</MadeAt>}
      </StyledCard>
    )
  } else {
    return <React.Fragment />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GearCard)
