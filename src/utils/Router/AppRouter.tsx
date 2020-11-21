import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { AppRoutes } from './AppRoutes';
import { Home } from '../../pages/Home';

export const AppRouter: React.FunctionComponent = (): JSX.Element => {
    return (
        <Router>
            <Route path={AppRoutes.HOME} exact component={Home}/>
            <Redirect to={AppRoutes.HOME}/>
        </Router>
    );
};