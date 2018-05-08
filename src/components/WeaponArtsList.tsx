import weaponArts from "data/final/weaponarts.json";
import { UpdateSurvivorWeaponArtsAction } from "interfaces/survivorActions";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivorWeaponArt } from "../actions";
import { ID, ISettlement, IWeaponArt, WeaponArt } from "../interfaces";
import FancyButton from "./FancyButton";
import { colorMagentaLachs } from "./StyledComponents";

interface IWeaponArtslistState {
    artsToAdd: WeaponArt[];
    artsToRemove: WeaponArt[];
}

interface IWeaponArtslistOwnProps {
    onweaponArtselect?: any;
    onCancel?: any;
    id: ID;
}

interface IWeaponArtslistStateProps {
    currentlySelectedArts?: WeaponArt[];
}

interface IWeaponArtslistDispatchProps {
    updateSurvivorWeaponArt: (id: ID, arts: WeaponArt[]) => UpdateSurvivorWeaponArtsAction;
}

interface IWeaponArtslistProps extends IWeaponArtslistStateProps, IWeaponArtslistDispatchProps, IWeaponArtslistOwnProps { }

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

const mapStateToProps = (state: ISettlement, ownProps: IWeaponArtslistOwnProps): IWeaponArtslistStateProps => {
    const survivor = state.survivors.find((s) => s.id === ownProps.id);
    if (survivor && survivor.weaponArts) {
        return {
            currentlySelectedArts: survivor.weaponArts.map((art) => art.id),
        };
    }
    return {
        currentlySelectedArts: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorWeaponArtsAction>): IWeaponArtslistDispatchProps => ({
    updateSurvivorWeaponArt: (id: ID, arts: WeaponArt[]) => dispatch(updateSurvivorWeaponArt(id, arts)),
});

class WeaponArtslist extends React.Component<IWeaponArtslistProps, IWeaponArtslistState> {
    constructor(props: IWeaponArtslistProps) {
        super(props);
        this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
        this.renderListElement = this.renderListElement.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            artsToAdd: [],
            artsToRemove: [],
        };
    }

    public render() {
        return (
            <Wrapper>
                {this.props.onCancel && <CloseIcon onClick={this.handleCloseIconClick}>X</CloseIcon>}
                <FancyButton onClick={this.submit}>Submit</FancyButton>
                <List>
                    {weaponArts.map((art, idx) => <React.Fragment key={idx}>{this.renderListElement(art)}</React.Fragment>)}
                </List>
            </Wrapper>
        );
    }

    private renderListElement(art: IWeaponArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        const isSelected = (currentlySelectedArts.includes(art.id) && !this.state.artsToRemove.includes(art.id)) || this.state.artsToAdd.includes(art.id);
        if (isSelected) {
            return <SelectedListElement onClick={this.deselectWeaponArt.bind(this, art.id)}>{art.name}</SelectedListElement>;
        }
        return <ListElement onClick={this.selectWeaponArt.bind(this, art.id)}>{art.name}</ListElement>;
    }
    private selectWeaponArt(newArt: WeaponArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        const count = currentlySelectedArts.length + this.state.artsToAdd.length - this.state.artsToRemove.length;
        if (count < 3) {
            this.setState({
                artsToAdd: this.state.artsToAdd.concat(newArt),
                artsToRemove: this.state.artsToRemove.filter((art) => art !== newArt),
            });
        }
    }
    private deselectWeaponArt(artToDeselect: WeaponArt) {
        const currentlySelectedArts = this.props.currentlySelectedArts || [];
        this.setState({
            artsToAdd: this.state.artsToAdd.filter((art) => art !== artToDeselect),
            artsToRemove: this.state.artsToRemove.concat(artToDeselect),
        });
    }

    private submit(e: SyntheticEvent<HTMLButtonElement>) {
        const { artsToAdd, artsToRemove } = this.state;
        const arts = (this.props.currentlySelectedArts || []).concat(artsToAdd).filter((art) => !artsToRemove.includes(art));
        this.props.updateSurvivorWeaponArt(this.props.id, arts);
        this.props.onCancel();

    }

    private handleCloseIconClick() {
        this.props.onCancel();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponArtslist);
