import { SortableContainer } from "react-sortable-hoc";
import SortableItem from './SortableItem';
import React from "react";
import { Row } from 'reactstrap';

const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});

export default SortableList;