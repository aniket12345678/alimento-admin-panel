import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup'

import { categoryFindAll } from '../../slices/category.slice';
import { itemAdd } from '../../slices/item.slice';
import { adminAuthCheck } from '../../config/AuthCheck';

const AddModal = (props) => {
    const { show, changeModalState, allItems } = props;
    const dispatch = useDispatch();
    const { signin } = useSelector((params) => params.authSlice);

    const [categoryData, setCategoryData] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [storeImg, setStoreImg] = useState('');

    useEffect(() => {
        allCategories();
    }, []);

    const validateFields = yup.object().shape({
        item: yup.string().required('Enter Item'),
        category_id: yup.string().required('Select category'),
    })

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            item: '',
            category_id: ''
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            const formdata = new FormData();
            formdata.append('attachments', storeImg);
            formdata.append('data', JSON.stringify(values));
            dispatch(itemAdd({ form: formdata, token: signin.token }))
                .unwrap()
                .then((response) => {
                    if (response.code === 200) {
                        allItems()
                        resetForm();
                        setStoreImg('');
                        setPreviewImg(null);
                        changeModalState(false)
                    }
                    console.log('response:- ', response);
                }).catch((err) => {
                    console.log(err);
                })
        }
    });

    function allCategories() {
        dispatch(categoryFindAll({ token: signin.token }))
            .unwrap()
            .then((response) => {
                setCategoryData(response.data);
            }).catch((err) => {
                console.log('err:- ', err);
            })
    }

    const handleFiles = (data) => {
        setStoreImg(data);
        const reader = new FileReader();
        reader.onload = function () {
            setPreviewImg(reader.result);
        };
        reader.readAsDataURL(data);
    }

    return (
        <Modal
            backdrop='static'
            keyboard={false}
            show={show}
            onHide={() => changeModalState(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col md='6'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    name='item'
                                    value={values.item}
                                    onChange={handleChange}
                                    placeholder="Item"
                                />
                            </Form.Group>
                            {errors.item && <div className="formik-error">{errors.item}</div>}
                        </Col>
                        <Col md='6'>
                            <Form.Select
                                aria-label="Default select example"
                                name='category_id'
                                onChange={handleChange}
                                value={values.category_id}
                            >
                                <option value=''>Select category</option>
                                {
                                    categoryData.map((itr) => {
                                        return (
                                            <option
                                                value={itr['_id']}
                                                key={itr.category + itr['_id']}
                                            >
                                                {itr.category}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Select>
                            {errors.category_id && <div className="formik-error">{errors.category_id}</div>}
                        </Col>
                    </Row>

                    <Form.Group className="my-3">
                        <Form.Label htmlFor="itemFiles" >
                            Select Image
                        </Form.Label>
                        <Form.Control
                            style={{ display: 'none' }}
                            type='file'
                            id='itemFiles'
                            name='attachments'
                            onChange={(e) => handleFiles(e.target.files[0])}
                        />
                    </Form.Group>
                    {
                        previewImg &&
                        <img src={previewImg} alt="" style={{ width: '140px', height: '160px' }} />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type='submit'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
