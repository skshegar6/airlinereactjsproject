import { createStore,compose,applyMiddleware} from "redux";
import rootReducer from "../reducers/index.js";
import thunk from 'redux-thunk';

export function configureStore(initialState) {
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 let store = null;
 store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
 window.store = store;
 return store;
}