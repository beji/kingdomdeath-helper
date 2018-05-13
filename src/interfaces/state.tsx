import { ISettlement } from "interfaces";
import { ISimpleLayer } from "interfaces/layer";

export interface IInterface {
    layer?: ISimpleLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
