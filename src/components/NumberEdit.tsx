import React from "react";
import { Fragment, SyntheticEvent } from "react";
import styled from "styled-components";
import FancyButton from "./FancyButton";

const StyledInput = styled.input`
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0;
    vertical-align: middle;
    width: 2.5rem;
    text-align:center;
`;

const FancyButtonLeft = FancyButton.extend`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width:1.5rem;
`;

const FancyButtonRight = FancyButton.extend`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width:1.5rem;
`;

interface INumberEditProps {
    value: number;
    innerRef: (ref: HTMLInputElement) => void;
}

export default class NumberEdit extends React.Component<INumberEditProps> {

    private textfield?: HTMLInputElement;

    public constructor(props: INumberEditProps) {
        super(props);
        this.setupInputRef = this.setupInputRef.bind(this);
    }
    public render() {
        const { value } = this.props;

        return (
            <Fragment>
                <FancyButtonLeft onClick={this.handleValueChange.bind(this, -1)}>-</FancyButtonLeft>
                <StyledInput type="text" innerRef={this.setupInputRef} defaultValue={value.toString()} />
                <FancyButtonRight onClick={this.handleValueChange.bind(this, 1)}>+</FancyButtonRight>
            </Fragment>
        );
    }

    private handleValueChange(increment: number) {
        if (this.textfield && this.textfield.value) {
            const oldValue = parseInt(this.textfield.value, 10);
            this.textfield.value = (oldValue + increment).toString();
        }
    }

    private setupInputRef(elem: HTMLInputElement) {
        this.textfield = elem;
        this.props.innerRef(elem);
    }

}
