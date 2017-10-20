import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

const DefaultModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={props.onSubmit}>
                    {
                        props.fields.map((item, key) => (
                            <FieldGroup
                                id={"formControlsText" + key}
                                key={key}
                                type="text"
                                label={item.title}
                                name={item.name}
                                defaultValue={item.value}
                                placeholder={"Enter " + item.name}
                            />
                        ))
                    }
                    <Button type="submit">{props.isUpdateType ? 'Update' : 'Submit'}</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
};
DefaultModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    fields: PropTypes.array,
}
export default DefaultModal;
