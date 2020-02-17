import React, { Component } from 'react';

import { NavLink } from "react-router-dom";
import { Nav, NavItem, Collapse } from "reactstrap";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

var ps;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.activeRoute = this.activeRoute.bind(this);
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    componentDidMount() {
        // console.log("path", this.props.location.pathname)
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.sidebar, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    render() {
        return (
            <div className="sidebar-sm border-right" id="sidebar" ref="sidebar">
                <div className="text-center">
                    <a className="logo-n">
                        <span>Web</span>
                        Admin
                    </a>
                </div>
                <Nav className="flex-column">
                    {
                        this.props.routes.map((prop, key) => {
                            var Icon = prop.icon;
                            if (prop.redirect) return null;
                            if (prop.heading) {
                                return (
                                    <h6 key={key} className="sidebar-sm-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                        <span>{prop.heading}</span>
                                    </h6>
                                );
                            }
                            return (
                                <NavItem key={key}>
                                    <NavLink
                                        to={prop.path}
                                        className="nav-link"
                                        >
                                        <Icon size="18px" className="icon" color="#999" />
                                        <span className="align-middle">
                                            {prop.name}
                                        </span>
                                    </NavLink>
                                </NavItem>
                            );
                        })
                    }
                </Nav>
            </div>
        );
    }
}

export default Sidebar;