import React from 'react'
import {
    Button,
    Input,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

class UserCreate extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        New User
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
                                        <Col xs={12} >
                                            <label>Users name *</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>User email *</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>User password *</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>Password confirm *</label>
                                            <Input />
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

export default UserCreate;