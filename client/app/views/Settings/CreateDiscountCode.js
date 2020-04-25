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

class CreateDiscountCode extends Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        New discount
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Col md={12} lg={12} >
                                        <Button color={'outline-success'} className="float-right">Add discount</Button>
                                        <br />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Discount code *</label>
                                        <Input placeholder={"CODE20"} />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Discount type *</label>
                                        <Input type={'select'} name="select">
                                            <option>Amount</option>
                                            <option>Percent</option>
                                        </Input>
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Discount value *</label>
                                        <Input placeholder={"20"} />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Discount start *</label>
                                        <Input />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Discount end *</label>
                                        <Input />
                                    </Col>
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

export default CreateDiscountCode;