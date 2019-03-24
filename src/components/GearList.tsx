import Fuse from "fuse.js";
import React, { KeyboardEvent, SyntheticEvent } from "react";
import items from "../data/ItemDataHelper";
import { IItem, ItemType, UUID } from "../interfaces";
import { CloseIcon, FilterInput, List, ListElement, ListWrapper } from "./StyledComponents";

interface IGearListState {
    filter: ItemType[];
    items: ReadonlyArray<IItem>;
}

interface IGearListProps {
    onItemSelect?: any;
    onCancel?: any;
}

class GearList extends React.Component<IGearListProps, IGearListState> {

    private inputfield?: HTMLInputElement;

    constructor(props: IGearListProps) {
        super(props);
        this.state = {
            filter: [],
            items: items as IItem[],
        };
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setupInputRef = this.setupInputRef.bind(this);
    }

    public render() {
        return (
            <ListWrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} onKeyPress={this.handleKeyPress} innerRef={this.setupInputRef} autoFocus={true} />
                <List>
                    {this.state.items.map((v, i) => <ListElement key={i} onClick={this.handleItemSelect.bind(this, v.id)} dangerouslySetInnerHTML={{ __html: v.name }} />)}
                </List>
            </ListWrapper>
        );
    }

    private handleItemSelect(itemId: UUID) {
        this.props.onItemSelect(itemId);
    }

    private handleCloseIconClick() {
        this.props.onCancel();
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
            this.props.onItemSelect(this.state.items[0].id);
        }
    }
}

export default GearList;
