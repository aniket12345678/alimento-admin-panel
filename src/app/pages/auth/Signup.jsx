import { useFormik } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { authSignup } from '../../slices/auth.slice'
import { useDispatch } from 'react-redux'

const Signup = () => {
    const dispatch = useDispatch();
    const validateFields = yup.object().shape({
        name: yup.string().required('Enter name'),
        email: yup.string()
            .email('Enter a valid email')
            .required('Enter email'),
        password: yup.string()
            .min(6, 'Less than 6 characters')
            .matches(/(?=.*[a-z])\w+/, "Password ahould contain at least one lowercase character")
            .matches(/(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
            .max(20, 'More than 20 characters')
            .required('Enter password'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password'),
        conditions: yup.boolean().oneOf([true], 'You must agree before submitting')
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            conditions: false
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            console.log('values:- ', values);
            values.user_role = 1;
            dispatch(authSignup(values)).unwrap().then(() => {
                
            }).catch(() => {
                
            })
        }
    });

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src="assets/img/logo.png" alt="" />
                                        <span className="d-none d-lg-block">NiceAdmin</span>
                                    </a>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Sign up</h5>
                                        </div>
                                        <Form className="row g-3" onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder='Name'
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name &&
                                                    <div className="formik-error">
                                                        {errors.name}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder='Email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email &&
                                                    <div className="formik-error">
                                                        {errors.email}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    maxLength={20}
                                                    placeholder='Password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password &&
                                                    <div className="formik-error">
                                                        {errors.password}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <input
                                                    type="password"
                                                    name="confirm_password"
                                                    className="form-control"
                                                    placeholder='Confirm password'
                                                    value={values.confirm_password}
                                                    onChange={handleChange}
                                                />
                                                {errors.confirm_password &&
                                                    <div className="formik-error">
                                                        {errors.confirm_password}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        name="conditions"
                                                        type="checkbox"
                                                        id='acceptTerms'
                                                        onChange={handleChange}
                                                        value={values.conditions}
                                                    />
                                                    <label className="form-check-label" htmlFor="acceptTerms">
                                                        I agree and accept the terms and conditions
                                                    </label>
                                                    {errors.conditions &&
                                                        <div className="formik-error">
                                                            {errors.conditions}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button className="btn btn-primary" type="submit">
                                                    Create Account
                                                </button>
                                            </div>
                                            <div className="col-12 text-center">
                                                <p className="small mb-0">Already have an account?
                                                    <Link to={'/'}>Log in</Link>
                                                </p>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Signup
