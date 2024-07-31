const signinInitialState = {
    email: '',
    password: '',
}

const signupInitialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    conditions: false
}

export const initialState = {
    sigin: signinInitialState,
    signup: signupInitialState
}