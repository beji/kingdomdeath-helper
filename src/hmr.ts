/* tslint:disable:no-var-requires */

import express from 'express'
import http from 'http'
import { ISettlement } from 'interfaces'
import morgan from 'morgan'
import path from 'path'
import { AnyAction } from 'redux'
import socketIo from 'socket.io'
import { ICompiler } from 'webpack'
import initialState from './initialstate'
import Actions from './interfaces/reducer'
import { IRoomMessage, IStatusUpdateMessage, SocketMessages } from './interfaces/socketMessages'
import settlementReducer from './reducers/settlement'

const app = express()
const server = new http.Server(app)

const io = socketIo(server)

const statestore: any = {}

io.on(SocketMessages.CONNECT, socket => {
    console.log('a user connected')
    socket.on(SocketMessages.DISCONNECT, () => {
        console.log('user disconnected')
    })
    socket.on(SocketMessages.JOIN, (data: IRoomMessage) => {
        console.log('socket joining room', data.room)
        socket.join(data.room)
        if (!statestore[data.room]) {
            statestore[data.room] = {
                ...initialState.settlement,
                id: data.room,
            } as ISettlement
            console.log(`room ${data.room} initialized`)
        } else {
            socket.emit(SocketMessages.FULL_SYNC, statestore[data.room])
        }
    })
    socket.on(SocketMessages.STATE_UPDATE, (data: IStatusUpdateMessage) => {
        console.log(`atomic update for ${data.room}`)
        const nextState = settlementReducer(statestore[data.room] as ISettlement, data.payload as Actions)
        if (JSON.stringify(nextState) !== JSON.stringify(statestore[data.room])) {
            console.log('nextState !== stored state!')
            statestore[data.room] = nextState
            socket.broadcast.to(data.room).emit(SocketMessages.STATE_UPDATE, data.payload)
        }
    })
})

app.use(morgan('combined'))

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
    const clientconfig = require('../webpack/webpack.config.client.dev')
    const serverconfig = require('../webpack/webpack.config.server.dev')
    const compiler = webpack([clientconfig, serverconfig])

    interface ICompilerWithName extends ICompiler {
        name: string
    }

    app.use(
        webpackDevMiddleware(compiler, {
            hot: true,
            publicPath: '/assets/',
            serverSideRender: false,
        }),
    )

    app.use(webpackHotMiddleware(compiler.compilers.find((c: ICompiler) => (c as ICompilerWithName).name === 'client')))

    app.use(webpackHotServerMiddleware(compiler))

    app.use((req, res, next) => {
        if (req.url === '/favicon.ico') {
            res.writeHead(200, { 'Content-Type': 'image/x-icon' })
            res.end('')
        } else {
            next()
        }
    })
} else {
    const serverRenderer = require('../dist/server').default
    const stats = require('../public/stats.json')
    app.use('/assets/', express.static(path.join(__dirname, '../public')))
    app.use(serverRenderer(stats))
    app.use((req, res, next) => {
        if (req.url === '/favicon.ico') {
            res.writeHead(200, { 'Content-Type': 'image/x-icon' })
            res.end('')
        } else {
            next()
        }
    })
}

server.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`)
})
