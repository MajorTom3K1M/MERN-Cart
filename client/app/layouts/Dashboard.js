import React, { Component } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";
import { UserAuthRoute } from "../util/route"

// import routes
import dashboardRoutes from '../routes/dashboard';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { routes } = this.props;
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
                                return <UserAuthRoute exact path={prop.addonPath} component={prop.addonComponent} key={key} />
                            }
                            if (prop.subPath) {
                                return <UserAuthRoute exact path={prop.path} component={prop.component} key={key} />
                            }
                            return (
                                <UserAuthRoute exact path={prop.path} component={prop.component} key={key} />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Dashboard;