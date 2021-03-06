import React, { Component } from 'react';
import {
    Button,
    FormGroup,
    Input,
    Form,
    Col
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux'
import { loginAction } from '../../services/customers/actions'

const LoginForm = ({ props: { loginAction, history } }) => {
    const { register, watch, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const { loginEmail, loginPassword } = data;
        loginAction(loginEmail, loginPassword, () => {
            history.push("/customer/account");
        });
    }

    return (
        <Form onSubmit={e => e.preventDefault()}>
            <h2>Please sign in</h2>
            <FormGroup>
                <Input name="loginEmail" type={'text'} placeholder="email address" innerRef={register} />
            </FormGroup>
            <FormGroup>
                <Input name="loginPassword" type={'password'} placeholder="Password" innerRef={register} />
            </FormGroup>
            <Button color={'outline-primary'} onClick={handleSubmit(onSubmit)} block>Sign in</Button>
        </Form>
    );
}

class CustomerLogin extends Component {
    render() {
        return (
            <Col md={{ size: 4, offset: 4 }} className="top-pad-100">
                <LoginForm props={this.props} />
            </Col>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        customer: state.customer
    }
}

export default withRouter(
    connect(mapStateToProps, { loginAction } )(CustomerLogin)
);