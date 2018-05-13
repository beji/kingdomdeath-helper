import { ISettlement } from "interfaces";
import { IBaseStatLayer, ISimpleLayer } from "interfaces/layer";

export interface IInterface {
    layer?: ISimpleLayer | IBaseStatLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
