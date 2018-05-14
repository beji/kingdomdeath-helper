import React, { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import styled from "styled-components";
import { showLayer } from "../actions";
import { updateGear } from "../actions/gearActions";
import items from "../data/ItemDataHelper";
import { AffinityTypes, DefenseStats, IAffinity, ID, IGearGrid, IGridSlot, IItem, ISimpleLayer, IState, Item, ItemType, LayerType, StatType } from "../interfaces";
import { ShowLayerAction, UpdateGearGridAction } from "../interfaces/actions";
import { capitalize } from "../util";
import AffinityIcon from "./AffinityIcon";
import { colorMagentaLachs, FancyButton } from "./StyledComponents";

interface IGearCardDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
    showLayer: (layer: ISimpleLayer) => ShowLayerAction;
}

interface IGearCardStateProps {
    item?: IItem;
    grid?: IGearGrid;
    slotKey?: number;
    slot?: IGridSlot;
    affinityActive?: boolean;
    setActive?: boolean;
    showDescButton: boolean;
}

interface IGearCardOwnProps {
    id: Item;
    gridId?: ID;
    slotId?: ID;
}

interface IGearCardProps extends IGearCardOwnProps, IGearCardDispatchProps, IGearCardStateProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGearCardDispatchProps => ({
    showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: IState, ownProps: IGearCardOwnProps): IGearCardStateProps => {
    const grid = typeof ownProps.gridId !== "undefined" ? state.settlement.geargrids[ownProps.gridId] : undefined;
    const item = items.find((itm: IItem) => itm.id === ownProps.id);
    const showDescButton = item ? item.desc.length > 40 : false;
    let slotKey;
    let affinityActive = false;
    let setActive = false;

    if (grid) {
        grid.slots.forEach((slot, idx) => {
            if (slot.id === ownProps.slotId) {
                slotKey = idx;
                affinityActive = slot.affinityActive;
                setActive = slot.setActive;
            }
        });
    }

    return {
        affinityActive,
        grid,
        item,
        setActive,
        showDescButton,
        slotKey,
    };
};

const StyledCard = styled.div`
    line-height: 1rem;
    border: 1px solid #999;
    background:#ddd;
    padding:1rem;
    margin:.5rem;
    min-height: 8rem;
    position:relative;
`;
const CardHeadline = styled.div`
    font-weight:bold;
    padding-left:1rem;
    text-align:center;
`;
const CardDescription = styled.div`
    background:#ccc;
    font-size:.75rem;
    margin-bottom: .25rem;
    padding: .25rem;
`;
const CardTypes = styled.div`
    font-size:.625rem;
    padding-left:1rem;
`;
const CardStatsWrapper = styled.div`
    display:flex;
    position:absolute;
    top: -.5rem;
    left: -.5rem;
`;
const Shield = styled.div`
    align-self:flex-start;
    background: black;
    color:white;
    font-size:.825rem;
    padding: .25rem .25rem 0;
    position:relative;
    text-align: center;
    width:1.75rem;
    &:after {
      content:" ";
      width: 0;
      height: 0;
      border-top: 1rem solid black;
      border-right: .875rem solid transparent;
      border-left: .875rem solid transparent;
      position:absolute;
      top:100%;
      left:0;
    }
`;
const ShieldArmorType = styled.div`
    font-size:.5rem;
    line-height:.5rem;
`;
const WeaponWrapper = styled.div`
    border-radius:.5rem;
    background:#999;
    color:#fff;
    font-weight:bold;
    font-size:.875rem;
    margin-right:.125rem;
    padding:.25rem .125rem .125rem;
    text-align:center;
    width:1.5rem;
    z-index:2;
`;
const WeaponAcc = styled.div`
    background:#666;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    margin-bottom: 1px;
    padding: .25rem 0;
    position:relative;
    &:after {
        content: "+";
        position:absolute;
        top:50%;
        right:-5%;
    }
`;
const WeaponSpeed = styled.div`
    background:#666;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    padding: .25rem 0;
`;

const AffinityWrapper = styled.div`
    background:#ccc;
    color: #939393;
    font-size:.875rem;
    padding:.125rem;
    text-align:left;
    &.active {
      color: #000;
    }
    &:empty {
      background:transparent;
      padding:0;
    }
`;

const AffinityRequirments = styled.span`
    border: 1px solid #757575;
    background: #aaa;
    display: inline-block;
    padding: .125rem;
    margin-right: .25rem;
`;
const MadeAt = styled.div`
    font-size:.625rem;
    margin-top:.25rem;
    text-align:center;
`;

const CloseIcon = styled.div`
    background:#ccc;
    border:1px solid #444;
    border-radius:50%;
    cursor:pointer;
    height:1.25rem;
    line-height:1.25rem;
    position:absolute;
    right:-.5rem;
    text-align:center;
    top:-.5rem;
    width:1.25rem;
    &:hover {
        background:${colorMagentaLachs}
    }
`;

class GearCard extends React.Component<IGearCardProps> {
    public constructor(props: IGearCardProps) {
        super(props);
        this.state = {
            dragging: false,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.renderAffinity = this.renderAffinity.bind(this);
        this.showDescription = this.showDescription.bind(this);
    }

    public render() {
        if (this.props.item) {
            const { item, slotId, showDescButton } = this.props;
            const { desc, name, types, weapon, obtained } = item;
            const armorStat = item.stats && item.stats.find((stat) => stat.type === StatType.defense);
            const isShield = item.stats && item.stats.length === 5;
            return (
                <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                    {typeof slotId !== "undefined" && <CloseIcon onClick={this.handleCloseIconClick}>x</CloseIcon>}
                    <CardHeadline>{name}</CardHeadline>
                    <CardTypes>{types && types.map((type, idx) => <span key={idx}>{(ItemType)[type]} </span>)}</CardTypes>
                    {showDescButton && <FancyButton onClick={this.showDescription}>Description</FancyButton>}
                    {!showDescButton && desc && <CardDescription>{desc}</CardDescription>}
                    <CardStatsWrapper>
                        {weapon && <WeaponWrapper><div>{weapon.speed}</div><WeaponAcc>{weapon.accuracy}</WeaponAcc><WeaponSpeed>{weapon.strength}</WeaponSpeed></WeaponWrapper>}
                        {armorStat && <Shield>{armorStat.amount} <ShieldArmorType>{isShield ? "all" : capitalize(DefenseStats[armorStat.stat])}</ShieldArmorType></Shield>}
                    </CardStatsWrapper>
                    {this.renderAffinity(item)}
                    {obtained && <MadeAt>{obtained}</MadeAt>}
                </StyledCard>
            );
        } else {
            return "";
        }
    }

    private renderAffinity(item: IItem) {
        const { affinity } = item;
        const directions: string[] = ["top", "left", "bottom", "right"];
        if (affinity) {
            return (
                <div>
                    <AffinityWrapper className={this.props.affinityActive ? "active" : ""}>
                        {affinity.bonus && affinity.bonus.require && (<AffinityRequirments>{affinity.bonus.require.map((aff: IAffinity, idx: number) => <AffinityIcon key={idx} type={aff.connection} affinity={aff.color} />)}</AffinityRequirments>)}
                        {affinity.bonus && affinity.bonus.desc}
                    </AffinityWrapper>
                    {directions.map((direction: string, idx) => affinity[direction] !== undefined && <AffinityIcon key={idx} affinity={affinity[direction]} type={AffinityTypes.connect} direction={direction} />)}
                </div>
            );
        }
        return "";
    }

    private handleCloseIconClick() {
        if (this.props.grid) {
            const { grid, slotKey } = this.props;
            const newGrid = {
                ...grid,
                slots: grid.slots.map((slot, idx) => {
                    if (idx === slotKey as number) {
                        return {
                            ...slot,
                            content: undefined,
                        };
                    }
                    return slot;
                }),
            };
            this.props.updateGear(newGrid);
            this.setState({
                active: false,
            });
        }
    }

    private handleDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("ids", JSON.stringify({
                id: this.props.id,
                slotKey: this.props.slotKey,
            }));
        }
    }

    private showDescription(e: SyntheticEvent<HTMLButtonElement>) {
        const { item, slotId } = this.props;
        if (item) {
            const { desc, name } = item;
            this.props.showLayer({
                content: desc,
                headline: name,
                type: LayerType.simple,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearCard);
