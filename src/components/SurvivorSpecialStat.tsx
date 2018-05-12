import { LayerEvents } from "interfaces/layer";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivorStat } from "../actions/survivorActions";
import { ID, IDefenseStat, ISettlement, ISpecialStat, IWeaponArt, SpecialStats } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import layerSubject from "../layerSubject";
import { specialStatToString } from "../util";
import NumberEdit from "./NumberEdit";
import { FancyButton } from "./StyledComponents";
import { Label, StatEdit, StatEditWrapper, StatElement, StatWrapper } from "./SurvivorStatElements";
import WeaponArtItem from "./WeaponArtItem";
import WeaponArtslist from "./WeaponArtsList";

interface ISpecialStatStateProps {
    stat?: ISpecialStat;
    survivor?: ID;
    weaponArts?: ReadonlyArray<IWeaponArt>;
    survivorname: string;
}

interface ISpecialStatDispatchProps {
    updateSurvivorStat: (stat: ISpecialStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface ISpecialStatOwnProps {
    id: ID;
    statid: SpecialStats;
}

interface ISpecialStatProps extends ISpecialStatStateProps, ISpecialStatDispatchProps, ISpecialStatOwnProps { }

interface ISpecialStatState {
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
        stat: survivor ? survivor.specialstats.find((specialstat) => specialstat.stat === ownProps.statid) : undefined,
        survivor: survivor ? survivor.id : undefined,
        survivorname: survivor ? survivor.name : "",
        weaponArts: ownProps.statid === SpecialStats.weapon_proficiency && survivor ? survivor.weaponArts : [],
    };
};

class SurvivorSpecialStat extends React.Component<ISpecialStatProps, ISpecialStatState> {

    private valuefield?: HTMLInputElement;

    public constructor(props: ISpecialStatProps) {
        super(props);
        this.state = {
            showWeaponArtList: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);

        this.setupValueRef = this.setupValueRef.bind(this);
        this.showWeaponArtList = this.showWeaponArtList.bind(this);
        this.hideWeaponArtList = this.hideWeaponArtList.bind(this);
        this.renderSpecialStatText = this.renderSpecialStatText.bind(this);
    }

    public render() {
        const { stat } = this.props;
        if (stat) {
            return (
                <StatWrapper>
                    <StatElement onClick={this.handleEditClick}>
                        {stat.value}
                    </StatElement>
                    {this.renderSpecialStatText()}
                    {(stat.stat === SpecialStats.weapon_proficiency) && this.renderWeaponArt()}
                </StatWrapper>
            );
        }
        return "";
    }

    private renderWeaponArt() {
        if (this.props.survivor) {
            const { showWeaponArtList } = this.state;
            const { weaponArts, survivor } = this.props;
            if (weaponArts) {
                return (
                    <React.Fragment>
                        <WeaponArtItemsWrapper>
                            {weaponArts.map((art, idx) => <WeaponArtItem key={idx} art={art} />)}
                        </WeaponArtItemsWrapper>
                        <FancyButton onClick={this.showWeaponArtList}>Manage Weapon Arts</FancyButton>
                        {showWeaponArtList && <WeaponArtslist id={this.props.survivor} onCancel={this.hideWeaponArtList} />}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <FancyButton onClick={this.showWeaponArtList}>Manage Weapon Arts</FancyButton>
                        {showWeaponArtList && <WeaponArtslist id={this.props.survivor} onCancel={this.hideWeaponArtList} />}
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
        if (this.props.stat) {
            const { stat, value } = this.props.stat;
            layerSubject.next({
                payload: {
                    content: (
                        <React.Fragment>
                            <StatEditWrapper>
                                <StatEdit>
                                    <Label>Value</Label><NumberEdit value={value} innerRef={this.setupValueRef} />
                                </StatEdit>
                            </StatEditWrapper>
                            <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
                        </React.Fragment>
                    ),
                    headline: <React.Fragment>{this.props.survivor && this.props.survivorname}'s {specialStatToString(stat)}</React.Fragment>,
                },
                type: LayerEvents.show_simple,
            });
        }
    }

    private setupValueRef(elem: HTMLInputElement) {
        this.valuefield = elem;
    }
    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.valuefield && this.props.stat) {
            const nextStat = {
                ...this.props.stat,
                value: parseInt(this.valuefield.value, 10),
            };
            if (this.props && this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor);
            }
        }
        layerSubject.next({
            payload: undefined,
            type: LayerEvents.hide,
        });
    }

    private renderSpecialStatText() {
        if (this.props.stat) {
            const { stat } = this.props;

            switch (stat.stat) {
                case SpecialStats.weapon_proficiency: {
                    if (stat.value === 8) {
                        return "Master";
                    } else if (stat.value >= 3) {
                        return "Specialist";
                    }
                }
                case SpecialStats.courage: {
                    if (stat.value === 9) {
                        return "See the Truth";
                    } else if (stat.value >= 3) {
                        return "Bold";
                    }
                }
                case SpecialStats.understanding: {
                    if (stat.value === 9) {
                        return "Insight";
                    } else if (stat.value >= 3) {
                        return "White Secret";
                    }
                }
                default: return "";
            }
        }
        return "";
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorSpecialStat);
