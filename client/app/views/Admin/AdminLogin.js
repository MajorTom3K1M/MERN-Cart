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
import { connect } from 'react-redux';
import { userLogin } from '../../services/admin/actions';
import HomePage from '../../layouts/HomePage';

const LoginForm = ({ props: { userLogin, history } }) => {
    const { register, watch, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const { loginEmail, loginPassword } = data;
        userLogin(loginEmail, loginPassword);
        history.push("/admin/dashboard");
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

class AdminLogin extends Component {
    componentDidMount() {
        // if(this.props.admin.isAdmin) {
        //     this.props.history.push("/admin/dashboard")
        // }
    }
    render() {
        return (
            <HomePage
                component={() => (
                    <Col md={{ size: 4, offset: 4 }} className="top-pad-100">
                        <LoginForm props={this.props} />
                    </Col>
                )}
            />
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        customer: state.customer,
        admin: state.admin
    }
}

export default withRouter(
    connect(mapStateToProps, { userLogin })(AdminLogin)
);