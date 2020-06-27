import React from 'react';
import {
    Link
} from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    CardBody,
    FormGroup,
    Input,
    Form,
    Card,
    Col,
    Row
} from 'reactstrap';

import { connect } from 'react-redux'

class CustomerAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log("customer : ",this.props)
    }

    render() {
        const { 
            customerEmail, customerFirstname, customerLastname, 
            customerPhone, customerPostcode, 
            customerAddress1, customerAddress2,
            customerCountry, customerState
        } = this.props.customer
        return (
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="#">
                            Home
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="#">
                            Orders
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    <Col xs={12} md={5} className="bottom-pad-15">
                        <Card className="top-marg-15">
                            <CardBody>
                                <h5 className="card-heading">Customer details</h5>
                                <Form id="customer-form" role="form" data-toggle="validator" noValidate={true}>
                                    <Row>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"email"} className="form-control customerDetails" minLength="5" placeholder="Email address" defaultValue={customerEmail}/>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Company name" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <FormGroup>
                                                <Input type="email" className="form-control customerDetails" minLength="5" placeholder="First name" defaultValue={customerFirstname} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <FormGroup>
                                                <Input type="email" className="form-control customerDetails" minLength="5" placeholder="Last name" value={customerLastname} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Address 1" defaultValue={customerAddress1} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Address 2 (optional)" defaultValue={customerAddress2} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"select"} className="form-control customerDetails" minLength="5" defaultValue={customerCountry}>
                                                    <option value="" disabled="" selected={customerCountry}>Select Country</option>
                                                    <option value="Andorra">Andorra</option>
                                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                                    <option value="Afghanistan">Afghanistan</option>
                                                    <option value="Afghanistan">Thailand</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="State" defaultValue={customerState} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Postcode" defaultValue={customerPostcode} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Phone number" defaultValue={customerPhone} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={12}>
                                            <FormGroup>
                                                <Input type={"text"} className="form-control customerDetails" minLength="5" placeholder="Order comment" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <Button color={"black"}>Save details</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Col xs={12} className="bottom-pad-15 no-pad-right">
                            <Card className="top-marg-15">
                                <CardBody>
                                    <h5 className="card-heading">Orders</h5>
                                    <div id="accordion">
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingOne">
                                                <p className="mb-0">
                                                    OrderId: 5ea4d936ff3404064b843824 -
                                                    Date: 26/04/2020 10:13AM
                                        <button className="btn btn-sm btn-outline-success float-right" data-toggle="collapse" data-target="#collapse5ea4d936ff3404064b843824" aria-expanded="true" aria-controls="collapse5ea4d936ff3404064b843824">
                                                        View
                                        </button>
                                                </p>
                                            </div>
                                            <div id="collapse5ea4d936ff3404064b843824" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item list-group-input-pad">
                                                            <strong> Order status: </strong><span className="text-success float-right">Paid</span>
                                                        </li>
                                                        <li className="list-group-item"><strong> Order date: </strong><span className="float-right">29/04/2020 05:57AM</span></li>
                                                        <li className="list-group-item"><strong> Order ID: </strong><span className="float-right">5ea4d936ff3404064b843824</span></li>
                                                        <li className="list-group-item"><strong> Order net amount: </strong><span className="float-right">$188.00</span></li>
                                                        <li className="list-group-item"><strong> Order shipping amount: </strong><span className="float-right">$0.00</span></li>
                                                        <li className="list-group-item"><strong> Order total amount: </strong><span className="float-right">$188.00</span></li>
                                                        <li className="list-group-item"><strong> Email address: </strong><span className="float-right">test@test.com</span></li>
                                                        <li className="list-group-item"><strong> Company: </strong><span className="float-right">test</span></li>
                                                        <li className="list-group-item"><strong> First name: </strong><span className="float-right">esdjfb</span></li>
                                                        <li className="list-group-item"><strong> Last name: </strong><span className="float-right">kndfg</span></li>
                                                        <li className="list-group-item"><strong> Address 1: </strong><span className="float-right">kfdn</span></li>
                                                        <li className="list-group-item"><strong> Address 2: </strong><span className="float-right">kjjnf</span></li>
                                                        <li className="list-group-item"><strong> Country: </strong><span className="float-right">Aruba</span></li>
                                                        <li className="list-group-item"><strong> State: </strong><span className="float-right">wsad </span></li>
                                                        <li className="list-group-item"><strong> Postcode: </strong><span className="float-right">123423</span></li>
                                                        <li className="list-group-item"><strong> Phone number: </strong><span className="float-right">322321321</span></li>
                                                        <li className="list-group-item">&nbsp;</li>
                                                        <li className="list-group-item"><strong className="text-info">Products ordered</strong></li>
                                                        <li className="list-group-item">
                                                            1 x Duckworth Woolfill Jacket
                                                            &nbsp; &gt; &nbsp;
                                                        <span className="text-warning"> Options: </span>
                                                        (
                                                                <strong>Size:</strong> S /
                                                                <strong>Colour</strong>: Harvest
                                                        )
                                                    <div className="float-right">£188.00</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Col>
                </Row>
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

export default connect(
    mapStateToProps, null
)(CustomerAccount);