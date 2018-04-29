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

    private textfield: RefObject<any>;

    public constructor(props: INameEditProps) {
        super(props);
        this.state = {
            editName: false,
        };
        this.handleNameBlur = this.handleNameBlur.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
        this.textfield = createRef();
    }
    public render() {
        const { editName } = this.state;
        const { name } = this.props;
        if (editName) {
            return (
                <Fragment>
                    <StyledInput type="text" ref={this.textfield} defaultValue={name} />
                    <FancyButton onClick={this.handleNameBlur}>✓</FancyButton>
                </Fragment>
            );
        } else {
            return (
                <span onClick={this.handleNameClick}>{name}</span>
            );
        }
    }

    private handleNameClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editName: true,
        });
    }
    private handleNameBlur(e: SyntheticEvent<HTMLButtonElement>) {
        const newName = this.textfield.current.value;
        this.props.updateFunc(newName);
        this.setState({
            editName: false,
        });
    }

}
