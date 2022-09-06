import * as yup from 'yup'


//signup validation
export const signupSchema = yup.object().shape({
    name: yup.string().required("please enter a name").matches('^[a-zA-Z ]+$', "please enter a valid name"),
    email: yup.string().required('please enter a valid email').email('invalid email address'),
    password: yup.string().required('enter a password ').min(6, 'your password is weak').max(20, 'only 20 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],`pasword doesn't match`)
})

//LOGIN validation

export const loginSchema = yup.object().shape({

    email: yup.string().email('please enter an valid email').required('please enter an email'),

    password: yup.string().min(6, 'your pssword is week').required('please enter your password').max(20, 'incorrect format')
})