import Fuse from "fuse.js";
import React from "react";
import { SyntheticEvent } from "react";
import styled from "styled-components";
import items from "../data/ItemDataHelper";
import { ID, IItem, ItemType } from "../interfaces";
import { CloseIcon, colorMagentaLachs } from "./StyledComponents";

interface IGearListState {
    filter: ItemType[];
    items: ReadonlyArray<IItem>;
}

interface IGearListProps {
    onItemSelect?: any;
    onCancel?: any;
}

const Wrapper = styled.div`
    background:#eee;
    border:1px solid ${colorMagentaLachs};
    left:50%;
    line-height:1rem;
    padding:.5rem;
    position:fixed;
    top:50%;
    transform:translate3d(-50%, -50%, 0);
    width:30vw;
    height: 50vh;
    z-index:10;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
        width: 95%;
    }
`;
const List = styled.div`
    overflow-y:auto;
    height: 90%;
    margin: 1rem 0;
`;
const ListElement = styled.div`
    border:1px solid #aaa;
    cursor:pointer;
    margin:.25rem;
    padding:.5rem;
    &:hover {
        background:#ddd;
        border-color:${colorMagentaLachs}
    }
`;

const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    padding:.25rem;
    width: 80%;
`;

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
        this.setupInputRef = this.setupInputRef.bind(this);
    }

    public render() {
        return (
            <Wrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} innerRef={this.setupInputRef} autoFocus={true}/>
                <List>
                    {this.state.items.map((v, i) => <ListElement key={i} onClick={this.handleItemSelect.bind(this, v.id)} dangerouslySetInnerHTML={{ __html: v.name }} />)}
                </List>
            </Wrapper>
        );
    }

    private handleItemSelect(itemId: ID) {
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
}

export default GearList;
