// import { json } from 'body-parser'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { userSignup } from '../../apiService/apiService'
// import { Toast } from 'react-toastify/dist/components'
import { signupSchema } from '../../validations/signupValid'
import './Signup.scss'

const SignupForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: "",
        password: ""
    })

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
            signupSchema.validate(userData, { abortEarly: false }).then((res) => {
                // console.log(` ${res}result from form`);
                // console.log(res)
const {email, name, password} = res
                userSignup({email, name, password})
            }).catch(err => {
                console.log(err)
                err.errors.map(error => toast.error(error))
            })

            // const doValidate = signupSchema.validate(userData, { abortEarly: false })
            // if (doValidate.catch) {

            //     doValidate
            // }
            // console.log(`hi from cat`);
            // const doSigup = userSignup(userData)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="login-box">
                <div className="login-box-formbox">
                    <div className="login-box-signup">
                        Already have an account? <a href="#">Login</a>
                    </div>
                    <div className="login-box-login">
                        <h1>Welcome </h1>
                        <p>

                        </p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"> Name</label>
                                <input type="text" name="name" className="input-email" onChange={getUserData} />
                            </div>
                            <div>
                                <label htmlFor="email"> E-Mail</label>
                                <input type="email" name="email" className="input-email" onChange={getUserData} />
                            </div>

                            <div>
                                <label htmlFor="password"> Password</label>
                                <input type="password" name="password" className="input-password" onChange={getUserData} />
                            </div>
                            <div>
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" name="confirmPassword" className="input-password" onChange={getUserData} />
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
        </>
    )
}

export default SignupForm