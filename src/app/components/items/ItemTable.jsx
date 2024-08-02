import React from 'react'
import { Button } from 'react-bootstrap';

const ItemTable = ({ updateRecord, deleteRecord }) => {
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
    return columns;
}

export default ItemTable
