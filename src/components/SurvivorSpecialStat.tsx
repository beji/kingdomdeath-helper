import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IDefenseStat, ISettlement, ISpecialStat, ISurvivor, IWeaponArt, SpecialStats } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import { capitalize, clone, specialStatToString } from "../util";
import FancyButton from "./FancyButton";
import NumberEdit from "./NumberEdit";
import { SimpleLayer, SimpleLayerHeadline } from "./StyledComponents";
import { Label, StatEdit, StatElement, StatWrapper } from "./SurvivorStatElements";
import WeaponArtItem from "./WeaponArtItem";
import WeaponArtslist from "./WeaponArtsList";

interface ISpecialStatStateProps {
    survivor?: ISurvivor;
}

interface ISpecialStatDispatchProps {
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISpecialStatOwnProps {
    id: ID;
    stat: ISpecialStat;
}

interface ISpecialStatProps extends ISpecialStatStateProps, ISpecialStatDispatchProps, ISpecialStatOwnProps { }

interface ISpecialStatState {
    editSurvivorStat: boolean;
    showWeaponArtList: boolean;
}

const WeaponArtItemsWrapper = styled.div`
    text-align: left;
`;

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): ISpecialStatDispatchProps => ({
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISpecialStatOwnProps): ISpecialStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);

    return {
        survivor: clone(survivor),
    };
};

class SurvivorSpecialStat extends React.Component<ISpecialStatProps, ISpecialStatState> {

    private valuefield?: HTMLInputElement;

    public constructor(props: ISpecialStatProps) {
        super(props);
        this.state = {
            editSurvivorStat: false,
            showWeaponArtList: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.renderEditState = this.renderEditState.bind(this);

        this.setupValueRef = this.setupValueRef.bind(this);
        this.showWeaponArtList = this.showWeaponArtList.bind(this);
        this.hideWeaponArtList = this.hideWeaponArtList.bind(this);
    }

    public render() {
        const { editSurvivorStat } = this.state;
        const { stat } = this.props;

        return (
            <StatWrapper>
                <StatElement onClick={this.handleEditClick}>
                    {stat.value}
                </StatElement>
                {editSurvivorStat && this.renderEditState()}
                {(stat.stat === SpecialStats.weapon_proficiency) && this.renderWeaponArt()}
            </StatWrapper>
        );
    }

    private renderEditState() {
        const { stat, value } = this.props.stat;
        return (
            <SimpleLayer>
                <SimpleLayerHeadline>{this.props.survivor && this.props.survivor.name}'s {specialStatToString(stat)}</SimpleLayerHeadline>
                <StatEdit>
                    <Label>Value</Label><NumberEdit value={value} innerRef={this.setupValueRef} />
                </StatEdit>
                <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
            </SimpleLayer>
        );
    }

    private renderWeaponArt() {
        if (this.props.survivor) {
            const { showWeaponArtList } = this.state;
            const { weaponArts } = this.props.survivor;
            if (weaponArts) {
                return (
                    <React.Fragment>
                        <WeaponArtItemsWrapper>
                            {weaponArts.map((art, idx) => <WeaponArtItem key={idx} art={art} />)}
                        </WeaponArtItemsWrapper>
                        <FancyButton onClick={this.showWeaponArtList}>Manage Weapon Arts</FancyButton>
                        {showWeaponArtList && <WeaponArtslist id={this.props.survivor.id} onCancel={this.hideWeaponArtList} />}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <FancyButton onClick={this.showWeaponArtList}>Manage Weapon Arts</FancyButton>
                        {showWeaponArtList && <WeaponArtslist id={this.props.survivor.id} onCancel={this.hideWeaponArtList} />}
                    </React.Fragment>
                );
            }
        }
        return ("");
    }

    private showWeaponArtList(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            showWeaponArtList: true,
        });
    }

    private hideWeaponArtList() {
        this.setState({
            showWeaponArtList: false,
        });
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editSurvivorStat: true,
        });
    }

    private setupValueRef(elem: HTMLInputElement) {
        this.valuefield = elem;
    }
    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.valuefield) {
            const nextStat = {
                ...this.props.stat,
                value: parseInt(this.valuefield.value, 10),
            };
            if (this.props && this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor.id);
            }
        }
        this.setState({
            editSurvivorStat: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorSpecialStat);
