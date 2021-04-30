import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default AppRouter;