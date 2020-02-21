import React, { Component } from 'react';

import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, Redirect } from "react-router-dom";

// import routes
import dashboardRoutes from '../routes/dashboard';

import Header from '../components/Header/Header';
import Dashboard1 from '../views/Dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.getRoute = this.getRoute.bind(this);
    }

    getRoute() {
        return dashboardRoutes.map((prop, key) => {
            if (prop.redirect) {
                return (
                    <Redirect exact from={prop.path} to={prop.pathTo} key={key} />
                );
            }
            return (
                <Route path={prop.path} component={prop.component} key={key} />
            );
        })
    }
    render() {
        return (
            <div className="wrapper">
                {/* sidebar */}
                <Sidebar
                    {...this.props}
                    routes={dashboardRoutes}
                />
                <div className="main-panel" ref="mainPanel">
                    <Header {...this.props} />
                    <Switch>
                        {dashboardRoutes.map((prop, key) => {
                            if (prop.heading) {
                                return null
                            }
                            if (prop.redirect) {
                                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                            }
                            if (prop.isAddon) {
                                return <Route exact path={prop.addonPath} component={prop.addonComponent} key={key} />
                            }
                            return (
                                <Route exact path={prop.path} component={prop.component} key={key} />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Dashboard;