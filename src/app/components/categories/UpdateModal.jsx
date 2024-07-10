import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { adminAuthCheck } from '../../config/AuthCheck';
import { categoryAdd } from '../../slices/category.slice';
import { useDispatch } from 'react-redux';

const UpdateModal = (props) => {
    const { show, changeModalState, data } = props;
    console.log('data:- ', data);
    const dispatch = useDispatch();

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
            console.log('values:- ', values);
            const { id } = adminAuthCheck.getAuthUser();
            values.user_id = id;
            const formdata = new FormData();
            formdata.append('attachments', storeImg);
            formdata.append('data', JSON.stringify(values));
            dispatch(categoryAdd(formdata)).unwrap().then((response) => {
                // if (response.code === 200) {
                //     resetForm();
                //     setStoreImg('');
                //     setPreviewImg(null);
                //     changeModalState(false)
                // }
                // console.log('response:- ', response);
            }).catch((err) => {
                console.log(err);
            })
        }
    });

    console.log('values:- ', values);

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
                            value={values.category}
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
                            <img
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