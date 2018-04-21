import fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { ServerStyleSheet } from "styled-components";
import url from "url";
import App from "./components/App";
import normalize from "./normalize";

const htmlhead = `<!doctype html>
<html>
<head>
</head>
<body>
<div id="content">`;

const hmtlfoot = (bundlepath = "bundle.js") => `</div><script src="/assets/${bundlepath}"></script></body></html>`;

export default function serverRenderer(stats: any) {
    return (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(htmlhead);

        if (stats && stats.assetsByChunkName && stats.assetsByChunkName.main) {
            const bundle = stats.assetsByChunkName.main;
            return res.end(hmtlfoot(bundle));
        } else {
            return res.end(hmtlfoot());
        }
    };
}
