import { ISettlement } from "interfaces";
import { IBaseStatLayer, IDefenseStatLayer, ISimpleLayer } from "interfaces/layer";

export interface IInterface {
    layer?: ISimpleLayer | IBaseStatLayer | IDefenseStatLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
