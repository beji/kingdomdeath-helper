import ActionTypes from "interfaces/actionTypes";
import Actions from "interfaces/reducer";
import socket from "./clientsocket";
import { getURLParam } from "./util";

export const socketMiddleware = (store: any) => (next: any) => (action: Actions) => {
    const roomId = getURLParam(window.location.href, "id");
    if (roomId && roomId !== "" && action.type !== ActionTypes.IMPORT && action.type !== ActionTypes.REMOTE_UPDATE) {
        console.log("emitting atomic_state_update with", action);
        socket.emit("atomic_state_update", {
            payload: action,
            room: roomId,
        });
    }
    next(action);
};
