import React from "react";
import { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setName } from "../actions/settlementActions";
import { ISettlement } from "../interfaces";
import { SetNameAction } from "../interfaces/settlementActions";

interface ISettlementNameDispatchProps {
    setName: (name: string) => SetNameAction;
}

interface ISettlementNameStateProps {
    name?: string;
}

interface ISettlementNameProps extends ISettlementNameDispatchProps, ISettlementNameStateProps { }

interface ISettlementNameState {
    editmode: boolean;
}

const mapStateToProps = (state: ISettlement, ownProps: ISettlementNameStateProps): ISettlementNameStateProps => {
    return {
        name: state.name,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SetNameAction>): ISettlementNameDispatchProps => ({
    setName: (name: string) => dispatch(setName(name)),
});

class SettlementName extends Component<ISettlementNameProps, ISettlementNameState> {
    public constructor(props: ISettlementNameProps) {
        super(props);
        this.handleHeadlineClick = this.handleHeadlineClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            editmode: false,
        };
    }
    public render() {
        if (this.state.editmode) {
            return (<input type="text" defaultValue={this.props.name} onBlur={this.handleBlur} />);
        } else {
            return (<h1 onClick={this.handleHeadlineClick}>{this.props.name}</h1>);
        }
    }

    private handleHeadlineClick(e: SyntheticEvent<HTMLHeadingElement>) {
        this.setState({
            editmode: true,
        });
    }
    private handleBlur(e: SyntheticEvent<HTMLInputElement>) {
        this.props.setName(e.currentTarget.value);
        this.setState({
            editmode: false,
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettlementName);
