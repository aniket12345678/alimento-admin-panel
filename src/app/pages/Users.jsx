import React, { useEffect } from 'react'
import { userFindAll } from '../slices/user.slice';
import secureLocalStorage from 'react-secure-storage';
import { useDispatch } from 'react-redux';

const Users = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (secureLocalStorage.getItem('loginStatus')) {
            allUsers();
        }
    }, []);

    function allUsers() {
        dispatch(userFindAll())
            .unwrap()
            .then((response) => {
                console.log('userFindAll:- ', response);
                // setCategoryData(response.data);
            }).catch((err) => {
                console.log('err:- ', err);
            })
    }
    return (
        <div>
            this is a users function
        </div>
    )
}

export default Users
