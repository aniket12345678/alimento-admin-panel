import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import { categoryFindAll } from '../../slices/category.slice';
import { itemUpdate } from '../../slices/item.slice';

const UpdateModal = (props) => {
    const dispatch = useDispatch();
    const { show, changeModalState, data, allItems } = props;

    const [categoryData, setCategoryData] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [storeImg, setStoreImg] = useState('');

    useEffect(() => {
        if (secureLocalStorage.getItem('loginStatus')) {
            allCategories();
        }
    }, []);

    const validateFields = yup.object().shape({
        item: yup.string().required('Enter Item'),
        category_id: yup.string().required('Select category'),
    })

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            item: data.item,
            category_id: data.category_id['_id'],
            '_id': data['_id'],
        },
        validationSchema: validateFields,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('values:- ', values);
            const formdata = new FormData();
            formdata.append('attachments', storeImg);
            formdata.append('data', JSON.stringify(values));
            dispatch(itemUpdate(formdata)).unwrap().then((response) => {
                if (response.code === 200) {
                    allItems();
                    resetForm();
                    setStoreImg('');
                    setPreviewImg(null);
                    changeModalState(false)
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    });

    function allCategories() {
        dispatch(categoryFindAll())
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
                <Modal.Title>Update Item</Modal.Title>
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
                        previewImg ?
                            <img src={previewImg} alt="" style={{ width: '140px', height: '160px' }} />
                            :
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/items/img/${values['_id']}`}
                                alt=""
                                style={{ width: '140px', height: '160px' }}
                            />
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

export default UpdateModal
