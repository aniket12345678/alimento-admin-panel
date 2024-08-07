import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import { userFindAll } from '../slices/user.slice';

const Users = () => {
    const dispatch = useDispatch();
    const { findAll } = useSelector((x) => x.userSlice);

    function allUsers() {
        dispatch(userFindAll())
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
                {/* <div>
                    <Button variant='primary' onClick={() => updateRecord(x.id)}>Update</Button>
                </div>
                <div>
                    <Button variant='danger' onClick={() => deleteRecord(x.id)}>Delete</Button>
                </div> */}
            </div>,
        },
    ];

    return (
        <div>
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
        </div>
    )
}

export default Users
