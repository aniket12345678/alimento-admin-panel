import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import AddModal from '../components/categories/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    categoryDelete, categoryFindAll,
    categoryFindOne, categoryResetFindOne
} from '../slices/category.slice';
import secureLocalStorage from 'react-secure-storage';
import UpdateModal from '../components/categories/UpdateModal';

const Categories = () => {
    const dispatch = useDispatch();
    const { findAll, findOne } = useSelector((params) => params.categorySlice);
    const [modalState, setModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);

    useEffect(() => {
        if (secureLocalStorage.getItem('loginStatus')) {
            allCategories();
        }
    }, []);

    function allCategories() {
        dispatch(categoryFindAll())
    }

    function changeModalState(params) {
        setModalState(params);
    }

    function updateRecord(data) {
        setUpdateModalState(true);
        dispatch(categoryFindOne({ id: data }))
    }

    function deleteRecord(data) {
        if (window.confirm('Do you want to delete this data?')) {
            dispatch(categoryDelete({ id: data })).unwrap().then((response) => {
                allCategories();
            }).catch((err) => {
                console.log('err:- ', err);
            });
        }
    }

    const columns = [
        {
            name: 'Category',
            selector: x => <strong>{x.category}</strong>,
        },
        {
            name: 'Image',
            selector: x => <img
                width={38}
                src={`${process.env.REACT_APP_BASE_URL}/categories/img/${x['_id']}`}
                alt="category-image"
            />,
        },
        {
            name: 'Action',
            selector: x => <div className='d-flex justify-content-between'>
                <div>
                    <Button variant='primary' onClick={() => updateRecord(x._id)}>Update</Button>
                </div>
                <div>
                    <Button variant='danger' onClick={() => deleteRecord(x.id)}>Delete</Button>
                </div>
            </div>,
        },
    ];

    return (
        <section className='section'>
            <div className='mb-3'>
                <Button variant='success' onClick={() => changeModalState(true)}>
                    Add
                </Button>
            </div>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <DataTable
                                columns={columns}
                                data={findAll}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <AddModal show={modalState} changeModalState={changeModalState} />
            <UpdateModal
                data={findOne}
                show={updateModalState}
                allCategories={allCategories}
                changeModalState={setUpdateModalState}
            />
        </section>
    )
}

export default Categories
