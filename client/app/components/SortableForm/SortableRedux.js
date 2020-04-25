import React from "react";
import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";
import { reduxForm } from "redux-form";

const Handle = SortableHandle(() => <div className="handle" title="Drag to re-order the field" />);

const SortableItem = SortableElement(({ item }) => {
    return (
        <div>
            <Handle />
            {item}
        </div>
    );
});

const SortableReduxForm = SortableContainer(
    ({ items, pristine, submitting, handleSubmit }) => {
        return (
            <form className="form" onSubmit={handleSubmit}>
                {items.map((item, index) => {
                    <SortableItem index={index} key={item.key} item={item} />
                })}
                <div>
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
);

export default reduxForm({
    form: "sortableForm"
  })(SortableReduxForm);