import React from "react";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { resetHunt } from "../actions";
import { ResetHuntAction } from "../interfaces/huntActions";
import FancyButton from "./FancyButton";

interface IResetHuntProps {
    resetHunt: () => ResetHuntAction;
}

const mapDispatchToProps = (dispatch: Dispatch<ResetHuntAction>): IResetHuntProps => ({
    resetHunt: () => dispatch(resetHunt()),
});

class ResetHunt extends React.Component<IResetHuntProps> {
    public constructor(props: IResetHuntProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    public render() {
        return (<FancyButton onClick={this.handleClick}>Reset hunt </FancyButton>);
    }

    private handleClick(e: SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (window.confirm("You sure? This will reset all stat modifiers and tokens!")) {
            this.props.resetHunt();
        }

    }
}

export default connect(null, mapDispatchToProps)(ResetHunt);
