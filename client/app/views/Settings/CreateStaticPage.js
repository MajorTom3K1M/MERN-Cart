import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Input,
    Row,
    Col,
} from "reactstrap";
import ReactQuill from 'react-quill';

class CreateStaticPage extends Component {
    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Static page
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col sm={12} md={12} lg={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Col md={12} lg={12} >
                                        <Button color={'outline-success'} className="float-right">Create</Button>
                                        <br />
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Page name *</label>
                                        <Input />
                                        <p className="form-description text-muted">
                                            A friendly name to manage the static page.
                                        </p>
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Page slug *</label>
                                        <Input />
                                        <p className="form-description text-muted">
                                            This is the relative URL of the page.
                                            Eg: A setting of "about" would make the page available at: mydomain.com/about
                                        </p>
                                    </Col>
                                    <Col md={12} lg={12} >
                                        <label>Page Enabled:</label>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Input type={'checkbox'} className="checkbox" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <br />
                                    <Col md={12} lg={12} >
                                        <label>Page content *</label>
                                        <ReactQuill
                                            modules={CreateStaticPage.modules}
                                            formats={CreateStaticPage.formats}
                                        />
                                        <p className="form-description text-muted">
                                            Here you can enter the content you wish to be displayed on your static page.
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

CreateStaticPage.modules = {
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

CreateStaticPage.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default CreateStaticPage;