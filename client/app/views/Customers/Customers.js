import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    InputGroup,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

// Icon
import {
    XCircle
} from "react-feather";

class Customers extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Customers
                </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <InputGroup>
                                        <Input placeholder="Filter products" />
                                        <InputGroupAddon addonType={"append"}>
                                            <Button color={"outline-success"} className="btn-sm-outline">Filter</Button>
                                            <Button color={"outline-warning"} className="btn-sm-outline"><XCircle size={"20"} strokeWidth={"1"} /></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <p className="text-warning">Customers can be filtered by: email, name or phone number</p>
                                    <div className="text-center">
                                        <h4>No orders found</h4>
                                    </div>
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

export default Customers;