import React from 'react'
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap'
import * as yup from 'yup'

const AddModal = (props) => {
    const { show, changeModalState } = props;

    const validateFields = yup.object().shape({
        category: yup.string().required('Enter category'),
    })

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            category: '',
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            console.log('values:- ', values);
        }
    });

    return (
        <Modal show={show} onHide={() => changeModalState(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="my-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            name='category'
                            placeholder="Category"
                            value={values.category}
                            onChange={handleChange}
                        />
                        {errors.category && <div>{errors.category}</div>}
                    </Form.Group>

                    <Form.Group className="my-3" controlId="formBasicPassword">
                        <Form.Control type='file' name='attachments' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => changeModalState(false)}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
