import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Customers from 'containers/Customers';
import Products from 'containers/Products';
import Main from 'components/Main';

const Routers = (props) => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    <Route exact path="/" component={Customers}/>
                    <Route exact path="/customers/" component={Customers}/>
                    <Route exact path="/products" component={Products}/>
                </Switch>
            </Main>
        </BrowserRouter>
    )
};

export default Routers;