import Fuse from "fuse.js";
import React, { KeyboardEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer, updateGear } from "../../actions";
import items from "../../data/ItemDataHelper";
import { ID, IGearGrid, IItem, IState, Item, ItemType, LayerType } from "../../interfaces";
import { HideLayerAction, UpdateGearGridAction } from "../../interfaces/actions";
import { clone } from "../../util";
import { CloseIcon, FilterInput, List, ListElement, ListWrapper } from "../StyledComponents";

interface IGearListState {
    filter: ItemType[];
    items: ReadonlyArray<IItem>;
}

interface IGearListStateProps {
    slotId?: ID;
    grid?: IGearGrid;
}

interface IGearListDispatchProps {
    hideLayer: () => HideLayerAction;
    updateGear: (grid: IGearGrid) => UpdateGearGridAction;
}

interface IGearListProps extends IGearListStateProps, IGearListDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateGearGridAction>): IGearListDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
    updateGear: (grid: IGearGrid) => dispatch(updateGear(grid)),
});

const mapStateToProps = (state: IState): IGearListStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.gearlist) {
        const { gridId, slotId } = state.interface.layer;
        const geargrid = state.settlement.geargrids.find((v) => v.id === gridId);
        let slotKey;
        if (geargrid) {
            geargrid.slots.forEach((v, i) => {
                if (v.id === slotId) {
                    slotKey = i;
                }
            });
        }
        return {
            grid: geargrid,
            slotId: slotKey,
        };
    } else {
        return {};
    }
};

class GearList extends React.Component<IGearListProps, IGearListState> {

    private inputfield?: HTMLInputElement;

    constructor(props: IGearListProps) {
        super(props);
        this.state = {
            filter: [],
            items: items as IItem[],
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setupInputRef = this.setupInputRef.bind(this);
    }

    public render() {
        if (this.props.grid && typeof this.props.slotId !== "undefined") {
            return (
                <ListWrapper>
                    <CloseIcon onClick={this.props.hideLayer}>X</CloseIcon>
                    <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} onKeyPress={this.handleKeyPress} ref={this.setupInputRef} autoFocus={true} />
                    <List>
                        {this.state.items.map((v, i) => <ListElement key={i} onClick={this.handleItemSelect.bind(this, v.id)} dangerouslySetInnerHTML={{ __html: v.name }} />)}
                    </List>
                </ListWrapper>
            );
        } else {
            return "";
        }
    }

    private handleItemSelect(itemId: Item) {
        if (this.props.grid && typeof this.props.slotId !== "undefined") {
            const { grid, slotId } = this.props;
            const newGrid: IGearGrid = {
                ...grid,
                slots: grid.slots.map((slot) => {
                    if (slot.id === slotId) {
                        return {
                            ...slot,
                            content: itemId,
                        };
                    }
                    return slot;
                }),
            };
            this.props.updateGear(clone(newGrid));
            this.props.hideLayer();
        }
    }

    private setupInputRef(elem: HTMLInputElement) {
        this.inputfield = elem;
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({ items });
        } else {
            const fuse = new Fuse(items as any[], {
                keys: ["name"],
                threshold: 0.5,
            });
            this.setState({
                items: fuse.search(event.currentTarget.value).map((item: any) => {
                    return {
                        ...item,
                        name: item.name.replace(new RegExp(event.currentTarget.value, "gi"), "<b>$&</b>"),
                    };
                }),
            });
        }

    }

    private handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            this.handleItemSelect(this.state.items[0].id);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearList);
