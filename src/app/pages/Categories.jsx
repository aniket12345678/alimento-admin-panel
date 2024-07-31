import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import AddModal from '../components/categories/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { categoryDelete, categoryFindAll } from '../slices/category.slice';
import UpdateModal from '../components/categories/UpdateModal';

const Categories = () => {
    const dispatch = useDispatch();
    const { findAll } = useSelector((params) => params.categorySlice);
    const { signin } = useSelector((params) => params.authSlice);
    const [findOne, setFindOne] = useState({});
    const [modalState, setModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);

    useEffect(() => {
        allCategories();
    }, []);

    function allCategories() {
        dispatch(categoryFindAll({ token: signin.token }))
    }

    function changeModalState(params) {
        setModalState(params);
    }

    function updateRecord(data) {
        setFindOne(findAll.find((x) => x['_id'] === data));
        setUpdateModalState(true);
    }

    function deleteRecord(data) {
        if (window.confirm('Do you want to delete this data?')) {
            let deleteObj = { token: signin.token, main: { id: data } }
            dispatch(categoryDelete(deleteObj)).unwrap().then((response) => {
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
                src={`${process.env.REACT_APP_BASE_URL}/categories/img/${x['_id']}?${Date.now()}`}
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
