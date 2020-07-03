import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { checkSetup } from '../services/admin/actions';
import { history } from '../helpers'


import AdminSetup from '../views/Admin/AdminSetup'
import AdminLogin from '../views/Admin/AdminLogin'
import Dashboard from '../layouts/Dashboard'


const mapStateToProps = ({ customer: { customerPresent }, admin: { needSetup, isAdmin } }) => ({
    customerPresent,
    needSetup,
    isAdmin
})

const CustomerAuth = ({ customerPresent, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            customerPresent ?
                <Redirect to='/' /> :
                <Component {...props} />
        )}
    />
);

const CustomerProtected = ({ customerPresent, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            customerPresent ?
                <Component {...props} /> :
                <Redirect to='/customer/login' />
        )}
    />
);

const UserAuth = ({ isAdmin, path, component: Component }) => (
    <Route
        exact
        path={path}
        render={props => (
            isAdmin ?
                <Component {...props} /> :
                <Redirect to='/admin/login' />
        )}
    />
);

var isUpdate = true;
const HigherOrderSetup = OriginalComponent => {
    const Setup = (props) => {
        const [isSetup, setSetup] = useState(props.needSetup)
        useEffect(() => {
            if (!props.isAdmin && props.needSetup === null && isSetup === null && isUpdate) {
                // console.log("useEffect")
                isUpdate = false;
                props.checkSetup((needSetup) => {
                    if(needSetup !== isSetup) {
                        setSetup(needSetup)
                    }
                });
            }
        });
        return isSetup !== null || props.needSetup !== null || props.isAdmin ? <OriginalComponent isSetup={isSetup} {...props} /> : null;
    }

    return withRouter(
        connect(mapStateToProps, { checkSetup })(Setup)
    );
}

const SetupProtected = ({ isAdmin, isSetup, path, history, component: Component }) => {
    const includesPath = (paths, searchElement) => {
        return paths.includes(searchElement)
    }
    console.log(isSetup)
    if (isSetup && includesPath(["/admin/login", "/admin"], history.location.pathname)) {
        console.log("REDIRECT")
        return (
            <Route
                exact
                path={path}
                component={props => (
                    <Redirect exact from='/admin' to='/admin/setup' />)} />
        )
    } else if (!isSetup && includesPath(["/admin/setup", "/admin"], history.location.pathname)) {
        return (
            <Route
                exact
                path={path}
                component={props => (
                    <Redirect exact from='/admin' to='/admin/login' />)} />
        )
    } else if (isAdmin) {
        return (
            <>
                <Route
                    path={path}
                    component={Component}
                />
                {
                    includesPath(["/admin/login", "/admin"], history.location.pathname) ?
                        <Redirect exact from='/admin' to='/admin/dashboard' /> :
                        null
                }
            </>
        )
    }
    return (
        <Route
            path={path}
            component={Component} />
    )
}

export const CustomerAuthRoute = withRouter(
    connect(mapStateToProps)(CustomerAuth)
);

export const CustomerProtectedRoute = withRouter(
    connect(mapStateToProps)(CustomerProtected)
);

export const UserAuthRoute = withRouter(
    connect(mapStateToProps)(UserAuth)
);

export const SetupProtectedRoute = HigherOrderSetup(
    withRouter(connect(mapStateToProps)(SetupProtected))
);
