import React from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

class Users extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Users
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
                                        <Col xs={12} className="top-pad-10">
                                            <ListGroup>
                                                <ListGroupItem>
                                                    <div className="text-center"><strong>No Users</strong></div>
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

export default Users;