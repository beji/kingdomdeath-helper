import { ISettlement } from "./settlement";

export interface IRoomMessage {
    room: string;
}

export interface IStatusUpdateMessage {
    room: string;
    payload: ISettlement;
}
