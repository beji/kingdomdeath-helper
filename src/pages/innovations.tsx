import { IState } from "interfaces";
import { Innovations } from "interfaces/innovations";
import React from "react";
import { connect } from "react-redux";
import innovations from "../../data/final/innovations";

interface IInnovationsPageStateProps {
    innovated: ReadonlyArray<Innovations>;
    available: ReadonlyArray<Innovations>;
}

const mapStateToProps = (state: IState): IInnovationsPageStateProps => ({
    available: innovations.filter((innovation) => !state.settlement.innovations.includes(innovation.id)).filter((innovation) => innovation.consequence_of && state.settlement.innovations.includes(innovation.consequence_of)).map((innovation) => innovation.id),
    innovated: state.settlement.innovations,
});

class InnovationsPage extends React.Component<IInnovationsPageStateProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Taken</h1>
                <ul>
                    {this.props.innovated.map((innovation, idx) => <li key={idx}>{innovation}, {innovations[innovation].name}</li>)}
                </ul>
                <h1>Available</h1>
                <ul>
                    {this.props.available.map((innovation, idx) => <li key={idx}>{innovation}, {innovations[innovation].name}</li>)}
                </ul>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(InnovationsPage);
