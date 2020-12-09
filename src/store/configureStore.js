import { Text, LogBox } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { mainReducer, tempReducer, axiosReducer } from './reducers';

LogBox.ignoreAllLogs();

if (Text.defaultProps == null) {
    Text.defaultProps = {};
}

Text.defaultProps.allowFontScaling = false;

const client = axios.create();

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = {
    key: 'MPC-HC Remote Control',
    storage: AsyncStorage,
    whitelist: ['mainReducer'],
};

const rootReducer = combineReducers({
    mainReducer,
    tempReducer,
    axiosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(axiosMiddleware(client))));
    let persistor = persistStore(store);

    return { store, persistor };
};

export default configureStore;
