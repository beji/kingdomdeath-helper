import { UUID } from "interfaces";
import React from "react";
import { RouteComponentProps } from "react-router";
import GearGrid from "../components/GearGrid";

interface IPageMatchParams {
    cardnumber: string;
}

interface ISurvivorCardPageProps extends RouteComponentProps<IPageMatchParams> { }

class SurvivorCardPage extends React.Component<ISurvivorCardPageProps> {
    public render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <GearGrid id={match.params.cardnumber as UUID} />
            </React.Fragment>);
    }
}

export default SurvivorCardPage;
