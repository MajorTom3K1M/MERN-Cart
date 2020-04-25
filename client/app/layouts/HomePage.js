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
import { User, ShoppingCart } from "react-feather"

import mainRoute from "../routes/main";
import NavbarComponent from "../components/Home/Navbar";

let hiddenNavBarPaths = mainRoute.filter((prop) => prop.navBar === false).map((prop) => prop.path)
class HomePage extends Component {
    state = {
        navBar: true,
    }
    componentDidMount(_, prevState) {
        const { pathname } = this.props.history.location;
        console.log(hiddenNavBarPaths)

        if (hiddenNavBarPaths.includes(pathname)) {
            this.setState({ navBar: false });
        } else {
            this.setState({ navBar: true });
        }
    }

    render() {
        const { navBar } = this.state;
        return (
            <div className="wrapper">
                <Navbar className="justify-content-between" expand="lg">
                    <a className="navbar-brand" href="/">
                        CLOTH
                    </a>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <NavItem className="ml-3">
                                <a href="/customer/login" className="btn">
                                    <User size={16} />
                                </a>
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
                            {/* <Navbar className="col-sm-12" color="light" light expand="md">
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
                        </Navbar> */}
                            {
                                navBar ? <NavbarComponent /> : null
                            }

                            <Col sm={navBar ? 12 : ''} md={navBar ? { size: 8, offset: 2 } : { size: 4, offset: 4 }} className={navBar ? "product-layout" : "top-pad-100"}>
                                {
                                    mainRoute.map((prop, key) => {
                                        return (
                                            <Route exact path={prop.path} component={prop.component} key={key} />
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                    </Container>
            </div>
        );
    }
}

export default HomePage;