import { ISettlement } from "./settlement";

export interface RoomMessage {
    room: string;
}

export interface StatusUpdateMessage {
    room: string, 
    payload: ISettlement;
}