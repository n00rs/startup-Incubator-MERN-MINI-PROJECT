import axios from "axios";


const API_URL = '/api/users/'
//user Signup 
export const userSignup = (userData) => {

    return new Promise((resolve, reject) => {
        console.log('hi from user');
        axios.post(API_URL + 'signup', userData).then(res => {
            console.log(res, 'res from signup')
                (res.status == 200) ? resolve() : reject({ message: 'failed to signup' })
        }).catch(err => {
            reject({ message: err.response.data })
            console.log(err, 'err from signup');

        })
    })
}

//user LOGIN

export const userLogin = (loginData) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + 'login', loginData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    })
}
