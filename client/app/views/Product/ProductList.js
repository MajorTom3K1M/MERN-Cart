import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { productService } from '../../util/services/product.service';
import {
    Col,
    Row,
    Button
} from "reactstrap";

var INITIAL_STATE = { product: null, pageNum: null, totalItemCount: null };
class ProductList extends Component {
    state = INITIAL_STATE;

    componentDidMount() {
        const { match: { params: { page } } } = this.props;
        productService.getPaginationData(page)
            .then(({ results, pageNum, totalItemCount }) => {
                this.setState({ product: results, pageNum, totalItemCount });
            });
    }

    render() {
        const { product } = this.state;
        return (
            <Col sm={12} md={{ size: 8, offset: 2 }} className="product-layout">
                <Row>
                    {
                        product?.map((props, key) => (
                            <Col xs={6} md={4} className="product-item" key={key}>
                                <div className="thumbnail">
                                    <div className="product-wrapper">
                                        <Link to={`/product/${props.productPermalink}`}>
                                            <div className="vertical-center img-thumbnail">
                                                <img className="img-fluid" src={props.productImage} />
                                            </div>
                                            <h3 className="product-title product-title-home top-pad-10">
                                                {props.productTitle}
                                            </h3>
                                        </Link>
                                    </div>
                                    <h3 className="product-price mp-0 text-center">
                                        {/* ฿{props.productPrice} */}
                                        £{props.productPrice}
                                    </h3>
                                    <p className="text-center">
                                        <Button className="btn btn-black add-to-cart">Add to cart</Button>
                                    </p>
                                </div>
                            </Col>
                        ))

                    }
                    {/* <Col xs={6} md={4} className="product-item">
                        <div className="thumbnail">
                            <div className="product-wrapper">
                                <Link to="/product/test">
                                    <div className="vertical-center img-thumbnail">
                                        <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                    </div>
                                    <h3 className="product-title product-title-home top-pad-10">
                                        Scout Backpack
                                    </h3>
                                </Link>
                            </div>
                            <h3 className="product-price mp-0 text-center">
                                £128.00
                            </h3>
                            <p className="text-center">
                                <a className="btn btn-black add-to-cart" data-id="5df73366a832c067fdf7bfd9" data-link="scout-backpack" data-has-options="true" role="button">Add to cart</a>
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className="product-item">
                        <div className="thumbnail">
                            <div className="product-wrapper">
                                <Link to="/product/scout-backpack">
                                    <div className="vertical-center img-thumbnail">
                                        <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                    </div>
                                    <h3 className="product-title product-title-home top-pad-10">
                                        Scout Backpack
                                </h3>
                                </Link>
                            </div>
                            <h3 className="product-price mp-0 text-center">
                                £128.00
                                        </h3>
                            <p className="text-center">
                                <a className="btn btn-black add-to-cart" data-id="5df73366a832c067fdf7bfd9" data-link="scout-backpack" data-has-options="true" role="button">Add to cart</a>
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className="product-item">
                        <div className="thumbnail">
                            <div className="product-wrapper">
                                <Link to="/product/scout-backpack">
                                    <div className="vertical-center img-thumbnail">
                                        <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                    </div>
                                    <h3 className="product-title product-title-home top-pad-10">
                                        Scout Backpack
                                </h3>
                                </Link>
                            </div>
                            <h3 className="product-price mp-0 text-center">
                                £128.00
                        </h3>
                            <p className="text-center">
                                <a className="btn btn-black add-to-cart" data-id="5df73366a832c067fdf7bfd9" data-link="scout-backpack" data-has-options="true" role="button">Add to cart</a>
                            </p>
                        </div>
                    </Col> */}

                </Row>
            </Col>
        );
    }
}

export default withRouter(ProductList);