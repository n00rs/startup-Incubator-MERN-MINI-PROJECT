import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginSchema, signupSchema } from '../../validations/signupValid'
import '../signup/Signup.scss'

const LoginForm = () => {


    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const getValues = (e) => {
        setUserData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const loginValidate = loginSchema.validate(userData, { abortEarly: false })
            .then((res) => { })
            .catch(err => {
                err.errors.map(error => toast.error(error))
            })
    }

    return (
        <>
            <div class="login-box">
                <div class="login-box-formbox">
                    <div class="login-box-signup">
                        Don't have an account? <a href="#">Sign Up</a>
                    </div>
                    <div class="login-box-login">
                        <h1>Welcome </h1>
                        <p>

                        </p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label for="email"> E-Mail</label>
                                <input type="email" name="email" class="input-email" onChange={getValues} />
                            </div>
                            <div>
                                <label for="password"> Password</label>
                                <input type="password" name="password" class="input-password" onChange={getValues} />
                            </div>
                            <div>
                                <input type="submit" value="Login to account" class="btn" />
                            </div>
                        </form>

                    </div>
                </div>
                <div class="login-box-quotebox">
                    <div class="quote-container">
                        <div class="quote">Make a Dream.</div>
                        <div class="quote-small">
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