import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { showLayer } from "../actions";
import { ID, IFightingartListLayer, IState, IWeaponProficiency, IWeaponProficiencyLayer, LayerType } from "../interfaces";
import { ShowLayerAction } from "../interfaces/actions";
import { FancyButton } from "./StyledComponents";
import WeaponProficiencyItem from "./WeaponProficiencyItem";

interface IWeaponProficiencyStateProps {
    weaponProficiency?: IWeaponProficiency;
}

interface IWeaponProficiencyOwnProps {
    id: ID;
}

interface IWeaponProficiencyDispatchProps {
    showLayer: (layer: IWeaponProficiencyLayer) => ShowLayerAction;
}

interface IWeaponProficiencyProps extends IWeaponProficiencyStateProps, IWeaponProficiencyOwnProps, IWeaponProficiencyDispatchProps { }

const WeaponProficiencyWrapper = styled.div`
    flex: 1;
    flex-grow: 2;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
`;

const mapStateToProps = (state: IState, ownProps: IWeaponProficiencyOwnProps): IWeaponProficiencyStateProps => {
    const survivor = state.settlement.survivors.find((s) => s.id === ownProps.id);
    const weaponProficiency = survivor && survivor.weaponProficiency ? survivor.weaponProficiency : undefined;
    return {
        weaponProficiency,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IWeaponProficiencyDispatchProps => ({
    showLayer: (layer: IWeaponProficiencyLayer) => dispatch(showLayer(layer)),
});

class SurvivorWeaponProficiency extends React.Component<IWeaponProficiencyProps> {
    public constructor(props: IWeaponProficiencyProps) {
        super(props);

        this.showWeaponProficiencyList = this.showWeaponProficiencyList.bind(this);
    }
    public render() {
        const { weaponProficiency } = this.props;
        if (typeof weaponProficiency !== "undefined") {
            return (
                <WeaponProficiencyWrapper>
                    <WeaponProficiencyItem weaponproficiency={weaponProficiency}/>
                    <FancyButton onClick={this.showWeaponProficiencyList}>Select Weapon Proficiency</FancyButton>
                </WeaponProficiencyWrapper>
            );
        } else {
            return (
                <WeaponProficiencyWrapper>
                    <FancyButton onClick={this.showWeaponProficiencyList}>Select Weapon Proficiency</FancyButton>
                </WeaponProficiencyWrapper>
            );
        }
    }

    private showWeaponProficiencyList() {
        this.props.showLayer({
            survivor: this.props.id,
            type: LayerType.weaponproficiencylist,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorWeaponProficiency);
