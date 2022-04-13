import validator from 'validator';

const validEmail = (email) => {
     return validator.isEmail(email, { domain_specific_validation: true })
}

const validPassword = (password) => {
    return password.length >= 6;
}

export { validEmail, validPassword }