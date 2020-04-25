import React, { Component } from 'react';
import SortableComponent from '../../components/SortableForm/SortableComponent';
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
import { Plus } from 'react-feather';

import { ReactSortable, Sortable } from "react-sortablejs";

class Menu extends Component {
    componentDidMount() {
        // var sortableElement = Sortable.create(this.refs.sortable, {
        //     // ghostClass: "custom-drag-ghost",
        //     dragClass: "custom-drag-ghost",
        //     // chosenClass: "custom-drag-ghost"
        // })
    }

    state = {
        array: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 }
        ]
    };

    render() {
        return (
            <div className="content">
                <div className="page-header-title">
                    <h4 className="page-title">
                        Menu
                </h4>
                </div>
                <div className="page-content-wrapper">
                    <Card>
                        <CardTitle></CardTitle>
                        <CardBody>
                            <SortableComponent />
                            <Row>
                                <Col sm={1} className="mx-auto">
                                </Col>
                                <Col sm={2} className="mx-auto">
                                    <Input type={'text'} />
                                </Col>
                                <Col sm={7} className="mx-auto">
                                    <Input type={'text'} />
                                </Col>
                                <Col sm={2} className="mx-auto">
                                    <Button color={'outline-success'} style={{ marginLeft: 3, marginRight: 3 }}>
                                        <Plus size={16} />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={11} offset={1} className="mx-auto">
                                    <p className="form-description">
                                        Here you can setup a menu to displayed on your shopping cart.
                                        You can use this menu to filter your products by specifying a keyword in the "link" field.
                                        Eg: To show products with a keyword (or tag) of boots you would set the menu field to "Backpacks" and a link value "backpack".
                                        You can also use this menu to link to static pages, Eg: shipping, returns, help, about, contact etc.
                                    </p>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Menu;