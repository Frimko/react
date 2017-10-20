import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import store from "./store"
import Routers from './routers'
import 'react-select/dist/react-select.css';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routers/>
            </Provider>
        )
    }
}

render(<App/>, document.getElementById('app-root'));
