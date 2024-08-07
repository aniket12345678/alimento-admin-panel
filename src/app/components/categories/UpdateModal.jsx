import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { categoryUpdate } from '../../slices/category.slice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateModal = (props) => {
    const dispatch = useDispatch();
    const { signin } = useSelector((params) => params.authSlice);
    const { show, changeModalState, data, allCategories } = props;

    const [previewImg, setPreviewImg] = useState(null);
    const [storeImg, setStoreImg] = useState('');

    const validateFields = yup.object().shape({
        category: yup.string().required('Enter category'),
    });

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: data,
        validationSchema: validateFields,
        enableReinitialize: true,
        onSubmit: (values) => {
            const formdata = new FormData();
            formdata.append('attachments', storeImg);
            formdata.append('data', JSON.stringify(values));
            dispatch(categoryUpdate({ form: formdata, token: signin.token }))
                .unwrap()
                .then((response) => {
                    if (response.code === 200) {
                        allCategories();
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

    const handleFiles = (data) => {
        setStoreImg(data);
        const reader = new FileReader();
        reader.onload = function () {
            setPreviewImg(reader.result);
        };
        reader.readAsDataURL(data);
    }

    return (
        <Modal keyboard={false} backdrop='static' show={show} onHide={() => changeModalState(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="my-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            name='category'
                            placeholder="Category"
                            value={values && values.category}
                            onChange={handleChange}
                        />
                        {errors.category && <div>{errors.category}</div>}
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label htmlFor="categoryFiles" >
                            Select Image
                        </Form.Label>
                        <Form.Control
                            style={{ display: 'none' }}
                            type='file'
                            id='categoryFiles'
                            name='attachments'
                            onChange={(e) => handleFiles(e.target.files[0])}
                        />
                    </Form.Group>
                    {
                        previewImg ?
                            <img src={previewImg} alt="" style={{ width: '140px', height: '160px' }} />
                            :
                            values && <img
                                src={`${process.env.REACT_APP_BASE_URL}/categories/img/${values['_id']}`}
                                alt=""
                                style={{ width: '140px', height: '160px' }}
                            />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type='submit'>
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateModal
