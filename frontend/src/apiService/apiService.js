import axios from "axios";

const API_URL = '/api/users/'

//user Signup 

export const userSignup = (userData) => {
    return new Promise((resolve, reject) => {
        console.log('hi from user');
        axios.post(API_URL + 'signup',userData).then(res => {
            console.log(res, 'res from signup')
        }).catch(err => {
            console.log(err, 'err from signup');
        })
    })
}


