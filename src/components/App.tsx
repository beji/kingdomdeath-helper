import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages";
import GearOverviewPage from "../pages/gearoverview";
import SurvivorCardPage from "../pages/suvivorcard";
import BaseStatLayer from "./BaseStatLayer";
import DefenseStatLayer from "./DefenseStatLayer";
import ExportForm from "./ExportForm";
import NavBar from "./NavBar";
import SimpleLayer from "./SimpleLayer";
import SocketConnector from "./SocketConnector";
import SpecialStatLayer from "./SpecialStatLayer";

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
                        <SimpleLayer />
                        <BaseStatLayer />
                        <DefenseStatLayer />
                        <SpecialStatLayer />
                    </AppWrapper>
                    <NavBar />
                </React.Fragment>
            </BrowserRouter>);
    }
}

export default App;
