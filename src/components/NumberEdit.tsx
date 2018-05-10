import React from "react";
import { Fragment, SyntheticEvent } from "react";
import styled from "styled-components";
import { FancyButton } from "./StyledComponents";

const StyledInput = styled.input`
    border-radius: 0;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0;
    text-align:center;
    vertical-align: middle;
    width: 2.5rem;
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
const HiddenInput = styled.input`
    display:none;
`;

interface INumberEditProps {
    addToDisplay?: number;
    innerRef: (ref: HTMLInputElement) => void;
    value: number;
}

export default class NumberEdit extends React.Component<INumberEditProps> {

    private textfield?: HTMLInputElement;
    private displayfield?: HTMLInputElement;

    public constructor(props: INumberEditProps) {
        super(props);
        this.setupInputRef = this.setupInputRef.bind(this);
        this.setupDisplayRef = this.setupDisplayRef.bind(this);
    }
    public render() {
        const { addToDisplay, value } = this.props;

        return (
            <Fragment>
                <FancyButtonLeft onClick={this.handleValueChange.bind(this, -1)}>-</FancyButtonLeft>
                <StyledInput type="text" innerRef={this.setupDisplayRef} defaultValue={(value + (addToDisplay || 0)).toString()} />
                <FancyButtonRight onClick={this.handleValueChange.bind(this, 1)}>+</FancyButtonRight>
                <HiddenInput type="text" innerRef={this.setupInputRef} defaultValue={value.toString()} />
            </Fragment>
        );
    }

    private handleValueChange(increment: number) {
        if (this.textfield && this.textfield.value && this.displayfield) {
            const oldValue = parseInt(this.textfield.value, 10);
            this.textfield.value = (oldValue + increment).toString();
            this.displayfield.value = ((this.props.addToDisplay || 0) + oldValue + increment).toString();
        }
    }

    private setupInputRef(elem: HTMLInputElement) {
        this.textfield = elem;
        this.props.innerRef(elem);
    }

    private setupDisplayRef(elem: HTMLInputElement) {
        this.displayfield = elem;
    }

}
