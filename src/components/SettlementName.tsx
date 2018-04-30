import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { setName } from "../actions/settlementActions";
import { ISettlement } from "../interfaces";
import { SetNameAction } from "../interfaces/settlementActions";
import NameEdit from "./NameEdit";

interface ISettlementNameDispatchProps {
    setName: (name: string) => SetNameAction;
}

interface ISettlementNameStateProps {
    name?: string;
}

const StyledName = styled.div`
    span {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 1.5vh;
        display: inline-block;
    }
`;

interface ISettlementNameProps extends ISettlementNameDispatchProps, ISettlementNameStateProps { }

const mapStateToProps = (state: ISettlement): ISettlementNameStateProps => {
    return {
        name: state.name,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SetNameAction>): ISettlementNameDispatchProps => ({
    setName: (name: string) => dispatch(setName(name)),
});

class SettlementName extends Component<ISettlementNameProps> {
    public constructor(props: ISettlementNameProps) {
        super(props);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.renderName = this.renderName.bind(this);
        this.state = {
            editmode: false,
        };
    }
    public render() {
        return (<StyledName><NameEdit name={this.props.name || "The town with no name"} updateFunc={this.handleNameUpdate} /></StyledName>);
    }

    private handleNameUpdate(newName: string) {
        this.props.setName(newName);
    }

    private renderName(name: string) {
        return (<h1>{name}</h1>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettlementName);
