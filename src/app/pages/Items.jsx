import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Col, Row, Card, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import AddModal from '../components/items/AddModal';
import { useSelector } from 'react-redux';

const columns = [
    {
        name: 'id',
        selector: x => x.id,
    },
    {
        name: 'Title',
        selector: x => <strong>{x.title}</strong>,
    },
    {
        name: 'Year',
        selector: row => <strong>{row.year}</strong>,
    },
];

const tableData = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const Items = () => {
    const data = useSelector((params) => params.categorySlice);
    console.log('data:- ', data);
    
    const [modalState, setModalState] = useState(false);

    function changeModalState(params) {
        setModalState(params);
    }
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
                                data={tableData}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <AddModal show={modalState} changeModalState={changeModalState} />

        </section>
    )
}

export default Items
