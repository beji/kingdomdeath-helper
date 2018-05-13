import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages";
import GearOverviewPage from "../pages/gearoverview";
import SurvivorCardPage from "../pages/suvivorcard";
import ExportForm from "./ExportForm";
import Layer from "./Layer";
import NavBar from "./NavBar";
import SocketConnector from "./SocketConnector";

const AppWrapper = styled.div`
    margin: 2rem 1vw 1vh;
`;

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AppWrapper>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/card/:cardnumber" component={SurvivorCardPage} />
                        <Route path="/gear" component={GearOverviewPage} />
                        <ExportForm />
                        <SocketConnector />
                        <Layer />
                    </AppWrapper>
                    <NavBar />
                </React.Fragment>
            </BrowserRouter>);
    }
}

export default App;
