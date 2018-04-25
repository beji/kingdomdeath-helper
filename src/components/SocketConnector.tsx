import React from "react";
import { connect, Dispatch } from "react-redux";
import io from "socket.io-client";
import { importSettlement } from "../actions/importAction";
import { ISettlement } from "../interfaces";
import { ImportAction } from "../interfaces/importAction";
import { clone } from "../util";
import SettlementName from "./SettlementName";

const socket = io();

interface ISocketConnectorProps {
    settlement?: ISettlement;
    importSettlement: (imported: ISettlement) => ImportAction;
}

const mapStateToProps = (state: ISettlement, ownProps: ISocketConnectorProps): ISocketConnectorProps => {
    socket.emit("state_update", { room: 1, payload: state });
    return {
        ...ownProps,
        settlement: clone(state),
    };
};
const mapDispatchToProps = (dispatch: Dispatch<ImportAction>) => ({
    importSettlement: (imported: ISettlement) => dispatch(importSettlement(imported)),
});

class SocketConnector extends React.Component<ISocketConnectorProps> {
    constructor(props: any) {
        super(props);
    }
    public componentDidMount() {
        socket.emit("room", { room: "1" });
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
