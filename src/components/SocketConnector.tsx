import React from "react";
import { connect, Dispatch } from "react-redux";
import io from "socket.io-client";
import { importSettlement } from "../actions/importAction";
import { ISettlement } from "../interfaces";
import { ImportAction } from "../interfaces/importAction";
import { IRoomMessage, IStatusUpdateMessage } from "../interfaces/socketMessages";
import { clone } from "../util";

const socket = io();

const roomId = getURLParam(window.location.href, "id");

interface ISocketConnectorStateProps {
    settlement?: ISettlement;
}
interface ISocketConnectorDispatchProps {
    importSettlement: (imported: ISettlement) => ImportAction;
}

interface ISocketConnectorProps extends ISocketConnectorStateProps, ISocketConnectorDispatchProps { }

function getURLParam(urlFragment: string, name: string) {
    return decodeURIComponent(
        urlFragment.replace(
            new RegExp(
                "^(?:.*[&\\?\\#]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

const mapStateToProps = (state: ISettlement, ownProps: ISocketConnectorStateProps): ISocketConnectorStateProps => {
    return {
        settlement: clone(state),
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ImportAction>): ISocketConnectorDispatchProps => ({
    importSettlement: (imported: ISettlement) => dispatch(importSettlement(imported)),
});

class SocketConnector extends React.Component<ISocketConnectorProps> {
    constructor(props: ISocketConnectorProps) {
        super(props);
    }

    // tslint:disable-next-line:member-ordering
    public componentDidUpdate(prevProps: ISocketConnectorStateProps) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props.settlement)) {
            socket.emit("state_update", { room: roomId, payload: this.props.settlement } as IStatusUpdateMessage);
        }
    }

    public componentDidMount() {
        socket.on("state_update_received", (data: ISettlement) => {
            if (data !== null && JSON.stringify(data) !== JSON.stringify(this.props.settlement)) {
                console.log("new state", data);
                this.props.importSettlement(data);
            }
        });
        if (roomId !== "") {
            socket.emit("room", { room: roomId } as IRoomMessage);
            console.log("roomId", roomId);
        }

    }

    public render() {
        return (<div>Connector {this.props.settlement && this.props.settlement.id}!</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector);
