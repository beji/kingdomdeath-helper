import React from "react";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ID, IItem, ISettlement } from "../interfaces";
import { colorMagentaLachs } from "./StyledComponents";

interface IGearListState {
    items: ReadonlyArray<IItem>;
}

interface IGearListStateProps {
    items: ReadonlyArray<IItem>;
}
interface IGearListOwnProps {
    onItemSelect?: any;
    onCancel?: any;
}

interface IGearListProps extends IGearListStateProps, IGearListOwnProps { }

const mapStateToProps = (state: ISettlement): IGearListStateProps => {
    return {
        items: state.items,
    };
};

const StyledList = styled.div`
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
    overflow:auto;
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
const CloseIcon = styled.div`
    background:#ccc;
    border:1px solid #444;
    border-radius:50%;
    cursor:pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size:1rem;
    height:2rem;
    line-height:2rem;
    position:absolute;
    right:-1rem;
    text-align:center;
    top:-1rem;
    width:2rem;
    &:hover {
        background:${colorMagentaLachs}
    }
`;
const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    padding:.25rem;
    width: 80%;
`;

class GearList extends React.Component<IGearListProps, IGearListState> {
    constructor(props: IGearListProps) {
        super(props);
        this.state = {
            items: props.items as IItem[],
        };
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    public render() {
        return (
            <StyledList>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} />
                {this.state.items.map((v, i) => <ListElement key={i} onClick={this.handleItemSelect.bind(this, v.id)}>{v.name}</ListElement>)}
            </StyledList>
        );
    }

    private handleItemSelect(itemId: ID) {
        this.props.onItemSelect(itemId);
    }

    private handleCloseIconClick() {
        this.props.onCancel();
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        const { items } = this.props;
        this.setState({
            items: items.filter((item) => {
                return item.name.toLowerCase().search(
                    event.currentTarget.value.toLowerCase()) !== -1;
            }),
        });
    }
}

export default connect(mapStateToProps)(GearList);
