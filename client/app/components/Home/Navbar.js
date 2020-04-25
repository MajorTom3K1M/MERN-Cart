import React, { Component } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";
import {
    Navbar,
    NavItem,
    NavLink,
    InputGroup,
    FormGroup,
    InputGroupAddon,
    Input,
    Button,
    Nav,
    Col,
} from "reactstrap";

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar className="col-sm-12" color="light" light expand="md">
                <Col sm={8} md={{ offset: 2 }} style={{ display: "flex" }}>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Backpacks</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Boots</NavLink>
                        </NavItem>
                    </Nav>
                    <FormGroup style={{ margin: 0 }} className="ml-auto">
                        <InputGroup>
                            <Input placeholder="Search..." />
                            <InputGroupAddon addonType={"append"}>
                                <Button color={"outline-success"} className="btn-sm-outline">Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Navbar>
        );
    }
}

export default NavbarComponent;