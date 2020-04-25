import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history'

import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

import 'codemirror/lib/codemirror.css'

// imports css
// import './assets/scss/paper-dashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/sidebar.css';
import './assets/css/navbar.css';
import './assets/css/styles.css';
// import './assets/css/codemirror-style.min.css';
// import './assets/demo/demo.css';

// routes
import indexRoutes from './routes/index';

const hist = createBrowserHistory();
render((
    <Router history={hist}>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component} />;
            })}
        </Switch>
    </Router>
), document.getElementById('app'));