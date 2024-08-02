import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import { authSignin } from '../../slices/auth.slice';
import FormComponent from '../../components/FormComponent';
import { initialState } from '../../validation/initialState';
import { validateObj } from '../../validation/validationSchema';
import AuthLayout from './AuthLayout';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { signin } = useSelector((x) => x.authSlice);
    const { isloggedIn } = signin;

    const [signinMessage, setSigninMessage] = useState({
        color: '',
        message: ''
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: initialState.sigin,
        validationSchema: validateObj.signin,
        onSubmit: (values) => {
            values.user_role = 1;
            dispatch(authSignin(values)).unwrap().then((response) => {
                setSigninMessage({
                    color: [200, 600].includes(response.code) ? 'text-success' : 'text-danger',
                    message: response.message
                });
                if (response.code === 200) {
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                }
            }).catch((err) => {
                console.log('err:- ', err);
            })
        }
    });

    if (isloggedIn) {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <>
            <div className="pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Sign in</h5>
            </div>
            <Form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                <div className="col-12">
                    <FormComponent
                        type="email"
                        name="email"
                        placeholder='Email'
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                    />
                </div>
                <div className="col-12">

                    <FormComponent
                        type="password"
                        name="password"
                        placeholder='Password'
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                    />
                </div>
                <div className={`text-center ${signinMessage.color}`}>
                    <strong>
                        {signinMessage.message}
                    </strong>
                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-primary" type="submit">
                        Sign in
                    </button>
                </div>
                <div className="col-12 text-center">
                    <p className="small mb-0">Don't have an account?
                        <Link to={'/signup'}>Sign up</Link>
                    </p>
                </div>
            </Form>
        </>
    )
}

export default AuthLayout(Signin);
