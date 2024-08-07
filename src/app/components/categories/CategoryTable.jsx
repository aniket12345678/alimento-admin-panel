import React from 'react'
import { Button } from 'react-bootstrap'

const CategoryTable = ({ updateRecord, deleteRecord }) => {
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
    ]
    return columns;
}

export default CategoryTable
