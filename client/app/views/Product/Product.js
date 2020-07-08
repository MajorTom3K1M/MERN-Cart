import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { productService } from '../../util/services/product.service';

import {
    Col,
    Row,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap";
import {
    ChevronLeft,
    ChevronRight
} from "react-feather"

var INITIAL_STATE = { product: null, images: null, relatedProducts: null };
class Product extends Component {
    state = INITIAL_STATE;
    componentDidMount() {
        const { params: { id } } = this.props.match;
        productService.getIndividualProduct(id)
            .then(({ product, images, relatedProducts }) => {
                this.setState({ product, images, relatedProducts });
                console.log(images)
            })
    }

    render() {
        const { product, images } = this.state;
        return (
            <Col sm={12} md={{ size: 8, offset: 2 }} className="product-layout">
                <Row>
                    <Col sm={12} md={6} className="mr-auto">
                        <div className="title-image-container">
                            <div className="image-prev image-button">
                                <ChevronLeft size={16} />
                            </div>
                            <img src={product?.productImage} id="product-title-image" className="product-title-image img-fluid" />
                            <div className="image-next image-button">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <Row>
                            {
                                images?.map((source, key) => {
                                    if (source.productImage) return null;
                                    return (
                                        <Col xs={6} className="vertical-center top-pad-20" key={key}>
                                            <img src={source.path} className="thumbnail-image img-fluid" />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                    <Col sm={12} md={6} className="ml-auto">
                        <Row>
                            <Col md={10}>
                                <h1 className="product-title text-truncate">{product?.productTitle}</h1>
                            </Col>
                            <Col md={10}>
                                <h4 className="product-price mp-0">£{product?.productPrice}</h4>
                            </Col>
                            <Col md={10}>
                                <h4 className="product-option">Options</h4>
                            </Col>
                            <Col md={10}>
                                <strong>Select colour</strong>
                                <Input type={'select'} data-label="Select colour" className="form-control product-opt">
                                    <option value="Navy">Navy</option>
                                    <option value="Moss">Moss</option>
                                    <option value="Nutmeg">Nutmeg</option>
                                    <option value="Khaki">Khaki</option>
                                </Input>
                            </Col>
                            <Col md={10} className="productOptions">
                                <p className="product-option-text">Quantity</p>
                                <InputGroup>
                                    <InputGroupAddon addonType={'prepend'}>
                                        <Button type={"button"} color={"black"}>-</Button>
                                    </InputGroupAddon>
                                    <Input type={'number'} className="form-control text-center" maxLength={"3"} value={"1"} />
                                    <InputGroupAddon addonType={'append'}>
                                        <Button type={"button"} color={"black"}>+</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Col>
                            <Col md={10} className="btnAddToCart">
                                <Button color={"black"} className="btn-block">Add to cart</Button>
                            </Col>
                            <Col md={10} className="body_text">
                                {/* {product?.productDescription} */}
                                <div dangerouslySetInnerHTML={{ __html: product?.productDescription }} />
                                {/* <p>
                                    <span style={{ lineHeight: 1.42857 }}>
                                        This durable backpack is ready for any adventure, large or small.
                                        Features adjustable and padded shoulder pads for comfort.
                                        Designed with a storm flap and a secured by two snap-button closure.
                                        Made with a waxed downpour proof exterior canvas and a soft cotton interior lining.
                                        Finished with brass hardware and genuine leather trimmings.
                                    </span>
                                </p>
                                <ul>
                                    <li>
                                        <span style={{ lineHeight: 1.42857 }}>
                                            100% organic waxed 18 oz canvas
                                        </span>
                                    </li>
                                    <li>
                                        <span style={{ lineHeight: 1.42857 }}>
                                            Full grain genuine leather accents
                                        </span>
                                    </li>
                                    <li>
                                        Adjustable shoulder straps
                                    </li>
                                    <li>
                                        Lifetime&amp;nbsp;Guarantee
                                    </li>
                                </ul> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Col sm={12} className="mt-5">
                    <h4>Related products</h4>
                    <Row>
                        <Col md={3}>
                            <div>
                                <div className="product-wrapper">
                                    <a href="/product/duckworth-jacket">
                                        <div className="vertical-center img-thumbnail">
                                            <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd5/woolfill-jacket_6c39ae23-c0c8-4821-85f4-4b5d64333c62_grande.jpg" alt="..." />
                                        </div>
                                        <h3 className="product-title product-title-home top-pad-10">
                                            Duckworth Woolfill Jacket
                                        </h3>
                                    </a>
                                </div>
                                <h3 className="product-price mp-0 text-center">
                                    £188.00
                                </h3>
                                <p className="text-center">
                                    <a className="btn btn-black" href="/product/duckworth-jacket">View</a>
                                </p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <div className="product-wrapper">
                                    <a href="/product/duckworth-jacket">
                                        <div className="vertical-center img-thumbnail">
                                            <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfd6/5-panel-hat_4ee20a27-8d5a-490e-a2fc-1f9c3beb7bf5_grande.jpg" alt="..." />
                                        </div>
                                        <h3 className="product-title product-title-home top-pad-10">
                                            5 Panel Camp Cap
                                        </h3>
                                    </a>
                                </div>
                                <h3 className="product-price mp-0 text-center">
                                    £48.00
                                </h3>
                                <p className="text-center">
                                    <a className="btn btn-black" href="/product/duckworth-jacket">View</a>
                                </p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <div className="product-wrapper">
                                    <a href="/product/duckworth-jacket">
                                        <div className="vertical-center img-thumbnail">
                                            <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfda/hudderton-backpack_dc8afb13-448b-49d9-a042-5a163a97de8f_590x.jpg" alt="..." />
                                        </div>
                                        <h3 className="product-title product-title-home top-pad-10">
                                            Hudderton Backpack
                                        </h3>
                                    </a>
                                </div>
                                <h3 className="product-price mp-0 text-center">
                                    £77.00
                                </h3>
                                <p className="text-center">
                                    <a className="btn btn-black" href="/product/duckworth-jacket">View</a>
                                </p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <div className="product-wrapper">
                                    <a href="/product/duckworth-jacket">
                                        <div className="vertical-center img-thumbnail">
                                            <img className="img-fluid" src="https://demo.expresscart.markmoffat.com/uploads/5df73366a832c067fdf7bfdb/chambray_5f232530-4331-492a-872c-81c225d6bafd_590x.jpg" alt="..." />
                                        </div>
                                        <h3 className="product-title product-title-home top-pad-10">
                                            Ayres Chambray
                                        </h3>
                                    </a>
                                </div>
                                <h3 className="product-price mp-0 text-center">
                                    £77.00
                                </h3>
                                <p className="text-center">
                                    <a className="btn btn-black" href="/product/duckworth-jacket">View</a>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Col>
        );
    }
}

export default withRouter(Product);