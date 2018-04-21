import React from "react";
import { hydrate, render } from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import App from "./components/App";
import normalize from "./normalize";
import configureStore from "./store";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    ${normalize}
    * {
      box-sizing: border-box;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
`;

hydrate(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById("content"));

if (module.hot) {
    module.hot.accept();
}
