import toast from 'react-hot-toast'

/** Password page*/
export async function userNameValidate(values) {
    const errors = userNameVerify({}, values)
    return errors
}

/** validate login page username */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)
    return errors
}
/** reset password validate */

export async function resetPasswordValidate(values) {
    const errors = passwordVerify({}, values)
    const errorsReset = resetPasswordVerify({},values)
    return {...errors,...errorsReset}
}

// password password
function resetPasswordVerify(error = {}, values) {
    if (!values.password === values.password_pwd) {
        return error.password = toast.error('Password not match...!')
    }
    return error
}

// password password
function passwordVerify(error = {}, values) {
    if (!values.password) {
        return error.password = toast.error('Password Required...!')
    }
    if (values.password.includes(" ")) {
        return error.password = toast.error('Invalid Password...!')
    }
    if (values.password.length < 4) return toast.error("Password much be more than 4 words...!")
    return error
}

// validate useName
function userNameVerify(error = {}, values) {
    if (!values.username) {
        return error.username = toast.error('username Required...!')
    }
    if (values.username.includes(" ")) {
        return error.username = toast.error('Invalid username...!')
    }
    return error
}