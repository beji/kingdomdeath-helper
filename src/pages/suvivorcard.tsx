import { ID, ISettlement } from "interfaces";
import React from "react";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router";
import FancyButton from "../components/FancyButton";
import GearGrid from "../components/GearGrid";
import Link from "../components/Link";

interface IPageMatchParams {
    cardnumber: string;
}

interface ISurvivorCardPageProps extends RouteComponentProps<IPageMatchParams> { }

class SurvivorCardPage extends React.Component<ISurvivorCardPageProps> {
    public render() {
        const { match } = this.props;
        return (
            <Fragment>
                <Link to="/"><FancyButton>Home</FancyButton></Link>
                <GearGrid id={match.params.cardnumber as ID} />
            </Fragment>);
    }
}

export default SurvivorCardPage;
