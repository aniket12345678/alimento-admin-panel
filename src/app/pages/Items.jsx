import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { Col, Row, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import AddModal from '../components/items/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { itemFindAll } from '../slices/item.slice';
import { adminAuthCheck } from '../config/AuthCheck';

const Items = () => {
    const dispatch = useDispatch();
    const data = useSelector((params) => params.categorySlice);

    const [modalState, setModalState] = useState(false);
    const [itemData, setItemData] = useState([]);

    const adminCheck = adminAuthCheck.getAuthUser();

    const allItems = useCallback(() => {
        dispatch(itemFindAll({
            user_id: JSON.parse(secureLocalStorage.getItem('loginStatus')).id
        }))
            .unwrap()
            .then((response) => {
                // console.log('response:- ', response);
                setItemData(response.data);
            }).catch((err) => {
                console.log('err:- ', err);
            })
    }, [dispatch]);

    useEffect(() => {
        if (secureLocalStorage.getItem('loginStatus')) {
            allItems();
        }
    }, [adminCheck.id, allItems])



    function changeModalState(params) {
        setModalState(params);
    }

    function updateRecord(data) {
        alert('update function');
        console.log('updateRecord:- ', data);
    }

    function deleteRecord(data) {
        alert('delete function');
        console.log('deleteRecord:- ', data);
    }

    const columns = [
        {
            name: 'id',
            selector: x => x.id,
        },
        {
            name: 'Item',
            selector: x => <strong>{x.item}</strong>,
        },
        {
            name: 'Image',
            selector: x => <img width={38} src={`http://localhost:5000/api/items/img/${x.id}`} alt="" />,
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
                                data={itemData}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <AddModal show={modalState} changeModalState={changeModalState} allItems={allItems} />

        </section>
    )
}

export default Items
