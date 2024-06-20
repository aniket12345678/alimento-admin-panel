import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

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

const data = [
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

const Categories = () => {
    return (
        <section className='section'>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <DataTable
                                columns={columns}
                                data={data}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default Categories
