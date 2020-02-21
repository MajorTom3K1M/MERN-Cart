import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    InputGroup,
    FormGroup,
    Form,
    InputGroupAddon,
    InputGroupText,
    Input,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

//Icon
import {
    XCircle
} from "react-feather";

class Orders extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Orders
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Card className="card-stats">
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <InputGroup>
                                        <Input placeholder="Filter products" />
                                        <InputGroupAddon addonType={"append"}>
                                            <Button color={"outline-success"} className="btn-sm-outline">Filter</Button>
                                            <Button color={"outline-primary"} className="btn-sm-outline">By Status</Button>
                                            <Button color={"outline-warning"} className="btn-sm-outline"><XCircle size={"20"} strokeWidth={"1"} /></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <Row>
                                        <Col sm={8}>
                                            <p className="text-warning">Orders can be filtered by: surname, email address or postcode/zipcode</p>
                                        </Col>
                                        <Col sm={4}>
                                            <Form inline className="float-sm-right">
                                                <label className="right-pad-10">Status</label>
                                                <Input width={"126px"} type={'select'}>
                                                    <option>Completed</option>
                                                    <option>Paid</option>
                                                    <option>Created</option>
                                                    <option>Cancelled</option>
                                                    <option>Declined</option>
                                                    <option>Shiped</option>
                                                    <option>Pending</option>
                                                </Input>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <Row className="top-pad-10">
                                        <Col>
                                            <ListGroup>
                                                <ListGroupItem>
                                                    <span><strong>Recent orders</strong></span>
                                                </ListGroupItem>
                                                <ListGroupItem className="text-center">
                                                    <h5 className="text-center"><strong>No orders found</strong></h5>
                                                </ListGroupItem>
                                            </ListGroup>
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

export default Orders;