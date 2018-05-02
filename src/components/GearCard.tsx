import React, { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { Affinity, AffinityTypes, DefenseStats, ID, IGearGrid, IItem, ISettlement, Item, ItemType, StatType } from "../interfaces";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import { capitalize } from "../util";
import AffinityIcon from "./AffinityIcon";
import { colorMagentaLachs } from "./StyledComponents";

interface IGearCardDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGearCardStateProps {
    item?: IItem;
    grid?: IGearGrid;
    slotKey?: number;
    affinityActive?: boolean;
    setActive?: boolean;
}

interface IGearCardOwnProps {
    id: Item;
    slotId?: ID;
}

interface IGearCardProps extends IGearCardOwnProps, IGearCardDispatchProps, IGearCardStateProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateGearGridAction>): IGearCardDispatchProps => ({
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGearCardOwnProps): IGearCardStateProps => {
    const grid = state.geargrids.find((curr) => curr.slots.find((slot) => slot.id === ownProps.slotId) !== undefined);
    let slotKey;
    let affinityActive;
    let setActive;
    if (grid) {
        grid.slots.forEach((v, i) => {
            if (v.id === ownProps.slotId) {
                slotKey = i;
            }
        });
        if (slotKey) {
            affinityActive = grid.slots[slotKey].affinityActive;
            setActive = grid.slots[slotKey].setActive;
        }
    }
    return {
        affinityActive,
        grid,
        item: state.items.find((item: IItem) => item.id === ownProps.id),
        setActive,
        slotKey,
    };
};

const StyledCard = styled.div`
    line-height: 1rem;
    border: 1px solid #999;
    background:#ddd;
    padding:1rem;
    margin:.5rem;
    position:relative;
`;
const CardHeadline = styled.div`
    font-weight:bold;
    padding-left:1rem;
    text-align:center;
`;
const CardDescription = styled.div`
    background:#aaa;
    padding: .25rem;
`;
const CardTypes = styled.div`
    font-size:.625rem;
    padding-left:1rem;
`;
const CardStatsWrapper = styled.div`
    position:absolute;
    top: -.5rem;
    left: -.5rem;
`;
const Shield = styled.div`
    background: black;
    color:white;
    font-size:.825rem;
    padding: .25rem .25rem 0;
    position:relative;
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
    background:#bb9118;
    color:#fff;
    font-weight:bold;
    font-size:.875rem;
    padding:.25rem .125rem .125rem;
    width:1.5rem;
`;
const WeaponAcc = styled.div`
    background:#5a3c04;
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
    background:#5a3c04;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    padding: .25rem 0;
`;

const AffinityWrapper = styled.div`
    font-size:.875rem;
    text-align:left;
    color: ${(props: IGearCardStateProps) => props.affinityActive ? "#000" : "#aaa"}
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
    }

    public render() {
        if (this.props.item) {
            const { item, slotId } = this.props;
            const { desc, name, types, weapon } = item;
            const armorStat = item.stats && item.stats.find((stat) => stat.type === StatType.defense);
            const isShield = item.stats && item.stats.length === 5;
            return (
                <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                    {slotId && <CloseIcon onClick={this.handleCloseIconClick}>x</CloseIcon>}
                    <CardHeadline>{name}</CardHeadline>
                    <CardTypes>{types && types.map((type, idx) => <span key={idx}>{(ItemType)[type]} </span>)}</CardTypes>
                    {desc && <CardDescription>{desc}</CardDescription>}
                    <CardStatsWrapper>
                        {weapon && <WeaponWrapper><div>{weapon.speed}</div><WeaponAcc>{weapon.accuracy}</WeaponAcc><WeaponSpeed>{weapon.strength}</WeaponSpeed></WeaponWrapper>}
                        {armorStat && <Shield>{armorStat.amount} <ShieldArmorType>{isShield ? "all" : capitalize(DefenseStats[armorStat.stat])}</ShieldArmorType></Shield>}
                    </CardStatsWrapper>
                    {this.renderAffinity(item)}
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
                <AffinityWrapper>
                    {affinity.bonus && affinity.bonus.affOwn && affinity.bonus.affOwn.map((aff: Affinity, idx: number) => <AffinityIcon key={idx} type={AffinityTypes.connect} affinity={aff} />)}
                    {affinity.bonus && affinity.bonus.desc}
                    {directions.map((direction: string, idx) => affinity[direction] !== undefined && <AffinityIcon key={idx} affinity={affinity[direction]} type={AffinityTypes.card} direction={direction} />)}
                </AffinityWrapper>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(GearCard);
