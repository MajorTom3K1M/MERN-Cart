import React from 'react'
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
    ListGroup,
    ListGroupItem
} from "reactstrap";

// Icon
import { XCircle } from 'react-feather'

class Products extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">Products</h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12} >
                            <Card className="card-stats">
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <InputGroup>
                                        <Input placeholder="Filter products" />
                                        <InputGroupAddon addonType={"append"}>
                                            <Button color={"outline-success"} className="btn-sm-outline">Filter</Button>
                                            <Button color={"outline-warning"} className="btn-sm-outline"><XCircle size={"20"} strokeWidth={"1"} /></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <p className="text-warning">Products can be filtered by: product title or product description keywords</p>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <span className="float-right"><strong>Published</strong></span>
                                            <strong>Recent products</strong>
                                        </ListGroupItem>
                                    </ListGroup>
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

export default Products;