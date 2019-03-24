import disorders from "data/final/disorder.json";
import Fuse from "fuse.js";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer, updateSurvivorDisorders } from "../../actions";
import { Disorders, ID, IDisorder, IState, LayerType } from "../../interfaces";
import { HideLayerAction, UpdateSurvivorDisordersAction } from "../../interfaces/actions";
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement } from "./../StyledComponents";

interface IDisorderslistState {
    disordersToAdd: Disorders[];
    disordersToRemove: Disorders[];
    disorders: IDisorder[];
}

interface IDisorderslistOwnProps {
    onDisorderselect?: any;
    onCancel?: any;
}

interface IDisorderslistStateProps {
    currentlySelectedDisorders?: Disorders[];
    id?: ID;
}

interface IDisorderslistDispatchProps {
    hideLayer: () => HideLayerAction;
    updateSurvivorDisorder: (id: ID, arts: Disorders[]) => UpdateSurvivorDisordersAction;
}

interface IDisorderslistProps extends IDisorderslistStateProps, IDisorderslistDispatchProps, IDisorderslistOwnProps { }

const mapStateToProps = (state: IState): IDisorderslistStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.disorderlist) {
        if (typeof state.interface.layer.survivor !== "undefined") {
            const sid = state.interface.layer.survivor;
            const survivor = state.settlement.survivors.find((s) => s.id === sid);
            if (survivor) {
                return {
                    currentlySelectedDisorders: survivor.disorders ? survivor.disorders.map((disorder) => disorder.id) : [],
                    id: sid,
                };
            }
        }
    }
    return {
        currentlySelectedDisorders: undefined,
        id: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorDisordersAction | HideLayerAction>): IDisorderslistDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
    updateSurvivorDisorder: (id: ID, arts: Disorders[]) => dispatch(updateSurvivorDisorders(id, arts)),
});

class Disorderslist extends React.Component<IDisorderslistProps, IDisorderslistState> {
    constructor(props: IDisorderslistProps) {
        super(props);
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
        if (typeof this.props.id !== "undefined") {
            return (
                <ListWrapper>
                    <CloseIcon onClick={this.props.hideLayer}>X</CloseIcon>
                    <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} autoFocus={true} />
                    <List>
                        {this.state.disorders.map((disorder, idx) => <React.Fragment key={idx}>{this.renderListElement(disorder)}</React.Fragment>)}
                    </List>
                    <FancyButton onClick={this.submit}>Submit</FancyButton>
                </ListWrapper>
            );
        } else {
            return "";
        }
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
        if (typeof this.props.id !== "undefined") {
            const { disordersToAdd, disordersToRemove } = this.state;
            const arts = (this.props.currentlySelectedDisorders || []).concat(disordersToAdd).filter((art) => !disordersToRemove.includes(art));
            this.props.updateSurvivorDisorder(this.props.id, arts);
            this.props.hideLayer();
        }
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
