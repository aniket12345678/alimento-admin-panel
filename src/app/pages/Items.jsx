import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

import AddModal from '../components/items/AddModal';
import UpdateModal from '../components/items/UpdateModal';
import { itemDelete, itemFindAll, itemFindOne } from '../slices/item.slice';

const Items = () => {
    const dispatch = useDispatch();
    const { findAll } = useSelector((params) => params.itemSlice);
    const [findOne, setFindOne] = useState({});
    const { signin } = useSelector((params) => params.authSlice);
    const [modalState, setModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);

    useEffect(() => {
        allItems();
    }, []);

    const allItems = () => {
        dispatch(itemFindAll({ token: signin.token }))
    };

    function changeModalState(params) {
        setModalState(params);
    }

    function updateRecord(data) {
        setFindOne(findAll.find((x) => x.id === data));
        setUpdateModalState(true);
    }

    function deleteRecord(data) {
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

    const columns = [
        {
            name: 'id',
            selector: x => x.id,
        },
        {
            name: 'Category',
            selector: x => <strong>{x.category_id['category']}</strong>,
        },
        {
            name: 'Item',
            selector: x => <strong>{x.item}</strong>,
        },
        {
            name: 'Image',
            selector: x => <img
                width={38}
                src={`${process.env.REACT_APP_BASE_URL}/items/img/${x['_id']}?${Date.now()}`}
                alt="item-image"
            />,
        },
        {
            name: 'Action',
            selector: x => <div className='d-flex justify-content-between'>
                <div>
                    <Button variant='primary' onClick={() => updateRecord(x.id)}>Update</Button>
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
