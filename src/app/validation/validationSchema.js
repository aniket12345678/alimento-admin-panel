import * as yup from 'yup'

const SinginValidateFields = yup.object().shape({
    email: yup.string()
        .email('Enter a valid email')
        .required('Enter email'),
    password: yup.string()
        .min(6, 'Less than 6 characters')
        .matches(/(?=.*[a-z])\w+/, "Password should contain at least one lowercase character")
        .matches(/(?=.*[A-Z])\w+/, "Password should contain at least one uppercase character")
        .matches(/\d/, "Password should contain at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
        .max(20, 'More than 20 characters')
        .required('Enter password'),
});

const SignupValidateFields = yup.object().shape({
    first_name: yup.string().required('Enter name'),
    last_name: yup.string().required('Enter name'),
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


export const validateObj = {
    signin: SinginValidateFields,
    singup: SignupValidateFields
}