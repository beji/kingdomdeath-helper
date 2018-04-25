import React from "react";
import { connect, Dispatch } from "react-redux";
import io from "socket.io-client";
import { importSettlement } from "../actions/importAction";
import { ID, ISettlement } from "../interfaces";
import { ImportAction } from "../interfaces/importAction";
import { clone } from "../util";
import SettlementName from "./SettlementName";

const socket = io();

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
    const roomId = getURLParam(window.location.href, "id");
    if (roomId !== "") {
        socket.emit("state_update", { room: roomId, payload: state });
    }
    return {
        ...ownProps,
        settlement: clone(state),
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ImportAction>): ISocketConnectorDispatchProps => ({
    importSettlement: (imported: ISettlement) => dispatch(importSettlement(imported)),
});

class SocketConnector extends React.Component<ISocketConnectorProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            roomId: getURLParam(window.location.href, "id"),
        };
    }
    public componentDidMount() {

        const roomId = getURLParam(window.location.href, "id");
        if (roomId !== "") {
            console.log("roomId", roomId);
            socket.emit("room", { room: roomId });
        }
        socket.on("state_update_received", (data: ISettlement) => {
            if (JSON.stringify(data) !== JSON.stringify(this.props.settlement)) {
                console.log("new state", data);
                console.log(this.props.importSettlement);
                this.props.importSettlement(data);
            }
        });
    }

    public render() {
        return (<div>Connector!</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnector);
