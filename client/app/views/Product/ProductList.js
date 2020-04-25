import React, { Component } from "react";
import {
    Col,
    Row
} from "reactstrap";

class ProductList extends Component {
    render() {
        return (
            <Row>
                <Col xs={6} md={4} className="product-item">
                    <div className="thumbnail">
                        <div className="product-wrapper">
                            <a href="/product/test">
                                <div className="vertical-center img-thumbnail">
                                    <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                </div>
                                <h3 className="product-title product-title-home top-pad-10">
                                    Scout Backpack
                                </h3>
                            </a>
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
                            <a href="/product/scout-backpack">
                                <div className="vertical-center img-thumbnail">
                                    <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                </div>
                                <h3 className="product-title product-title-home top-pad-10">
                                    Scout Backpack
                                </h3>
                            </a>
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
                            <a href="/product/scout-backpack">
                                <div className="vertical-center img-thumbnail">
                                    <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd9/scout-backpack_a035275d-8975-4a05-8456-5e1ec35f020f_grande.jpg" alt="..." />
                                </div>
                                <h3 className="product-title product-title-home top-pad-10">
                                    Scout Backpack
                                </h3>
                            </a>
                        </div>
                        <h3 className="product-price mp-0 text-center">
                            £128.00
                        </h3>
                        <p className="text-center">
                            <a className="btn btn-black add-to-cart" data-id="5df73366a832c067fdf7bfd9" data-link="scout-backpack" data-has-options="true" role="button">Add to cart</a>
                        </p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ProductList;