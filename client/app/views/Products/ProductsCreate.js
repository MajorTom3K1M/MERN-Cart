import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    InputGroup,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

import ReactQuill from 'react-quill';

class ProductCreate extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        New product
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Col md={12} lg={12} >
                                        <Button color={'outline-success'} className="float-right">Add Product</Button>
                                        <br />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Product title *</label>
                                        <Input />
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <label>Product price *</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType={'prepend'}>
                                                <InputGroupText>฿</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type={'number'} />
                                        </InputGroup>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <label>Status</label>
                                        <FormGroup>
                                            <Input type={'select'}>
                                                <option>Published</option>
                                                <option>Draft</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} lg={12}>
                                        <label>Product description *</label>
                                        <ReactQuill
                                            modules={ProductCreate.modules}
                                            formats={ProductCreate.formats}
                                        />
                                    </Col>
                                    <Col md={12} lg={12}>
                                        <label>Permalink</label>
                                        <InputGroup>
                                            <Input placeholder="Permalink for the article" />
                                            <InputGroupAddon addonType={'append'}>
                                                <Button color={"outline-success"}>Validate</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <p className="form-description text-muted">
                                            This sets a readable URL for the product
                                        </p>
                                    </Col>
                                    <Col md={12} lg={12}>
                                        <label>Product options</label>
                                        <ListGroup>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col sm={2}>
                                                        <strong>Name:</strong>
                                                        <Input placeholder={"Size"} />
                                                    </Col>
                                                    <Col sm={2}>
                                                        <strong>Label:</strong>
                                                        <Input placeholder={"Select size"} />
                                                    </Col>
                                                    <Col sm={2}>
                                                        <strong>Type:</strong>
                                                        <Input type={"select"}>
                                                            <option>Select</option>
                                                            <option>Radio</option>
                                                            <option>Checkbox</option>
                                                        </Input>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <strong>Options:</strong>
                                                        <Input placeholder={"comma, seperated, list"} />
                                                    </Col>
                                                    <Col xs={12} sm={2} className="text-right align-bottom">
                                                        <br />
                                                        <Button color={"outline-success"}>Add</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                    <Col sm={12}>
                                        <label>Subscription Plan</label>
                                        <Input placeholder={"plan_XXXXXXXXXXXXXX"} />
                                        <p className="form-description text-muted">
                                            First setup the plan in Stripe dashboard and enter the Plan ID. Format: plan_XXXXXXXXXXXXXX
                                        </p>
                                    </Col>
                                    <Col sm={12}>
                                        <label>Allow comment</label>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Input type={'checkbox'} className="checkbox" />
                                                </FormGroup>
                                                <p className="form-description text-muted">
                                                    Allow free form comments when adding products to cart
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={12}>
                                        <label>Product tag words</label>
                                        <Input />
                                        <p className="form-description text-muted">
                                            Tag words used to indexed products, making them easier to find and filter.
                                        </p>
                                    </Col>
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

ProductCreate.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

ProductCreate.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default ProductCreate;