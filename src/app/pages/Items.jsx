import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';

import AddModal from '../components/items/AddModal';
import ItemTable from '../components/items/ItemTable';
import UpdateModal from '../components/items/UpdateModal';
import { itemDelete, itemFindAll } from '../slices/item.slice';

const Items = () => {
    const dispatch = useDispatch();
    const { findAll } = useSelector((params) => params.itemSlice);
    const { signin } = useSelector((params) => params.authSlice);
    const [findOne, setFindOne] = useState({});
    const [modalState, setModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);

    useEffect(() => {
        allItems();
    }, []);

    const allItems = () => {
        dispatch(itemFindAll({ token: signin.token }))
    };

    const changeModalState = (params) => {
        setModalState(params);
    }

    const updateRecord = (data) => {
        setFindOne(findAll.find((x) => x.id === data));
        setUpdateModalState(true);
    }

    const deleteRecord = (data) => {
        if (window.confirm('Do you want to delete this data?')) {
            dispatch(itemDelete({ token: signin.token, main: { id: data } }))
                .unwrap()
                .then((result) => {
                    allItems();
                }).catch((err) => {
                    console.log('err:- ', err);
                });
        }
    }

    const columns = useMemo(
        () => ItemTable({ updateRecord, deleteRecord }),
        [signin.token]
    );

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
            <AddModal show={modalState} changeModalState={changeModalState} allItems={allItems} />
            <UpdateModal
                data={findOne}
                allItems={allItems}
                show={updateModalState}
                changeModalState={setUpdateModalState}
            />
        </section>
    )
}

export default Items
