import React, { Component } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";
import {
    Navbar,
    NavItem,
    NavLink,
    InputGroup,
    FormGroup,
    InputGroupAddon,
    Collapse,
    Container,
    Input,
    Button,
    Nav,
    Col,
    Row
} from "reactstrap";

class Product extends Component {
    render() {
        return (
            <Row className="product-layout">
                <Col sm={12} md={6} className="mr-auto">
                </Col>
                <Col sm={12} md={6} className="ml-auto">
                </Col>
            </Row>
        );
    }
}

export default Product;