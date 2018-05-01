import React from "react";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSurvivor } from "../actions/survivorActions";
import { CreateSurvivorAction } from "../interfaces/survivorActions";
import FancyButton from "./FancyButton";

interface ICreateSurvivorDispatchProps {
    createSurvivor: () => CreateSurvivorAction;
}

const mapDispatchToProps = (dispatch: Dispatch<CreateSurvivorAction>): ICreateSurvivorDispatchProps => ({
    createSurvivor: () => dispatch(createSurvivor()),
});

class CreateSurvivor extends React.Component<ICreateSurvivorDispatchProps> {
    public constructor(props: any) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    public render() {
        return (
            <FancyButton onClick={this.handleClick}>Create Survivor</FancyButton>
        );
    }

    private handleClick(e: SyntheticEvent<HTMLButtonElement>) {
        this.props.createSurvivor();
    }
}

export default connect(null, mapDispatchToProps)(CreateSurvivor);
