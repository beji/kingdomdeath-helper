import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages";
import SurvivorCardPage from "../pages/suvivorcard";
import ViewPage from "../pages/view";
import ExportForm from "./ExportForm";
import BaseStatLayer from "./layers/BaseStatLayer";
import DefenseStatLayer from "./layers/DefenseStatLayer";
import SimpleLayer from "./layers/SimpleLayer";
import SpecialStatLayer from "./layers/SpecialStatLayer";
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
                        <Route path="/view/:type" component={ViewPage} />
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
