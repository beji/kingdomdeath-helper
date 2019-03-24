import disorders from "data/final/disorder.json";
import Fuse from "fuse.js";
import { Disorders, ID, IDisorder, IState } from "interfaces";
import { UpdateSurvivorDisordersAction } from "interfaces/actions";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorDisorders } from "../actions";
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement } from "./StyledComponents";

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
            <ListWrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} autoFocus={true} />
                <List>
                    {this.state.disorders.map((disorder, idx) => <React.Fragment key={idx}>{this.renderListElement(disorder)}</React.Fragment>)}
                </List>
                <FancyButton onClick={this.submit}>Submit</FancyButton>
            </ListWrapper>
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
