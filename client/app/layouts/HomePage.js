import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import {
    Navbar,
    NavItem,
    Container,
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { User, ShoppingCart } from "react-feather";
import { CustomerAuthRoute, CustomerProtectedRoute, SetupProtectedRoute } from "../util/route";
import { connect } from "react-redux";

import mainRoute from "../routes/main";
import NavbarComponent from "../components/Home/Navbar";

import { logoutAction } from '../services/customers/actions'

// let hiddenNavBarPaths = mainRoute.filter((prop) => prop.navBar === false).map((prop) => prop.path)
class HomePage extends Component {
    state = {
        navBar: true,
        dropdownOpen: false
    }

    componentDidMount() {
        console.log("HOMEPAGE!!!!!!!!!")
    }

    toggle = () => this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

    render() {
        const { navBar, dropdownOpen } = this.state;
        const { logoutAction, component: Component } = this.props;
        const { customerPresent } = this.props.customer;
        return (
            <div className="wrapper">
                <Navbar className="justify-content-between" expand="lg">
                    <Link className="navbar-brand" to="/">
                        CLOTH
                    </Link>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <NavItem className="ml-3">
                                {
                                    customerPresent ?
                                        (
                                            <Dropdown className="btn" direction="down" isOpen={dropdownOpen} toggle={this.toggle}>
                                                <DropdownToggle tag="text" caret>
                                                    <User size={16} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>
                                                        <Link to="/customer/account">
                                                            Account
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={logoutAction}>
                                                        Logout
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        ) : (
                                            <Link to="/customer/login" className="btn">
                                                <User size={16} />
                                            </Link>
                                        )
                                }
                            </NavItem>
                            <NavItem>
                                <a href="/customer/login" className="btn">
                                    <ShoppingCart size={16} /> Cart
                                </a>
                            </NavItem>
                        </ul>
                    </div>
                </Navbar>
                <Container fluid>
                    <Row>
                        {
                            Component ?
                                // <Route exact path={routes.path} component={() => (
                                    <Component />
                                // )} />
                                :
                                mainRoute.map((prop, key) => {
                                    if (prop.auth) {
                                        return (
                                            <CustomerAuthRoute path={prop.path} component={() => (
                                                <>
                                                    {prop.navBar === false ? null : <NavbarComponent />}
                                                    <prop.component />
                                                </>
                                            )} key={key} />
                                        );
                                    }
                                    if (prop.protected) {
                                        return (
                                            <CustomerProtectedRoute path={prop.path} component={() => (
                                                <>
                                                    {prop.navBar === false ? null : <NavbarComponent />}
                                                    <prop.component />
                                                </>
                                            )} key={key} />
                                        );
                                    }
                                    if (prop.checkSetup) {
                                        return (
                                            <SetupProtectedRoute path={prop.path} component={() => (
                                                <>
                                                    {prop.navBar === false ? null : <NavbarComponent />}
                                                    <prop.component />
                                                </>
                                            )} key={key} />
                                        );
                                    }
                                    if (prop.noComponent) {
                                        return;
                                    }
                                    return (
                                        <Route exact path={prop.path} component={() => (
                                            <>
                                                {prop.navBar === false ? null : <NavbarComponent />}
                                                <prop.component />
                                            </>
                                        )} key={key} />
                                    );
                                })

                        }

                    </Row>
                </Container>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customer
    }
}

export default connect(
    mapStateToProps, { logoutAction }
)(HomePage);