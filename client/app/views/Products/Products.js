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
import { productService } from '../../util/services/product.service';
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
        const { match: { params: { page } } } = this.props;
        productService.getPaginationData(page)
            .then(({ results, pageNum, totalItemCount }) => {
                this.setState({ product: results, pageNum, totalItemCount });
            });
    }

    onChecked(productId, state) {
        productService.updatePublishedState(productId, state)
    }

    onDelete(productId, index) {
        const { product, totalItemCount } = this.state;
        product.splice(index, 1)
        this.setState({ product, totalItemCount: totalItemCount - 1  });
        productService.deleteProduct(productId);
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
                                            product?.map(({ _id, productTitle, productPublished }, key) => (
                                                <ListGroupItem key={key}>
                                                    <button 
                                                        className="float-right btn text-danger btn-delete-product" 
                                                        style={{ paddingTop: 2, paddingBottom: 0 }}
                                                        onClick={() => this.onDelete(_id, key)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <h4 className="float-right">
                                                        <input 
                                                            className="publishedState" 
                                                            type="checkbox" 
                                                            defaultChecked={productPublished} 
                                                            onChange={({ target: { checked } }) => this.onChecked(_id,checked)} 
                                                        />
                                                    </h4>
                                                    <div className="top-pad-8">
                                                        <Link to={`/admin/products/edit/${_id}`}>{productTitle}</Link>
                                                    </div>
                                                </ListGroupItem>
                                            ))
                                        }
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