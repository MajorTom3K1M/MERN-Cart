import React from 'react';

import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, Redirect } from "react-router-dom";

// import routes
import dashboardRoutes from '../routes/dashboard';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

class Dashboard extends React.Component {
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
                    <p className="test">testes</p>
                </div>
            </div>
        );
    }
}

export default Dashboard;