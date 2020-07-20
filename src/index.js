import React from 'react';
import {render} from 'react-dom';
import { Provider } from "react-redux";
import {configureStore} from "./js/redux/store/index.js";
import App from './components/App.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,document.getElementById('root')
);