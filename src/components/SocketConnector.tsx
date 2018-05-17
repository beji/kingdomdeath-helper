import Actions, { RemoteableActions } from "interfaces/reducer";
import React from "react";
import { connect, Dispatch } from "react-redux";
import { importSettlement, remoteAction } from "../actions/importAction";
import socket from "../clientsocket";
import { ISettlement, IState } from "../interfaces";
import { ImportAction, RemoteAction } from "../interfaces/actions";
import { IRoomMessage, IStatusUpdateMessage, SocketMessages } from "../interfaces/socketMessages";
import { clone, getURLParam } from "../util";

// const roomId = getURLParam("id");

interface ISocketConnectorStateProps {
    settlement?: ISettlement;
}
interface ISocketConnectorDispatchProps {
    importSettlement: (imported: ISettlement) => ImportAction;
    remoteAction: (action: RemoteableActions) => RemoteAction;
}

interface ISocketConnectorProps extends ISocketConnectorStateProps, ISocketConnectorDispatchProps { }

const mapStateToProps = (state: IState, ownProps: ISocketConnectorStateProps): ISocketConnectorStateProps => {
    return {
        settlement: clone(state.settlement),
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ImportAction | RemoteAction>): ISocketConnectorDispatchProps => ({
    importSettlement: (imported: ISettlement) => dispatch(importSettlement(imported)),
    remoteAction: (action: RemoteableActions) => dispatch(remoteAction(action)),
});

class SocketConnector extends React.Component<ISocketConnectorProps> {
    constructor(props: ISocketConnectorProps) {
        super(props);
    }

    public componentDidMount() {
        socket.on(SocketMessages.STATE_UPDATE, (data: RemoteableActions) => {
            console.log("STATE UPDATE!!!", data);
            console.log("new state", data);
            this.props.remoteAction(data);
        });

        socket.on(SocketMessages.FULL_SYNC, (data: ISettlement) => {
            console.log("Full Sync incoming!");
            this.props.importSettlement(data);
        });

        const roomId = getURLParam("id");

        if (roomId !== "") {
            socket.emit(SocketMessages.JOIN, { room: roomId } as IRoomMessage);
            console.log("roomId", roomId);
        } else if (this.props.settlement) {
            window.history.pushState({}, "Kingdom Death", `/?id=${this.props.settlement.id}`);
            socket.emit(SocketMessages.JOIN, { room: this.props.settlement.id } as IRoomMessage);
            console.log("roomId", this.props.settlement.id);
        }

    }

    public render() {
        return (<div>Connector {this.props.settlement && this.props.settlement.id}!</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector);
