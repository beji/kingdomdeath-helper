import { LayerEvents } from "interfaces/layer";
import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSurvivorStat } from "../actions/survivorActions";
import { BaseStats, IBaseStat, ID, IDefenseStat, ISettlement } from "../interfaces";
import { UpdateSurvivorStatAction } from "../interfaces/survivorActions";
import layerSubject from "../layerSubject";
import { capitalize } from "../util";
import NumberEdit from "./NumberEdit";
import { FancyButton } from "./StyledComponents";
import { Label, StatEdit, StatEditWrapper, StatElement, StatWrapper } from "./SurvivorStatElements";

interface IBaseStatStateProps {
    survivor?: ID;
    survivorname?: string;
    stat?: IBaseStat;
}

interface IBaseStatDispatchProps {
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => UpdateSurvivorStatAction;
}

interface IBaseStatOwnProps {
    id: ID;
    statid: BaseStats;
}

interface IBaseStatProps extends IBaseStatStateProps, IBaseStatDispatchProps, IBaseStatOwnProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorStatAction>): IBaseStatDispatchProps => ({
    updateSurvivorStat: (stat: IBaseStat | IDefenseStat, survivorId: ID) => dispatch(updateSurvivorStat(stat, survivorId)),
});

const mapStateToProps = (state: ISettlement, ownProps: IBaseStatOwnProps): IBaseStatStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);

    return {
        stat: survivor ? survivor.baseStats.find((basestat) => basestat.stat === ownProps.statid) : undefined,
        survivor: survivor ? survivor.id : undefined,
        survivorname: survivor ? survivor.name : "",
    };
};

class SurvivorBaseStat extends React.Component<IBaseStatProps> {

    private permfield?: HTMLInputElement;
    private gearfield?: HTMLInputElement;
    private tokenfield?: HTMLInputElement;

    public constructor(props: IBaseStatProps) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);

        this.setupPermRef = this.setupPermRef.bind(this);
        this.setupGearRef = this.setupGearRef.bind(this);
        this.setupTokenRef = this.setupTokenRef.bind(this);

    }

    public render() {
        const { stat } = this.props;
        if (stat) {
            const classes = [
                stat.gear > 0 ? "gear" : "",
                stat.token > 0 ? "token" : "",
            ];
            return (
                <StatWrapper>
                    <StatElement onClick={this.handleEditClick} className={classes.map((v) => v).join(" ")}>
                        {stat.permanent + stat.gear + stat.token}
                    </StatElement>
                </StatWrapper>
            );
        }
        return "";
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        if (this.props.stat) {
            const { permanent, gear, token, stat } = this.props.stat;
            layerSubject.next({
                payload: {
                    content: (
                        <React.Fragment>
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
                        </React.Fragment>
                    ),
                    headline: <React.Fragment>{this.props.survivorname && this.props.survivorname}'s {capitalize(BaseStats[stat])}</React.Fragment>,
                },
                type: LayerEvents.show_simple,
            });
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

    private handleEditConfirm(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.gearfield && this.permfield && this.tokenfield && this.props.stat) {
            const nextStat = {
                ...this.props.stat,
                gear: parseInt(this.gearfield.value, 10),
                permanent: parseInt(this.permfield.value, 10),
                token: parseInt(this.tokenfield.value, 10),
            };
            if (this.props && this.props.survivor) {
                this.props.updateSurvivorStat(nextStat, this.props.survivor);
            }
            layerSubject.next({
                payload: undefined,
                type: LayerEvents.hide,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorBaseStat);
