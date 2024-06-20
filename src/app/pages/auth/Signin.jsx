import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'

const Signin = () => {

    const validateFields = yup.object().shape({
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
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            console.log('values:- ', values);
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
                                            <h5 className="card-title text-center pb-0 fs-4">Sign in</h5>
                                        </div>
                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
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
                                        </form>
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

export default Signin
