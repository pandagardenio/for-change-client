import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { AppRoutes } from './AppRoutes';
import { Home } from '../../pages/Home';
import { PlacesPhysical } from '../../pages/PlacesPhysical';
import { PlacesOnline } from '../../pages/PlacesOnline';
import { Search } from '../../pages/Search';
import { Discover } from '../../pages/Discover';

export const AppRouter: React.FunctionComponent = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path={AppRoutes.HOME} exact component={Home}/>
                <Route path={AppRoutes.PLACES_PHYSICAL} exact component={PlacesPhysical}/>
                <Route path={AppRoutes.PLACES_ONLINE} exact component={PlacesOnline}/>
                <Route path={AppRoutes.SEARCH} exact component={Search}/>
                <Route path={AppRoutes.DISCOVER} exact component={Discover}/>
                <Redirect from={AppRoutes.PLACES} exact to={AppRoutes.PLACES_PHYSICAL}/>
                <Redirect to={AppRoutes.HOME}/>
            </Switch>
        </Router>
    );
};