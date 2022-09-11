import * as yup from 'yup'


//signup validation
export const signupSchema = yup.object().shape({
    name: yup.string().required("please enter a name").matches('^[a-zA-Z ]+$', "please enter a valid name"),
    email: yup.string().required('please enter a valid email').email('invalid email address'),
    password: yup.string().required('enter a password ').min(6, 'your password is weak').max(20, 'only 20 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], `pasword doesn't match`)
})

//LOGIN validation

export const loginSchema = yup.object().shape({

    email: yup.string().email('please enter an valid email').required('please enter an email'),

    password: yup.string().min(6, 'your pssword is week').required('please enter your password').max(20, 'incorrect format')
})

//user ApplyForm validationd

export const applicationSchema = yup.object().shape({
    address: yup.string()
        .required('please enter your address')
        .min(5, 'please enter a valid address')
        .max(30, 'not more than 30 chahraters'),

    companyName: yup.string()
        .required('please enter your company name')
        .min(2, 'please enter a valid name more than 2 characters')
        .max(20, 'please enter a valid name below 20 characters or short form '),

    city: yup.string()
        .required('please enter city details')
        .min(2, 'please enter a valid city name more than 2 charaters')
        .max(20, 'please enter a valid city name '),

    name: yup.string()
        .required("please enter a name")
        .matches('^[a-zA-Z ]+$', "please enter a valid name"),

    state: yup.string()
        .required('please enter state')
        .min(2, 'enter a valid state more th 2 characters')
        .max(20, 'enter a valid state below 20 characters'),

    email: yup.string().required('enter your email').email('enter a valid email'),
    phone: yup.string().required('please enter your phone numer').matches('[0-9]{10}', 'please enter a 10 didgit number'),
    // .min(10, 'please enter a valid number without country code').max(10, 'please enter a valid number without country code'),

    businessProposal: yup.string().required('please enter your bussiness propsal').min(10, 'atleast 10 characters'),
    companyProducts: yup.string().required('please enter your company Products').min(10, 'atleast 10 characters'),
    marketSize: yup.string().required('please enter your product Market size').min(10, 'atleast 10 characters'),
    revenueModel: yup.string().required('please enter your Revenue Model').min(10, 'atleast 10 characters'),
    solvingProblem: yup.string().required('please enter the what problem your silving').min(10, 'atleast 10 characters'),
    teamBackground: yup.string().required('whats your team or company background').min(10, 'atleast 10 characters'),
    uniqueSolution: yup.string().required('please enter your solution to problem').min(10, 'atleast 10 characters'),
    incubationType: yup.string().required('please select yout incubation type'),
    companyLogo: yup.mixed().required('please select an image')
})

//slot adding validation
const oneDay = 60 * 60 * 24 * 1000

export const addSlotSchema = yup.object().shape({
    date: yup.date().min(new Date(), 'please choose a future date').max(new Date(Date.now() +7*oneDay), 'please choose a date b/w 7 days'),
    section: yup.string().required('please select a section Slot')
})


//slot aLloting validation

export const allotSlotSchema = yup.object().shape({
    applicationId : yup.string().required('please select -_-')
})