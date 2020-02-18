import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    FormGroup,
    Button
} from "reactstrap";

// Icon
import { Menu } from 'react-feather';

// import routes
import dashboardRoutes from '../../routes/dashboard';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            color: "transparent"
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        if (this.state.isOpen) {
            this.setState({
                color: "transparent"
            });
        } else {
            this.setState({
                color: "dark"
            });
        }
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    getBrand() {
        var name;
        dashboardRoutes.map((prop, key) => {
            if (prop.collapse) {
                prop.views.map((prop, key) => {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                    return null;
                });
            } else {
                if (prop.redirect) {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                } else {
                    if (prop.path === this.props.location.pathname) {
                        name = prop.name;
                    }
                }
            }
            return null;
        });
        return name;
    }
    render() {
        return (
            <Navbar
                // color="dark"
                expand="lg"
                className="navbar-default"
            >
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button
                                type="button"
                                ref="sidebarToggle"
                                className="navbar-toggler"
                            // onClick={() => this.openSidebar()}
                            >
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>

                    </div>
                    <Collapse
                        isOpen={this.state.isOpen}
                        navbar
                        className="justify-content-start"
                    >
                        <Button className="button-menu-mobile"><Menu size="22px"/></Button>
                        <form>
                            <FormGroup>
                                <InputGroup>
                                    <Input placeholder="Search..." className="search-bar" />
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;