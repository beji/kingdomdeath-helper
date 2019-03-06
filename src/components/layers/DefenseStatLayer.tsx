import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer, updateSurvivorStat } from "../../actions";
import { DefenseStats, IBaseStat, ID, IDefenseStat, IState, LayerType } from "../../interfaces";
import { HideLayerAction, UpdateSurvivorStatAction } from "../../interfaces/actions";
import { capitalize } from "../../util";
import NumberEdit from "../NumberEdit";
import { CloseIcon, FancyButton, SimpleLayerHeadline, SimpleLayerWrapper } from "../StyledComponents";
import { Label, StatEdit, StatEditWrapper } from "../SurvivorStatElements";

interface IDefenseStatLayerStateProps {
    survivor?: ID;
    survivorname?: string;
    stat?: IDefenseStat;
}

interface IDefenseStatLayerDispatchProps {
    hideLayer: () => HideLayerAction;
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface IDefenseStatLayerProps extends IDefenseStatLayerStateProps, IDefenseStatLayerDispatchProps { }

const mapStateToProps = (state: IState): IDefenseStatLayerStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.defensestat) {
        const layerData = state.interface.layer;
        const survivor = state.settlement.survivors.find((s) => s.id === layerData.survivor);
        if (survivor) {
            const stat = survivor.defenseStats.find((defensestat) => defensestat.stat === layerData.stat);
            if (stat) {
                return {
                    stat,
                    survivor: survivor.id,
                    survivorname: survivor.name,
                };
            }
        }
    }
    return {
        stat: undefined,
        survivor: undefined,
        survivorname: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateSurvivorStatAction>): IDefenseStatLayerDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

class DefenseStatLayer extends React.Component<IDefenseStatLayerProps> {

    private modifierfield?: HTMLInputElement;

    public constructor(props: IDefenseStatLayerProps) {
        super(props);
        this.hideLayer = this.hideLayer.bind(this);

        this.handleEditConfirm = this.handleEditConfirm.bind(this);
        this.setupModifierRef = this.setupModifierRef.bind(this);

    }
    public render() {
        if (this.props.stat && this.props.survivorname) {
            const { survivorname } = this.props;
            const { stat, armor, modifier } = this.props.stat;
            return (
                <SimpleLayerWrapper>
                    <CloseIcon onClick={this.hideLayer}>X</CloseIcon>
                    <SimpleLayerHeadline>{survivorname}'s {capitalize(DefenseStats[stat])}</SimpleLayerHeadline>
                    <StatEditWrapper>
                        <StatEdit>
                            <Label>Stat</Label><NumberEdit value={modifier} innerRef={this.setupModifierRef} addToDisplay={armor} />
                            <div>Gear total: {armor}</div>
                        </StatEdit>
                    </StatEditWrapper>
                    <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
                </SimpleLayerWrapper>
            );
        } else {
            return "";
        }
    }

    private setupModifierRef(elem: HTMLInputElement) {
        this.modifierfield = elem;
    }

    private hideLayer(e?: SyntheticEvent<HTMLElement>) {
        this.props.hideLayer();
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.props.stat && this.modifierfield) {
            const nextStat = {
                ...this.props.stat,
                modifier: parseInt(this.modifierfield.value, 10),
            };
            if (typeof this.props.survivor !== "undefined") {
                this.props.updateSurvivorStat(nextStat, this.props.survivor);
            }
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DefenseStatLayer);
