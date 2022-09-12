import axios from 'axios'
import React, { useContext,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema, } from '../../validations/validation'
import '../signup/Signup.scss'
import Spinner from '../spinner/Spinner'
import { authContext, urlContext } from '../../context/context'
import { Container } from 'react-bootstrap'

const LoginForm = ({ admin }) => {

    const navigate = useNavigate()
    const { setUserExist, setAdminExist } = useContext(authContext)
    const { API_URL } = useContext(urlContext)

    const initialState = {
        email: "",
        password: ""
    }
    const [userData, setUserData] = useState(initialState)

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
                
                const url = admin ? API_URL.adminLogin : API_URL.userLogin
                const loginApi = await axios.post(url, loginValidate)

                if (loginApi.data.login) {
                    setIsLoading(false)
                    setUserData(initialState)
                    admin ? navigate('/admin/dash') : navigate('/')
                    admin ? setAdminExist(true) : setUserExist(true)
                } else {
                    setIsLoading(false)
                    setUserData(initialState)
                    toast.error('opps something wrong please login again')
                }
            }
        } catch (err) {
            if (err.errors)
                err.errors.map(error => toast.error(error))
            if (err.name === 'AxiosError') {
                setIsLoading(false)
                toast.error(err.response.data)
            }
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container className='p-5 mt-5'>
        <div className="login-box mt-5 p-5">
                <div className="login-box-formbox">
                    {admin ? ('') : (

                        <div className="login-box-signup">
                            Don't have an account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    )}
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
                                {admin ? (
                                    <input type="submit" value='Login as admin' className="BTN" />
                                ) : (
                                    <input type="submit" value='Login to account' className="BTN" />
                                )}
                            </div>
                        </form>

                    </div>
                </div>
                {(!admin) ? (<div className="login-box-quotebox">
                    <div className="quote-container">
                        <div className="quote">Make a Dream.</div>
                        <div className="quote-small">
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                            repellendus cumque voluptatum animi, illum veniam?"
                        </div>
                    </div>
                </div>) : ('')}

            </div>
        </Container>

    )
}

export default LoginForm