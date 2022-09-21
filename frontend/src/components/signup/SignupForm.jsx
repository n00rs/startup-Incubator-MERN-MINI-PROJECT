// import { json } from 'body-parser'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { urlContext } from '../../context/context'
import { signupSchema } from '../../validations/validation'
import Spinner from '../spinner/Spinner'
import './Signup.scss'

const SignupForm = () => {
    const navigate = useNavigate()
    const { API_URL } = useContext(urlContext)
    const [isLoading, setIsLoading] = useState(false)
    const initialState = {
        name: '',
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, confirmPassword } = userData
    const getUserData = (e) => {
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
            const signupValidate = await signupSchema.validate(userData, { abortEarly: false })
            if (signupValidate) {
                setIsLoading(true)

                //sending API request to backend for signing up new user
                
                const signupApi = await axios.post(API_URL.userSignup, signupValidate)
                if (signupApi.data.signup) {
                    setIsLoading(false)
                    navigate('/login')
                } else {
                    setIsLoading(false)
                    setUserData(initialState)
                    toast.error('oppos server busy')
                }
            }
        } catch (err) {
            if (err.errors) err.errors.map(e => toast.error(e))
            if (err.name === 'AxiosError') {
                setIsLoading(false)
                toast.error(err.response.data)
            }
        }
    }

    if (isLoading) <Spinner />

    return (
        
        <Container className='p-5 mt-5'>
            <div className="login-box mt-5 p-5">
                <div className="login-box-formbox">
                    <div className="login-box-signup">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                    <div className="login-box-login">
                        <h1>Welcome </h1>
                        <p>

                        </p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"> Name</label>
                                <input type="text" name="name" className="input-email" onChange={getUserData} value={name} />
                            </div>
                            <div>
                                <label htmlFor="email"> E-Mail</label>
                                <input type="email" name="email" className="input-email" onChange={getUserData} value={email} />
                            </div>

                            <div>
                                <label htmlFor="password"> Password</label>
                                <input type="password" name="password" className="input-password" onChange={getUserData} value={password} />
                            </div>
                            <div>
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" name="confirmPassword" className="input-password" onChange={getUserData} value={confirmPassword} />
                            </div>
                            <div>
                                <input type="submit" value="signup to account" className="btn" />
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
        </Container>
    )
}

export default SignupForm