import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages";
import SurvivorCardPage from "../pages/suvivorcard";
import ExportForm from "./ExportForm";
import SocketConnector from "./SocketConnector";

const AppWrapper = styled.div`
    margin: 1vh 1vw;
`;

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <AppWrapper>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/card/:cardnumber" component={SurvivorCardPage} />
                    <ExportForm />
                    <SocketConnector />
                </AppWrapper>
            </BrowserRouter>);
    }
}

export default App;
