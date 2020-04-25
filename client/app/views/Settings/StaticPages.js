import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    Button
} from 'reactstrap';

class StaticPages extends Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Static pages
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col xs={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Row>
                                        <Col xs={12}>
                                            <Button color={'outline-success'} className="float-right">New user</Button>
                                        </Col>
                                    </Row>
                                    <p className="form-description">
                                        Here you can setup and manage static pages for your shopping cart.
                                        You may want to setup a page with a little bit about your business
                                        called "About" or "Contact Us" etc.
                                        </p>
                                    <p className="text-warning text-center">
                                        <b>
                                            There are currently no static pages setup. Please setup a static page.
                                        </b>
                                    </p>
                                    <Row>
                                        <Col className="mx-auto text-center">
                                            <Button color={'outline-success'} style={{ marginLeft: 3, marginRight: 3 }}>
                                                Create new
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default StaticPages;