import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import AddModal from '../components/categories/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { categoryFindAll } from '../slices/category.slice';
import secureLocalStorage from 'react-secure-storage';

const Categories = () => {
    const data = useSelector((params) => params.categorySlice);
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        if (secureLocalStorage.getItem('loginStatus')) {
            allCategories();
        }
    }, []);

    function allCategories() {
        dispatch(categoryFindAll())
            .unwrap()
            .then((response) => {
                console.log('categoryFindAll:- ', response);
                setCategoryData(response.data);
            }).catch((err) => {
                console.log('err:- ', err);
            })
    }

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
            name: 'Category',
            selector: x => <strong>{x.category}</strong>,
        },
        {
            name: 'Image',
            selector: x => <img width={38} src={`http://localhost:5000/api/categories/img/${x.id}`} alt="" />,
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
                                data={categoryData}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <AddModal show={modalState} changeModalState={changeModalState} />
        </section>
    )
}

export default Categories
