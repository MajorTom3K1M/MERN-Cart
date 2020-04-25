import { SortableElement } from "react-sortable-hoc";
import React from "react";
import { Col, Input, Row, FormGroup, Button } from 'reactstrap';
import { Move, Trash2, Save } from 'react-feather';


const SortableItem = SortableElement(({ value }) => (
    <Row className="move">
        <Col sm={1} className="mx-auto text-center">
            <Move size={16} />
        </Col>
        <Col sm={2} className="mx-auto">
            <Input type={'text'} />
        </Col>
        <Col sm={7} className="mx-auto">
            <Input type={'text'} />
        </Col>
        <Col sm={2}>
            <Button color={'outline-danger'} style={{ marginLeft: 3, marginRight: 3 }}><Trash2 size={16} /></Button>
            <Button color={'outline-success'} style={{ marginLeft: 3, marginRight: 3 }}><Save size={16} /></Button>
        </Col>
    </Row>
));

export default SortableItem;