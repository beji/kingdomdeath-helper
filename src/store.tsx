import { applyMiddleware, compose, createStore } from 'redux'
import initialState from './initialstate'
import rootReducer from './reducers'
import { socketMiddleware } from './socketmiddleware'

interface IExtendedWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

const global = typeof window !== 'undefined' ? (window as IExtendedWindow) : null

const composeEnhancers =
    global !== null && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Kingdom Death' })
        : compose

export default function configureStore() {
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(socketMiddleware)))

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
