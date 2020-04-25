import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Input,
    Row,
    Col,
} from "reactstrap";

class DiscountCodes extends Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Discount codes
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
                                            <Button color={'outline-success'} className="float-right">New Discount</Button>
                                        </Col>
                                    </Row>
                                    <p className="text-warning text-center">
                                        <b>
                                            There are currently no discount codes setup.
                                        </b>
                                    </p>
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

export default DiscountCodes;