import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer, updateSurvivorStat } from "../actions";
import { BaseStats, IBaseStat, ID, IDefenseStat, IState, LayerType } from "../interfaces";
import { HideLayerAction, UpdateSurvivorStatAction } from "../interfaces/actions";
import { capitalize } from "../util";
import NumberEdit from "./NumberEdit";
import { CloseIcon, FancyButton, SimpleLayerHeadline, SimpleLayerWrapper } from "./StyledComponents";
import { Label, StatEdit, StatEditWrapper } from "./SurvivorStatElements";

interface IBaseStatLayerStateProps {
    survivor?: ID;
    survivorname?: string;
    stat?: IBaseStat;
}

interface IBaseStatLayerDispatchProps {
    hideLayer: () => HideLayerAction;
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface IBaseStatLayerProps extends IBaseStatLayerStateProps, IBaseStatLayerDispatchProps { }

const mapStateToProps = (state: IState): IBaseStatLayerStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.basestat) {
        const layerData = state.interface.layer;
        const survivor = state.settlement.survivors.find((s) => s.id === layerData.survivor);
        if (survivor) {
            const stat = survivor.baseStats.find((basestat) => basestat.stat === layerData.stat);
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

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction | UpdateSurvivorStatAction>): IBaseStatLayerDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

class BaseStatLayer extends React.Component<IBaseStatLayerProps> {

    private permfield?: HTMLInputElement;
    private gearfield?: HTMLInputElement;
    private tokenfield?: HTMLInputElement;

    public constructor(props: IBaseStatLayerProps) {
        super(props);
        this.hideLayer = this.hideLayer.bind(this);

        this.handleEditConfirm = this.handleEditConfirm.bind(this);

        this.setupPermRef = this.setupPermRef.bind(this);
        this.setupGearRef = this.setupGearRef.bind(this);
        this.setupTokenRef = this.setupTokenRef.bind(this);

    }
    public render() {
        if (this.props.stat && this.props.survivorname) {
            const { survivorname } = this.props;
            const { permanent, gear, token, stat } = this.props.stat;
            return (
                <SimpleLayerWrapper>
                    <CloseIcon onClick={this.hideLayer}>X</CloseIcon>
                    <SimpleLayerHeadline>{this.props.survivorname && this.props.survivorname}'s {capitalize(BaseStats[stat])}</SimpleLayerHeadline>
                    <StatEditWrapper>
                        <StatEdit>
                            <Label>Permanent</Label><NumberEdit value={permanent} innerRef={this.setupPermRef} />
                        </StatEdit>
                        <StatEdit>
                            <Label>Gear</Label><NumberEdit value={gear} innerRef={this.setupGearRef} />
                        </StatEdit>
                        <StatEdit>
                            <Label>Token</Label><NumberEdit value={token} innerRef={this.setupTokenRef} />
                        </StatEdit>
                    </StatEditWrapper>
                    <FancyButton onClick={this.handleEditConfirm}>Save &#x2713;</FancyButton>
                </SimpleLayerWrapper>
            );
        } else {
            return "";
        }
    }

    private setupPermRef(elem: HTMLInputElement) {
        this.permfield = elem;
    }

    private setupGearRef(elem: HTMLInputElement) {
        this.gearfield = elem;
    }

    private setupTokenRef(elem: HTMLInputElement) {
        this.tokenfield = elem;
    }

    private hideLayer(e?: SyntheticEvent<HTMLElement>) {
        this.props.hideLayer();
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.gearfield && this.permfield && this.tokenfield && this.props.stat) {
            const nextStat = {
                ...this.props.stat,
                gear: parseInt(this.gearfield.value, 10),
                permanent: parseInt(this.permfield.value, 10),
                token: parseInt(this.tokenfield.value, 10),
            };
            if (this.props && typeof this.props.survivor !== "undefined") {
                this.props.updateSurvivorStat(nextStat, this.props.survivor);
            }
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatLayer);
