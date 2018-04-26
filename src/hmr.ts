/* tslint:disable:no-var-requires */

import express from "express";
import http from "http";
import morgan from "morgan";
import path from "path";
import socketIo from "socket.io";
import webpack, { ICompiler } from "webpack";
import { IRoomMessage, IStatusUpdateMessage } from "./interfaces/socketMessages";

const app = express();
const server = new http.Server(app);

const io = socketIo(server);

const statestore: any = {};

interface ICompilerWithName extends ICompiler {
    name: string;
}

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("room", (data: IRoomMessage) => {
        console.log("socket joining room", data.room);
        socket.join(data.room);
        socket.emit("state_update_received", statestore[data.room]);
    });
    socket.on("state_update", (data: IStatusUpdateMessage) => {
        console.log("state update for room", data.room);
        statestore[data.room] = data.payload;
        socket.broadcast.to(data.room).emit("state_update_received", data.payload);
    });
});

app.use(morgan("combined"));

if (process.env.NODE_ENV !== "production") {

    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
    const clientconfig = require("../webpack/webpack.config.client.dev");
    const serverconfig = require("../webpack/webpack.config.server.dev");
    const compiler = webpack([clientconfig, serverconfig]);

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: "/assets/",
        serverSideRender: false,
    }));

    app.use(webpackHotMiddleware(compiler.compilers.find((c) => (c as ICompilerWithName).name === "client")));

    app.use(webpackHotServerMiddleware(compiler));

    app.use((req, res, next) => {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            res.end("");
        } else {
            next();
        }
    });
} else {
    const SERVER_RENDERER_PATH = path.join(__dirname, "../dist/server.js");
    const CLIENT_ASSETS_DIR = path.join(__dirname, "../public");
    const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, "stats.json");
    const serverRenderer = require(SERVER_RENDERER_PATH).default;
    const stats = require(CLIENT_STATS_PATH);
    app.use("/assets/", express.static(CLIENT_ASSETS_DIR));
    app.use(serverRenderer(stats));
    app.use((req, res, next) => {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            res.end("");
        } else {
            next();
        }
    });
}

server.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);
});
