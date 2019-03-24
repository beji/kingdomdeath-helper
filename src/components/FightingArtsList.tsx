import Fuse from "fuse.js";
import { UpdateSurvivorFightingArtsAction } from "interfaces/actions";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import fightingArts from "../../data/final/fightingarts";
import { updateSurvivorFightingArt } from "../actions";
import { FightingArt, ID, IFightingArt, IState } from "../interfaces";
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement } from "./StyledComponents";

interface IFightingArtslistState {
    artsToAdd: FightingArt[];
    artsToRemove: FightingArt[];
    arts: IFightingArt[];
}

interface IFightingArtslistOwnProps {
    onfightingArtselect?: any;
    onCancel?: any;
    id: ID;
}

interface IFightingArtslistStateProps {
    currentlySelectedArts?: FightingArt[];
}

interface IFightingArtslistDispatchProps {
    updateSurvivorFightingArt: (id: ID, arts: FightingArt[]) => UpdateSurvivorFightingArtsAction;
}

interface IFightingArtslistProps extends IFightingArtslistStateProps, IFightingArtslistDispatchProps, IFightingArtslistOwnProps { }

const mapStateToProps = (state: IState, ownProps: IFightingArtslistOwnProps): IFightingArtslistStateProps => {
    const survivor = state.settlement.survivors.find((s) => s.id === ownProps.id);
    if (survivor && survivor.fightingArts) {
        return {
            currentlySelectedArts: survivor.fightingArts.map((art) => art.id),
        };
    }
    return {
        currentlySelectedArts: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorFightingArtsAction>): IFightingArtslistDispatchProps => ({
    updateSurvivorFightingArt: (id: ID, arts: FightingArt[]) => dispatch(updateSurvivorFightingArt(id, arts)),
});

class FightingArtslist extends React.Component<IFightingArtslistProps, IFightingArtslistState> {
    constructor(props: IFightingArtslistProps) {
        super(props);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.renderListElement = this.renderListElement.bind(this);
        this.submit = this.submit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.state = {
            arts: fightingArts,
            artsToAdd: [],
            artsToRemove: [],
        };
    }

    public render() {
        return (
            <ListWrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} autoFocus={true} />
                <List>
                    {this.state.arts.map((art, idx) => <React.Fragment key={idx}>{this.renderListElement(art)}</React.Fragment>)}
                </List>
                <FancyButton onClick={this.submit}>Submit</FancyButton>
            </ListWrapper>
        );
    }

    private renderListElement(art: IFightingArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        const isSelected = (currentlySelectedArts.includes(art.id) && !this.state.artsToRemove.includes(art.id)) || this.state.artsToAdd.includes(art.id);
        if (isSelected) {
            return <SelectedListElement onClick={this.deselectFightingArt.bind(this, art.id)}>{art.name}</SelectedListElement>;
        }
        return <ListElement onClick={this.selectFightingArt.bind(this, art.id)}>{art.name}</ListElement>;
    }
    private selectFightingArt(newArt: FightingArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        const count = currentlySelectedArts.length + this.state.artsToAdd.length - this.state.artsToRemove.length;
        if (count < 3) {
            this.setState({
                artsToAdd: this.state.artsToAdd.concat(newArt),
                artsToRemove: this.state.artsToRemove.filter((art) => art !== newArt),
            });
        }
    }
    private deselectFightingArt(artToDeselect: FightingArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        this.setState({
            artsToAdd: this.state.artsToAdd.filter((art) => art !== artToDeselect),
            artsToRemove: this.state.artsToRemove.concat(artToDeselect),
        });
    }

    private submit(e: SyntheticEvent<HTMLButtonElement>) {
        const { artsToAdd, artsToRemove } = this.state;
        const arts = (this.props.currentlySelectedArts || []).concat(artsToAdd).filter((art) => !artsToRemove.includes(art));
        this.props.updateSurvivorFightingArt(this.props.id, arts);
        this.props.onCancel();

    }

    private handleCloseIconClick() {
        this.props.onCancel();
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({
                arts: fightingArts,
            });
        } else {
            const fuse = new Fuse(fightingArts as any[], {
                keys: ["name"],
                threshold: 0.5,
            });
            this.setState({
                arts: fuse.search(event.currentTarget.value),
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FightingArtslist);
