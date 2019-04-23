import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';

export const Teste = () => (
    <h1>Hello</h1>
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={ Main } />
            <Route path='/box/:id' component={ Box } />
        </Switch>    
    </BrowserRouter>
);



export default Routes;