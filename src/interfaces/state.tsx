import { ISettlement } from "interfaces";
import { IBaseStatLayer, IDefenseStatLayer, IDisorderListLayer, ISimpleLayer, ISpecialStatLayer } from "interfaces/layer";

export interface IInterface {
    layer?: ISimpleLayer | IBaseStatLayer | IDefenseStatLayer | ISpecialStatLayer | IDisorderListLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
