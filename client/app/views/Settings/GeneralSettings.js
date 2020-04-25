import React from 'react'
import {
    Button,
    Input,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    FormGroup
} from "reactstrap";

import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";

class GeneralSetting extends React.Component {

    componentDidMount() {
        var options = {
            theme: "flatly",
            mode: { name: "htmlmixed" },
            indentWithTabs: true,
            lineNumbers: true,
        }
        var footerHtmlCode = CodeMirror.fromTextArea(this.refs.footerHtml, options);
        var googleAnalyticsCode = CodeMirror.fromTextArea(this.refs.googleAnalytics, options);
        var customCssCode = CodeMirror.fromTextArea(this.refs.customCss, { ...options, mode: "css" });

        footerHtmlCode.setValue(`<h4 class="text-center">Powered by expressCart</h4>`);
    }

    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        General settings
                    </h4>
                </div>
                <div className="page-content-wrapper">
                    <Row>
                        <Col xs={12} >
                            <Card>
                                <CardTitle></CardTitle>
                                <CardBody>
                                    <Row>
                                        <Col xs={12}>
                                            <Button color={'outline-success'} className="float-right">Update</Button>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Cart name *</label>
                                            <Input />
                                            <p className="form-description">This element is critical for search engine optimisation. Cart title is displayed if your logo is hidden.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Cart description *</label>
                                            <Input />
                                            <p className="form-description">This description shows when your website is listed in search engine results.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Cart image/logo</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>Cart URL *</label>
                                            <Input />
                                            <p className="form-description">This URL is used in sitemaps and when your customer returns from completing their payment.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Cart Email *</label>
                                            <Input />
                                            <p className="form-description">This is used as the "from" email when sending receipts to your customers.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Payment gateway</label>
                                            <Input />
                                            <p className="form-description">You will also need to configure your payment gateway credentials in the `/config/&lt;gateway_name&gt;.json` file.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Currency symbol</label>
                                            <Input />
                                            <p className="form-description">Set this to your currency symbol. Eg: $, £, €</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Theme</label>
                                            <Input />
                                            <p className="form-description">Themes are loaded from `/public/themes/`</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Products per row</label>
                                            <Input />
                                            <p className="form-description">The number of products to be displayed across the page.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Products per page</label>
                                            <Input />
                                            <p className="form-description">The number of products to be displayed on each page.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Menu Enabled:</label>
                                            <FormGroup>
                                                <Input type={'checkbox'} className="checkbox" />
                                            </FormGroup>
                                            <p className="form-description">If a menu is set you can set it up here.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Menu header</label>
                                            <Input />
                                            <p className="form-description">The heading text for your menu.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Footer HTML</label>
                                            <textarea ref="footerHtml"></textarea>
                                            <p className="form-description">The heading text for your menu.</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Google analytics</label>
                                            <textarea ref="googleAnalytics"></textarea>
                                            <p className="form-description">Your Google Analytics code. Please also inlude the "script" tags - Help</p>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Custom CSS</label>
                                            <textarea ref="customCss"></textarea>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Email SMTP Host</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>Email SMTP Port</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <label>Menu Enabled:</label>
                                            <FormGroup>
                                                <Input type={'checkbox'} className="checkbox" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} >
                                            <label>Email SMTP Username</label>
                                            <Input />
                                        </Col>
                                        <Col xs={12} >
                                            <FormGroup>
                                                <label>Email SMTP Password</label>
                                                <Input />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} >
                                            <FormGroup>
                                                <Button color={'outline-success'}>Send test email</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
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

export default GeneralSetting;