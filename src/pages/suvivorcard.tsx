import { ID } from "interfaces";
import React, { Fragment } from "react";
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
            <Fragment>
                <GearGrid id={match.params.cardnumber as ID} />
            </Fragment>);
    }
}

export default SurvivorCardPage;
