import React, { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import styled from "styled-components";
import { updateGear } from "../actions/gearActions";
import { Affinity, AffinityTypes, DefenseStats, ID, IGearGrid, IItem, ISettlement, Item, StatType } from "../interfaces";
import { UpdateGearGridAction } from "../interfaces/gearActions";
import { defenseStatToString } from "../util";
import AffinityIcon from "./AffinityIcon";
import { colorMagentaLachs } from "./StyledComponents";

interface IGearCardDispatchProps {
    updateGear: (gearGrid: IGearGrid) => UpdateGearGridAction;
}

interface IGearCardStateProps {
    item?: IItem;
    grid?: IGearGrid;
    slotKey?: number;
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
    if (grid) {
        grid.slots.forEach((v, i) => {
            if (v.id === ownProps.slotId) {
                slotKey = i;
            }
        });
    }
    return {
        grid,
        item: state.items.find((item: IItem) => item.id === ownProps.id),
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
`;
const CardTypes = styled.div`
    font-size:.625rem;
    padding-left:1rem;
`;
const CardDefStat = styled.div`
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
const CardDefStatType = styled.div`
    font-size:.5rem;
    line-height:.5rem;
`;

const AffinityWrapper = styled.div`
    font-size:.875rem;
    text-align:left;
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
            const armorStat = item.stats && item.stats.find((stat) => stat.type === StatType.defense);
            return (
                <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                    {slotId && <CloseIcon onClick={this.handleCloseIconClick}>x</CloseIcon>}
                    <CardHeadline>{item.name}</CardHeadline>
                    <CardTypes>{item.types && item.types.map((type, idx) => <span key={idx}>{type} </span>)}</CardTypes>
                    <CardDescription>{item.desc}</CardDescription>
                    {armorStat && <CardDefStat><Shield>{armorStat.amount} <CardDefStatType>{defenseStatToString(armorStat.stat as DefenseStats)}</CardDefStatType></Shield></CardDefStat>}
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
                    {directions.map((direction: string, idx) => affinity[direction] && <AffinityIcon key={idx} affinity={affinity[direction]} type={AffinityTypes.card} direction={direction} />)}
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
