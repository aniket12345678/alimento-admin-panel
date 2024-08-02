import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import AddModal from '../components/categories/AddModal';
import UpdateModal from '../components/categories/UpdateModal';
import CategoryTable from '../components/categories/CategoryTable';
import { categoryDelete, categoryFindAll } from '../slices/category.slice';

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

    const allCategories = () => {
        dispatch(categoryFindAll({ token: signin.token }))
    }

    const changeModalState = (params) => {
        setModalState(params);
    }

    const updateRecord = useCallback((data) => {
        setFindOne(findAll.find((x) => x['_id'] === data));
        setUpdateModalState(true);
    }, [findAll]);

    const deleteRecord = useCallback((data) => {
        if (window.confirm('Do you want to delete this data?')) {
            dispatch(categoryDelete({ token: signin.token, main: { id: data } }))
                .unwrap()
                .then((response) => {
                    allCategories();
                }).catch((err) => {
                    console.log('err:- ', err);
                });
        }
    }, []);

    const columns = useMemo(() => CategoryTable({ updateRecord, deleteRecord }), [signin.token]);


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
