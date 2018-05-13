import { ISettlement } from "interfaces";
import { IBaseStatLayer, IDefenseStatLayer, ISimpleLayer, ISpecialStatLayer } from "interfaces/layer";

export interface IInterface {
    layer?: ISimpleLayer | IBaseStatLayer | IDefenseStatLayer | ISpecialStatLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
