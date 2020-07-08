import React, { Component, useState } from 'react'
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
    ListGroupItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import ReactQuill from 'react-quill';
import { newProductSchema } from '../../util/schemas'
import { productInsert } from '../../services/products/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Typeahead } from 'react-bootstrap-typeahead';

var optJson = {};
const ProductForm = ({ props: { productInsert, history } }) => {
    const [optList, setOptList] = useState(null);
    const [modal, setModal] = useState(false);
    const optForm = useForm();
    const { control, register, watch, handleSubmit, reset, errors } = useForm({
        validationSchema: newProductSchema,
        validateCriteriaMode: "all",
        mode: "onBlur"
    });

    const onSubmit = async data => {
        const {
            productTitle, productPrice,
            productPublished, productPermalink,
            productSubscription, productComment,
            productTags, productDescription
        } = data;
        productInsert(
            productPermalink, productTitle,
            productPrice, productDescription,
            productPublished, productTags,
            optList, productComment,
            productSubscription, undefined, 
            undefined, redirect
        );
        function redirect(productId) { history.push('/admin/products/edit/' + productId) };
    }

    const productOptInsert = async data => {
        const { optName, optLabel, optType, optOptions } = data;
        optJson[optName] = {
            optName: optName,
            optLabel: optLabel,
            optType: optType,
            optOptions: optOptions.split(',')
        };
        setOptList(optJson);
        optForm.reset({
            "optName": "",
            "optLabel": "",
            "optType": "select",
            "optOptions": ""
        });
    }

    const productOptRemove = async optName => {
        delete optList[optName];
        var tempList = Object.assign({}, optList);
        setOptList(tempList);
    }

    const productOptList = () => {
        return (
            Object.entries(optList).map(({ 1: { optName, optLabel, optType, optOptions } }, key) => (
                <ListGroupItem key={key}>
                    <Row>
                        <Col sm={2} className="opt-name">{optName}</Col>
                        <Col sm={2}>{optLabel}</Col>
                        <Col sm={2}>{optType} </Col>
                        <Col sm={4} className="col-sm-4">{optOptions.join(",")}</Col>
                        <Col sm={2} className="text-right">
                            <Button color={"outline-danger"} onClick={() => productOptRemove(optName)}>Remove</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))
        );
    }

    const RenderProductOptions = () => {
        return (
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col sm={2}>
                            <strong>Name:</strong>
                            <Input name="optName" placeholder={"Size"} innerRef={optForm.register} />
                        </Col>
                        <Col sm={2}>
                            <strong>Label:</strong>
                            <Input name="optLabel" placeholder={"Select size"} innerRef={optForm.register} />
                        </Col>
                        <Col sm={2}>
                            <strong>Type:</strong>
                            <Input name="optType" type={"select"} innerRef={optForm.register} >
                                <option value={"select"}>Select</option>
                                <option value={"radio"}>Radio</option>
                                <option value={"checkbox"}>Checkbox</option>
                            </Input>
                        </Col>
                        <Col sm={4}>
                            <strong>Options:</strong>
                            <Input name="optOptions" placeholder={"comma, seperated, list"} innerRef={optForm.register} />
                        </Col>
                        <Col xs={12} sm={2} className="text-right align-bottom">
                            <br />
                            <Button color={"outline-success"} type={"reset"} onClick={optForm.handleSubmit(productOptInsert)} >Add</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
                {optList ? productOptList() : null}
            </ListGroup>
        )
    }

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
                                <Col md={12} lg={12} style={ { zIndex: 1000 } }>
                                    <Button
                                        color={'outline-success'}
                                        className="float-right"
                                        onClick={Object.keys(errors).length > 0 ? () => { setModal(!modal) } : handleSubmit(onSubmit)}
                                    >
                                        Add Product
                                    </Button>
                                    <br />
                                </Col>
                                <Col md={12} lg={12} >
                                    <label>Product title *</label>
                                    <Input
                                        invalid={errors?.productTitle ? true : false}
                                        name="productTitle"
                                        innerRef={register}
                                    />
                                </Col>
                                <Col md={6} lg={6}>
                                    <label>Product price *</label>
                                    <InputGroup>
                                        <InputGroupAddon addonType={'prepend'}>
                                            <InputGroupText>฿</InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            invalid={errors?.productPrice ? true : false}
                                            name="productPrice"
                                            type={'number'}
                                            innerRef={register}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} lg={6}>
                                    <label>Status</label>
                                    <FormGroup>
                                        <Input name="productPublished" type={'select'} innerRef={register}>
                                            <option value={true}>Published</option>
                                            <option value={false}>Draft</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={12} lg={12}>
                                    <label style={errors?.productDescription ? { color: "red" } : {}}>Product description *</label>
                                    <Controller
                                        as={ReactQuill}
                                        modules={ProductCreate.modules}
                                        formats={ProductCreate.formats}
                                        name="productDescription"
                                        control={control}
                                        defaultValue=""
                                    />
                                </Col>
                                <Col md={12} lg={12}>
                                    <label>Permalink</label>
                                    <InputGroup>
                                        <Input name="productPermalink" placeholder="Permalink for the article" innerRef={register} />
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
                                    <RenderProductOptions />
                                </Col>
                                <Col sm={12}>
                                    <label>Subscription Plan</label>
                                    <Input name="productSubscription" placeholder={"plan_XXXXXXXXXXXXXX"} innerRef={register} />
                                    <p className="form-description text-muted">
                                        First setup the plan in Stripe dashboard and enter the Plan ID. Format: plan_XXXXXXXXXXXXXX
                                    </p>
                                </Col>
                                <Col sm={12}>
                                    <label>Allow comment</label>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Input name="productComment" type={'checkbox'} className="checkbox" innerRef={register} />
                                            </FormGroup>
                                            <p className="form-description text-muted">
                                                Allow free form comments when adding products to cart
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={12}>
                                    <label>Product tag words</label>
                                    {/* <Input name="productTags" innerRef={register} /> */}
                                    <Controller
                                        as={Typeahead}
                                        allowNew
                                        id="custom-selections"
                                        multiple
                                        newSelectionPrefix="Add tag: "
                                        options={[]}
                                        control={control}
                                        placeholder="Type anything..."
                                        onChange={([productTags]) => productTags.map(e => e.label).join(",")}
                                        name="productTags"
                                    />
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

            {/* Modal Change Later */}

            <Modal
                isOpen={modal}
                toggle={() => setModal(!modal)}
                size={'lg'}
            >
                <ModalHeader className="text-danger" toggle={() => setModal(!modal)}>Error</ModalHeader>
                <ModalBody>
                    {
                        Object.keys(errors).map((name, key) => {
                            if (errors[name]) {
                                return (
                                    <p> {name} - <span className="text-danger">{errors[name]?.message}</span></p>
                                )
                            }
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={() => setModal(!modal)}>Do Something</Button>{' '} */}
                    <Button className="btn-black mr-auto" onClick={() => setModal(!modal)}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Modal Change Later */}

        </div>
    )
}

class ProductCreate extends Component {
    render() {
        return (
            <ProductForm props={this.props} />
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

const mapStateToProps = state => {
    console.log(state)
    return {
        customer: state.customer
    }
}

export default withRouter(
    connect(mapStateToProps, { productInsert })(ProductCreate)
);