import React from 'react'

const FormComponent = (props) => {
    const { type, name, placeholder, values, errors, handleChange } = props;
    return (
        <React.Fragment>
            <input
                type={type}
                name={name}
                className="form-control"
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
            />
            {errors[name] &&
                <div className="formik-error">
                    {errors[name]}
                </div>
            }

        </React.Fragment>
    )
}

export default FormComponent
