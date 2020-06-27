import ReactDOM, { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { checkLoggedIn } from './util/session';
import { SetupProtectedRoute } from './util/route';
import configureStore from './services/store';

import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

import { history } from './helpers';

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'codemirror/lib/codemirror.css';

// imports css
import './assets/scss/paper-dashboard.scss';
import './assets/css/sidebar.css';
// import './assets/css/codemirror-style.min.css';
// import './assets/demo/demo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/navbar.css';
import './assets/css/styles.css';

// routes
import indexRoutes from './routes/index';
import { Layout } from 'react-feather';


const renderApp = preloadedState => {
    const store = configureStore(preloadedState);
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    {
                        indexRoutes.map((prop, key) => {
                            const { path, component, restrictType } = prop
                            if (restrictType === "setup") {
                                return (
                                    <SetupProtectedRoute path={path} key={key} component={component} />
                                );
                            }
                            return (
                                <Route path={path} key={key} component={component} />
                            );
                        })
                    }
                </Switch>
            </Router>
        </Provider>
        , document.getElementById('app')
    );
}

(async () => renderApp(await checkLoggedIn()))();

