import React from "react";
import {
    ArrowUpCircle,
    ArrowDownCircle
} from 'react-feather'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">Dashboard</h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <Card className="card-stats text-center">
                                <CardBody>
                                    <h4>Orders placed</h4>
                                    <p className="text-muted">Total number of orders placed</p>
                                    <div><span className="number">0</span></div>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                        <Col lg={6} md={6} sm={12}> 
                            <Card className="card-stats text-center">
                                <CardBody>
                                    <h4>Order total value</h4>
                                    <p className="text-muted">Total value of orders placed</p>
                                    <div><span className="number">0</span></div>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <Card className="card-stats text-center">
                                <CardBody>
                                    <h4>Products for sale</h4>
                                    <p className="text-muted">Number of products for sale</p>
                                    <div><span className="number">0</span></div>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <Card className="card-stats text-center">
                                <CardBody>
                                    <h4>Total products sold</h4>
                                    <p className="text-muted">Number of products sold</p>
                                    <div><span className="number">0</span></div>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={12} md={12} >
                            <Card className="card-stats text-center">
                                <CardHeader></CardHeader>
                                <CardBody>
                                    <h4>Top products sold</h4>
                                    <div><span className="warning">Nothing to see yet. Do some orders.</span></div>
                                </CardBody>
                                <CardFooter>
                                    <br /><br />
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default Dashboard;