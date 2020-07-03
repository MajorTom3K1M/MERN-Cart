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
import { Link } from 'react-router-dom';
import { getPaginationData } from '../../services/products/actions';
import { connect } from 'react-redux';
// Icon
import { XCircle, Trash2 } from 'react-feather';

class Products extends React.Component {
    state = {
        product: null,
        pageNum: null,
        totalItemCount: null
    }

    componentDidMount() {
        const { getPaginationData, match: { params: { page } } } = this.props;
        getPaginationData(page, ({ results, pageNum, totalItemCount }) => {
            // console.log(data)
            this.setState({ product: results, pageNum, totalItemCount });
        })
    }

    render() {
        const { product, pageNum, totalItemCount } = this.state;
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
                                        {
                                            product?.map(({ _id, productTitle }, key) => (
                                                <ListGroupItem key={key}>
                                                    <button className="float-right btn text-danger btn-delete-product" style={{ paddingTop: 2, paddingBottom: 0 }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <h4 className="float-right">
                                                        <input className="publishedState" type="checkbox" checked="" />
                                                    </h4>
                                                    <div className="top-pad-8">
                                                        <Link to={`/admin/products/edit/${_id}`}>{productTitle}</Link>
                                                    </div>
                                                </ListGroupItem>
                                            ))
                                        }
                                        <ListGroupItem>
                                            <button className="float-right btn text-danger btn-delete-product" style={{ paddingTop: 2, paddingBottom: 0 }}>
                                                <Trash2 size={16} />
                                            </button>
                                            <h4 className="float-right">
                                                <input className="publishedState" type="checkbox" checked="" />
                                            </h4>
                                            <div className="top-pad-8">
                                                <Link to="/admin/products/edit/5efc874506def42dd4aa46c0">Scout Backpack</Link>
                                            </div>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <button className="float-right btn text-danger btn-delete-product" style={{ paddingTop: 2, paddingBottom: 0 }}>
                                                <Trash2 size={16} />
                                            </button>
                                            <h4 className="float-right">
                                                <input className="publishedState" type="checkbox" checked="" />
                                            </h4>
                                            <div className="top-pad-8">
                                                <Link to="/admin/products/edit/5efc874506def42dd4aa46c0">Scout Backpack</Link>
                                            </div>
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

const mapStateToProps = state => {
    console.log(state)
    return {
        customer: state.customer
    }
}

export default connect(
    mapStateToProps, { getPaginationData }
)(Products);