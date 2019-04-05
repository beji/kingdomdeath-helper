import weaponproficiencies from "data/final/weaponproficiencies";
import Fuse from "fuse.js";
import { HideLayerAction, UpdateSurvivorWeaponProficiencyAction } from "interfaces/actions";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer, updateWeaponProficiency } from "../../actions";
import { ID, IState, IWeaponProficiency, LayerType } from "../../interfaces";
import { WeaponProficiency } from "../../interfaces/ItemEnums";
import { CloseIcon, FancyButton, FilterInput, List, ListElement, ListWrapper, SelectedListElement } from "../StyledComponents";

interface IWeaponProficiencylistState {
    selected?: WeaponProficiency;
    proficiencies: ReadonlyArray<IWeaponProficiency>;
}

interface IWeaponProficiencylistOwnProps {
    onWeaponProficiencySelect?: any;
}

interface IWeaponProficiencylistStateProps {
    currentlySelectedProficiency?: IWeaponProficiency;
    survivor?: ID;
}

interface IWeaponProficiencylistDispatchProps {
    hideLayer: () => HideLayerAction;
    updateWeaponProficiency: (survivorId: ID, proficiency?: WeaponProficiency) => UpdateSurvivorWeaponProficiencyAction;
}

interface IWeaponProficiencylistProps extends IWeaponProficiencylistStateProps, IWeaponProficiencylistDispatchProps, IWeaponProficiencylistOwnProps { }

const mapStateToProps = (state: IState): IWeaponProficiencylistStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.weaponproficiencylist) {
        if (typeof state.interface.layer.survivor !== "undefined") {
            const sid = state.interface.layer.survivor;
            const survivor = state.settlement.survivors.find((s) => s.id === sid);
            if (survivor) {
                return {
                    currentlySelectedProficiency: typeof survivor.weaponProficiency !== "undefined" ? survivor.weaponProficiency : undefined,
                    survivor: survivor.id,
                };
            }
        }
    }

    return {
        currentlySelectedProficiency: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorWeaponProficiencyAction | HideLayerAction>): IWeaponProficiencylistDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
    updateWeaponProficiency: (survivorId: ID, proficiency?: WeaponProficiency) => dispatch(updateWeaponProficiency(survivorId, proficiency)),
});

class WeaponProficiencylist extends React.Component<IWeaponProficiencylistProps, IWeaponProficiencylistState> {
    constructor(props: IWeaponProficiencylistProps) {
        super(props);
        this.renderListElement = this.renderListElement.bind(this);
        this.submit = this.submit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.state = {
            proficiencies: weaponproficiencies,
            selected: undefined,
        };
    }

    public render() {
        if (typeof this.props.survivor !== "undefined") {
            return (
                <ListWrapper>
                    <CloseIcon onClick={this.props.hideLayer}>X</CloseIcon>
                    <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} autoFocus={true} />
                    <List>
                        {this.state.proficiencies.map((proficiency, idx) => <React.Fragment key={idx}>{this.renderListElement(proficiency)}</React.Fragment>)}
                    </List>
                    <FancyButton onClick={this.submit}>Submit</FancyButton>
                </ListWrapper>
            );
        } else {
            return "";
        }
    }

    private renderListElement(proficiency: IWeaponProficiency) {
        const selected = this.state.selected;
        const isSelected = typeof selected !== "undefined" && proficiency.id === selected;
        if (isSelected) {
            // tslint:disable-next-line:jsx-no-bind
            return <SelectedListElement onClick={this.deselectProficiency.bind(this)}>{proficiency.name}</SelectedListElement>;
        }
        return <ListElement onClick={this.selectProficiency.bind(this, proficiency.id)}>{proficiency.name}</ListElement>;
    }
    private selectProficiency(newProficiency: WeaponProficiency) {
        this.setState({
            ...this.state,
            selected: newProficiency,
        });
    }
    private deselectProficiency() {
        this.setState({
            ...this.state,
            selected: undefined,
        });
    }

    private submit(e: SyntheticEvent<HTMLButtonElement>) {
        if (typeof this.props.survivor !== "undefined") {
            this.props.updateWeaponProficiency(this.props.survivor, this.state.selected);
            this.props.hideLayer();
        }
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({
                proficiencies: weaponproficiencies,
            });
        } else {
            const fuse = new Fuse(weaponproficiencies as any[], {
                keys: ["name"],
                threshold: 0.5,
            });
            this.setState({
                proficiencies: fuse.search(event.currentTarget.value),
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponProficiencylist);
