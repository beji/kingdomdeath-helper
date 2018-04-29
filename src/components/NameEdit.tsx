import React from "react";
import { createRef, Fragment, RefObject, SyntheticEvent } from "react";
import styled from "styled-components";
import FancyButton from "./FancyButton";

const StyledInput = styled.input`
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0;
    vertical-align: middle;
`;

interface INameEditProps {
    name: string;
    updateFunc: (name: string) => void;
}

interface INameEditState {
    editName: boolean;
}

export default class NameEdit extends React.Component<INameEditProps, INameEditState> {

    private textfield?: HTMLInputElement;

    public constructor(props: INameEditProps) {
        super(props);
        this.state = {
            editName: false,
        };
        this.handleNameBlur = this.handleNameBlur.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
        this.setupTextRef = this.setupTextRef.bind(this);
    }
    public render() {
        const { editName } = this.state;
        const { name } = this.props;
        if (editName) {
            return (
                <Fragment>
                    <StyledInput type="text" innerRef={this.setupTextRef} defaultValue={name} />
                    <FancyButton onClick={this.handleNameBlur}>✓</FancyButton>
                </Fragment>
            );
        } else {
            return (
                <span onClick={this.handleNameClick}>{name}</span>
            );
        }
    }

    private setupTextRef(elem: HTMLInputElement) {
        this.textfield = elem;
    }

    private handleNameClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editName: true,
        });
    }
    private handleNameBlur(e: SyntheticEvent<HTMLButtonElement>) {
        if (this.textfield && this.textfield.value) {
            const newName = this.textfield.value;
            this.props.updateFunc(newName);
            this.setState({
                editName: false,
            });
        }
    }

}
