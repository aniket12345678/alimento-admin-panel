import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const AddModal = (props) => {
    const { show, changeModalState } = props;
    return (
        <Modal show={show} onHide={() => changeModalState(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col md='6'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Item" />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Select aria-label="Default select example">
                                <option>Select category</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Form.Group className="my-3" controlId="formBasicPassword">
                        <Form.Control type='file' placeholder="Password" />
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
