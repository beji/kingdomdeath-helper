import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import App from "./components/App";
import normalize from "./normalize";
import configureStore from "./store";
import { colors, textFont } from "./theme";

// tslint:disable-next-line:no-unused-expression
const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
      box-sizing: border-box;
      ${textFont}
    }
    body {
        background-color: ${colors.page};
    }
`;

hydrate(
    <Provider store={configureStore()}>
        <GlobalStyle />
        <App/>
    </Provider>,
    document.getElementById("content"));

if (module.hot) {
    module.hot.accept();
}
