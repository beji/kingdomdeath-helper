import { IState } from "interfaces";
import { HideLayerAction } from "interfaces/actions";
import React, { SyntheticEvent } from "react";
import { connect, Dispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import styledLegacy from "styled-components";
import styled from "styled-components-ts"; // use styled here for code highlighting to work correct
import { hideLayer } from "../actions";
import Home from "../pages";
import InnovationsPage from "../pages/innovations";
import SurvivorCardPage from "../pages/suvivorcard";
import ViewPage from "../pages/view";
import ExportForm from "./ExportForm";
import BaseStatLayer from "./layers/BaseStatLayer";
import DefenseStatLayer from "./layers/DefenseStatLayer";
import DisordersList from "./layers/DisordersList";
import SimpleLayer from "./layers/SimpleLayer";
import SpecialStatLayer from "./layers/SpecialStatLayer";
import NavBar from "./NavBar";
import SocketConnector from "./SocketConnector";

const AppWrapper = styledLegacy.div`
    margin: 2.5rem 1vw 1vh;
`;

interface IAppStateProps {
    readonly layerActive?: boolean;
}

interface IAppDispatchProps {
   hideLayer: () => HideLayerAction;
}

interface IAppProps extends IAppStateProps, IAppDispatchProps { }

const BlurWrapper = styled<IAppStateProps>(styledLegacy.div)`
    ${({layerActive}: IAppStateProps) => layerActive && "filter: blur(5px) brightness(50%)"}
`;

const mapStateToProps = (state: IState): IAppStateProps => (
    {
        layerActive: typeof state.interface.layer !== "undefined",
    }
);

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction>): IAppDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
});

class App extends React.Component<IAppProps> {

    public constructor(props: IAppProps) {
        super(props);
        this.hideLayer = this.hideLayer.bind(this);
    }

    public render() {
        const layerActive = this.props.layerActive || false;
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AppWrapper>
                        <BlurWrapper layerActive={this.props.layerActive} onClick={this.hideLayer}>
                            <Route exact={true} path="/" component={Home} />
                            <Route path="/card/:cardnumber" component={SurvivorCardPage} />
                            <Route path="/view/:type" component={ViewPage} />
                            <Route path="/innovations" component={InnovationsPage} />
                            <ExportForm />
                            <SocketConnector />
                        </BlurWrapper>
                        <SimpleLayer />
                        <BaseStatLayer />
                        <DefenseStatLayer />
                        <SpecialStatLayer />
                        <DisordersList />
                    </AppWrapper>
                    <NavBar />
                </React.Fragment>
            </BrowserRouter>);
    }

    private hideLayer(e: SyntheticEvent<HTMLElement>) {
        if (this.props.layerActive) {
            e.stopPropagation();
            this.props.hideLayer();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
