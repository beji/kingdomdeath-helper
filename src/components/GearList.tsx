import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ID, ISettlement } from "../interfaces";
import { IItem } from "../interfaces/gear";
import { colorMagentaLachs } from "./StyledComponents";

interface IGearListStateProps {
    items: IItem[];
}
interface IGearListOwnProps {
    onItemSelect?: any;
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
    z-index:10;
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

class GearList extends React.Component<IGearListProps> {
    public render() {
        return (
            <StyledList>
                {this.props.items.map((v, i) => <ListElement key={i} onClick={this.handleItemSelect.bind(this, v.id)}>{v.name}</ListElement>)}
            </StyledList>
        );
    }

    private handleItemSelect(itemId: ID) {
        this.props.onItemSelect(itemId);
    }
}

export default connect(mapStateToProps)(GearList);
