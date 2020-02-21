import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    Input,
    Row,
    Col,
    Alert
} from "reactstrap";

class OrderCreate extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Create Order
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col xs={6}>
                            <Card className="card-stats">
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Row>
                                        <Col xs={12}>
                                            <Button color={'outline-success'} className="float-right">Create order</Button>
                                        </Col>
                                        <Col sm={12}>
                                            <label>Order Status</label>
                                            <Input type={'select'}>
                                                <option>Completed</option>
                                                <option>Paid</option>
                                                <option selected>Pending</option>
                                                <option>Cancelled</option>
                                                <option>Declined</option>
                                                <option>Shipped</option>
                                            </Input>
                                        </Col>
                                        <Col sm={12}>
                                            <label>Customer email address</label>
                                            <InputGroup>
                                                <Input placeholder={"Customer email"} />
                                                <InputGroupAddon addonType={'append'}>
                                                    <Button color={'outline-success'}>Find</Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <label>First name *</label>
                                            <Input placeholder={'First name'} />
                                        </Col>
                                        <Col xs={6}>
                                            <label>Last name *</label>
                                            <Input placeholder={'Last name'} />
                                        </Col>
                                        <Col xs={12}>
                                            <label>Address 1 *</label>
                                            <Input placeholder={'Address line 1'} />
                                        </Col>
                                        <Col xs={12}>
                                            <label>Address 2</label>
                                            <Input placeholder={'Address line 2'} />
                                        </Col>
                                        <Col xs={12}>
                                            <label>Country *</label>
                                            <Input type={'select'} >
                                                <option>South Africa</option>
                                            </Input>
                                        </Col>
                                        <Col xs={6}>
                                            <label>State *</label>
                                            <Input placeholder={'State'} />
                                        </Col>
                                        <Col xs={6}>
                                            <label>Postcode *</label>
                                            <Input placeholder={'Postcode'} />
                                        </Col>
                                        <Col xs={12}>
                                            <label>Phone number *</label>
                                            <Input placeholder={'Phone number'} />
                                        </Col>
                                        <Col xs={12}>
                                            <label>Order comment *</label>
                                            <Input placeholder={'Order comment'} />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                        <Col sm={6} md={6}>
                            <Card className="card-stats">
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Alert color={'warning'}>
                                        <h5 className="text-center">
                                            The cart is empty.
                                        </h5>
                                        <hr />
                                        <h6 className="text-center"> 
                                            Add some products here then come back to complete the order.
                                        </h6>
                                    </Alert>
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

export default OrderCreate;