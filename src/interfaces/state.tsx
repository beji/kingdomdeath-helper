import { ISettlement } from "interfaces";

export enum LayerType {
    simple,
}

export interface ISimpleLayer {
    type: LayerType.simple;
    headline: string;
    content: string;
}

export interface IInterface {
    layer?: ISimpleLayer;
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
