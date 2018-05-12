import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { setName, updateSurvivalLimit } from "../actions/settlementActions";
import { ISettlement } from "../interfaces";
import { SetNameAction, UpdateSurvivalLimitAction } from "../interfaces/settlementActions";
import NameEdit from "./NameEdit";
import NumberEdit from "./NumberEdit";

interface ISettlementNameDispatchProps {
    setName: (name: string) => SetNameAction;
    updateSurvivalLimit: (survivalLimit: number) => UpdateSurvivalLimitAction;
}

interface ISettlementNameStateProps {
    name?: string;
    survivalLimit: number;
}
const Wrapper = styled.section`
    margin-bottom:.25rem;
`;
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
        survivalLimit: state.survivalLimit,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SetNameAction | UpdateSurvivalLimitAction>): ISettlementNameDispatchProps => ({
    setName: (name: string) => dispatch(setName(name)),
    updateSurvivalLimit: (survivalLimit: number) => dispatch(updateSurvivalLimit(survivalLimit)),
});

class SettlementName extends Component<ISettlementNameProps> {
    private valuefield?: HTMLInputElement;

    public constructor(props: ISettlementNameProps) {
        super(props);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.renderName = this.renderName.bind(this);
        this.setupValueRef = this.setupValueRef.bind(this);
        this.handleSLChange = this.handleSLChange.bind(this);
        this.state = {
            editmode: false,
        };
    }
    public render() {
        return (
            <Wrapper>
                <StyledName>
                    <NameEdit name={this.props.name || "The town with no name"} updateFunc={this.handleNameUpdate} />
                </StyledName>
                Survival Limit: <NumberEdit innerRef={this.setupValueRef} value={this.props.survivalLimit} changeFunc={this.handleSLChange} />
            </Wrapper>
        );
    }

    private handleNameUpdate(newName: string) {
        this.props.setName(newName);
    }
    private handleSLChange() {
        if (this.valuefield) {
            this.props.updateSurvivalLimit(parseInt(this.valuefield.value, 10));
        }
    }

    private renderName(name: string) {
        return (<h1>{name}</h1>);
    }

    private setupValueRef(elem: HTMLInputElement) {
        this.valuefield = elem;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettlementName);
