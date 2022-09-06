import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema, } from '../../validations/signupValid'
import '../signup/Signup.scss'
import Spinner from '../spinner/Spinner'
import { Cookies, useCookies } from "react-cookie";
import { authContext } from '../../context/context'

const API_URL = '/api/users/'

const LoginForm = () => {
    const navigate = useNavigate()

    const { userExist } = useContext(authContext)
    console.log(userExist);
    // const [cookies] = useCookies([])
    useEffect(() => {
        userExist ? navigate('/') : navigate('/login')

    }, [])


    const initialState = {
        email: "",
        password: ""
    }
    const [userData, setUserData] = useState(initialState)
    // const [is]
    const [isLoading, setIsLoading] = useState(false)

    const { email, password } = userData

    const getValues = (e) => {
        setUserData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const loginValidate = await loginSchema.validate(userData, { abortEarly: false })

            if (loginValidate) {
                setIsLoading(true)
                const loginApi = await axios.post('/api/users/login', loginValidate)

                if (loginApi.data.login) {
                    setIsLoading(false)
                    navigate('/')
                    setUserData(initialState)
                } else {
                    setIsLoading(false)
                    setUserData(initialState)
                    toast.error('opps something wrong please login again')
                }
            }
        } catch (err) {
            console.log(err, 'error loginvalid');
            if (err.errors)
                err.errors.map(error => toast.error(error))
            if (err.name == 'AxiosError') {
                setIsLoading(false)
                toast.error(err.response.data)
            }
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="login-box">
                <div className="login-box-formbox">
                    <div className="login-box-signup">
                        Don't have an account? <Link to='/signup'>Sign Up</Link>
                    </div>
                    <div className="login-box-login">
                        <h1>Welcome </h1>
                        <p>

                        </p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"> E-Mail</label>
                                <input type="email" name="email" className="input-email" onChange={getValues} value={email} />
                            </div>
                            <div>
                                <label htmlFor="password"> Password</label>
                                <input type="password" name="password" className="input-password" onChange={getValues} value={password} />
                            </div>
                            <div>
                                <input type="submit" value="Login to account" className="btn" />
                            </div>
                        </form>

                    </div>
                </div>
                <div className="login-box-quotebox">
                    <div className="quote-container">
                        <div className="quote">Make a Dream.</div>
                        <div className="quote-small">
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                            repellendus cumque voluptatum animi, illum veniam?"
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginForm