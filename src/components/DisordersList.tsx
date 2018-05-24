import disorders from "data/final/disorder.json";
import Fuse from "fuse.js";
import { Disorders, ID, IDisorder, IState } from "interfaces";
import { UpdateSurvivorDisordersAction } from "interfaces/actions";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivorDisorders } from "../actions";
import { colorMagentaLachs, FancyButton } from "./StyledComponents";

interface IDisorderslistState {
    disordersToAdd: Disorders[];
    disordersToRemove: Disorders[];
    disorders: IDisorder[];
}

interface IDisorderslistOwnProps {
    onDisorderselect?: any;
    onCancel?: any;
    id: ID;
}

interface IDisorderslistStateProps {
    currentlySelectedDisorders?: Disorders[];
}

interface IDisorderslistDispatchProps {
    updateSurvivorDisorder: (id: ID, arts: Disorders[]) => UpdateSurvivorDisordersAction;
}

interface IDisorderslistProps extends IDisorderslistStateProps, IDisorderslistDispatchProps, IDisorderslistOwnProps { }

const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    padding:.25rem;
    width: 80%;
`;

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
    height: 70%;
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

const SelectedListElement = ListElement.extend`
    border: 3px solid ${colorMagentaLachs};
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

const mapStateToProps = (state: IState, ownProps: IDisorderslistOwnProps): IDisorderslistStateProps => {
    const survivor = state.settlement.survivors.find((s) => s.id === ownProps.id);
    if (survivor && survivor.disorders) {
        return {
            currentlySelectedDisorders: survivor.disorders.map((disorder) => disorder.id),
        };
    }
    return {
        currentlySelectedDisorders: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorDisordersAction>): IDisorderslistDispatchProps => ({
    updateSurvivorDisorder: (id: ID, arts: Disorders[]) => dispatch(updateSurvivorDisorders(id, arts)),
});

class Disorderslist extends React.Component<IDisorderslistProps, IDisorderslistState> {
    constructor(props: IDisorderslistProps) {
        super(props);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.renderListElement = this.renderListElement.bind(this);
        this.submit = this.submit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.state = {
            disorders,
            disordersToAdd: [],
            disordersToRemove: [],
        };
    }

    public render() {
        return (
            <Wrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} autoFocus={true} />
                <List>
                    {this.state.disorders.map((disorder, idx) => <React.Fragment key={idx}>{this.renderListElement(disorder)}</React.Fragment>)}
                </List>
                <FancyButton onClick={this.submit}>Submit</FancyButton>
            </Wrapper>
        );
    }

    private renderListElement(art: IDisorder) {
        const currentlySelectedDisorders = this.props.currentlySelectedDisorders || [];
        const isSelected = (currentlySelectedDisorders.includes(art.id) && !this.state.disordersToRemove.includes(art.id)) || this.state.disordersToAdd.includes(art.id);
        if (isSelected) {
            return <SelectedListElement onClick={this.deselectDisorder.bind(this, art.id)}>{art.name}</SelectedListElement>;
        }
        return <ListElement onClick={this.selectDisorder.bind(this, art.id)}>{art.name}</ListElement>;
    }
    private selectDisorder(newArt: Disorders) {
        const currentlySelectedDisorders = this.props.currentlySelectedDisorders || [];
        const count = currentlySelectedDisorders.length + this.state.disordersToAdd.length - this.state.disordersToRemove.length;
        if (count < 3) {
            this.setState({
                disordersToAdd: this.state.disordersToAdd.concat(newArt),
                disordersToRemove: this.state.disordersToRemove.filter((art) => art !== newArt),
            });
        }
    }
    private deselectDisorder(artToDeselect: Disorders) {
        const currentlySelectedDisorders = this.props.currentlySelectedDisorders || [];
        this.setState({
            disordersToAdd: this.state.disordersToAdd.filter((art) => art !== artToDeselect),
            disordersToRemove: this.state.disordersToRemove.concat(artToDeselect),
        });
    }

    private submit(e: SyntheticEvent<HTMLButtonElement>) {
        const { disordersToAdd, disordersToRemove } = this.state;
        const arts = (this.props.currentlySelectedDisorders || []).concat(disordersToAdd).filter((art) => !disordersToRemove.includes(art));
        this.props.updateSurvivorDisorder(this.props.id, arts);
        this.props.onCancel();

    }

    private handleCloseIconClick() {
        this.props.onCancel();
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({
                disorders,
            });
        } else {
            const fuse = new Fuse(disorders as any[], {
                keys: ["name"],
                threshold: 0.5,
            });
            this.setState({
                disorders: fuse.search(event.currentTarget.value),
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Disorderslist);
