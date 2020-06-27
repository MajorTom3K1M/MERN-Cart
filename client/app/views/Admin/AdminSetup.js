import React, { Component } from 'react';
import {
    Button,
    FormGroup,
    Input,
    Label,
    Form,
    Col
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { userSetup } from '../../services/admin/actions';
import HomePage from '../../layouts/HomePage';

const SetupForm = ({ props: { userSetup, history } }) => {
    const { register, watch, handleSubmit, getValues, errors } = useForm();
    const onSubmit = async data => {
        const { usersName, userEmail, userPassword, confirmPassword } = data;
        userSetup(usersName, userEmail, userPassword);
        history.push("/admin/login")
    }
    return (
        <Form onSubmit={e => e.preventDefault()}>
            <h2 className="text-center">Admin Setup</h2>
            <FormGroup>
                <Label>Users name *</Label>
                <Input name="usersName" type={'text'} placeholder="Users name" innerRef={register} />
            </FormGroup>
            <FormGroup>
                <Label>Users email *</Label>
                <Input name="userEmail" type={'email'} placeholder="User email" innerRef={register} />
            </FormGroup>
            <FormGroup>
                <Label>Users password *</Label>
                <Input name="userPassword" type={'password'} placeholder="Password" innerRef={register} />
            </FormGroup>
            <FormGroup>
                <Label>Password confirm *</Label>
                <Input
                    name="confirmPassword"
                    type={'password'}
                    placeholder="Confirm password"
                    innerRef={register({
                        validate: {
                            emailEqual: value => (value === getValues().userPassword) || 'Password confirmation error!',
                        }
                    })}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </FormGroup>
            <Button color={'outline-primary'} type={"submit"} onClick={handleSubmit(onSubmit)} block>Complete Setup</Button>
            {/* <input type="submit" onClick={handleSubmit(onSubmit)} /> */}
        </Form>
    );
}

class AdminSetup extends Component {
    render() {
        return (
            <HomePage
                component={() => (
                    <Col md={{ size: 4, offset: 4 }} className="top-pad-100">
                        <SetupForm props={this.props} />
                    </Col>
                )}
            />
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
    connect(mapStateToProps, { userSetup })(AdminSetup)
);