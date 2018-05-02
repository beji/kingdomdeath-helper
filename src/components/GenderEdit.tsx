import React from "react";
import { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import { updateSurvivor } from "../actions/survivorActions";
import { Gender, ID, ISettlement, ISurvivor } from "../interfaces";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { capitalize, clone } from "../util";

interface IGenderEditState {
    editGender: boolean;
}

interface IGenderEditDispatchProps {
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
}

interface IGenderEditStateProps {
    survivor?: ISurvivor;
}

interface IGenderEditOwnProps {
    id: ID;
}

interface IGenderEditProps extends IGenderEditOwnProps, IGenderEditStateProps, IGenderEditDispatchProps { }

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorAction>): IGenderEditDispatchProps => ({
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: IGenderEditOwnProps): IGenderEditStateProps => {
    const survivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        survivor: clone(survivor),
    };
};

class GenderEdit extends React.Component<IGenderEditProps, IGenderEditState> {

    public constructor(props: any) {
        super(props);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleGenderClick = this.handleGenderClick.bind(this);
        this.state = {
            editGender: false,
        };
    }

    public render() {
        const { editGender } = this.state;
        const gender = this.props.survivor ? this.props.survivor.gender : Gender.male;
        if (!editGender) {
            return (<span onClick={this.handleGenderClick}>{capitalize(Gender[gender])}</span>);
        } else {
            return (
                <select onChange={this.handleGenderChange} defaultValue={gender.toString()}>
                    <option value={Gender.male}>{capitalize(Gender[Gender.male])}</option>
                    <option value={Gender.female}>{capitalize(Gender[Gender.female])}</option>
                </select>
            );
        }
    }

    private handleGenderClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editGender: true,
        });
    }

    private handleGenderChange(e: SyntheticEvent<HTMLSelectElement>) {
        if (this.props.survivor) {
            const newGender = parseInt(e.currentTarget.value, 10) as Gender;

            this.props.updateSurvivor({
                ...this.props.survivor,
                gender: newGender,
            });

            this.setState({
                editGender: false,
            });
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenderEdit);
