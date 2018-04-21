const express = require('express')
const path = require('path')
const app = express()
const webpack = require('webpack')
const morgan = require("morgan");

app.use(morgan("combined"));

if (process.env.NODE_ENV !== 'production') {

    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
    const clientconfig = require('../webpack/webpack.config.client.dev')
    const serverconfig = require('../webpack/webpack.config.server.dev')
    const compiler = webpack([clientconfig, serverconfig])

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        serverSideRender: false,
        publicPath: '/assets/'
    }));

    app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));

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
    const SERVER_RENDERER_PATH = path.join(__dirname, '../dist/server.js');
    const CLIENT_ASSETS_DIR = path.join(__dirname, '../public');
    const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
    const serverRenderer = require(SERVER_RENDERER_PATH).default;
    const stats = require(CLIENT_STATS_PATH);
    app.use("/assets/", express.static(CLIENT_ASSETS_DIR))
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

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`)
})