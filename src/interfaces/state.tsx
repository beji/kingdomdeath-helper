import { ISettlement } from "interfaces";

export interface IInterface {
    layer: {
        headline?: JSX.Element;
        content?: JSX.Element;
    };
}

export interface IState {
    settlement: ISettlement;
    interface: IInterface;
}
