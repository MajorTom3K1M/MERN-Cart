import React, { Component } from 'react'
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
    Form,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

class CustomerLogin extends Component {
    render() {
        return (
            <Form>
                <h2>Please sign in</h2>
                <FormGroup>
                    <Input type={'text'} placeholder="email address"/>
                </FormGroup>
                <FormGroup>
                    <Input type={'text'} placeholder="Password"/>
                </FormGroup>
                <Button color={'outline-primary'} block>Sign in</Button>
            </Form>
        );
    }
}

export default CustomerLogin;