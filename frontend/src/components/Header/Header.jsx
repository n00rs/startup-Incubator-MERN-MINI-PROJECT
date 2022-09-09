import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext, urlContext, } from '../../context/context'
import { toast } from 'react-toastify'
import axios from "axios";
import './Header.css'
import Spinner from '../spinner/Spinner';



const Header = ({ admin }) => {
    console.log(admin, 'header');
    const navigate = useNavigate()
    const { userExist, setUserExist, adminExist, setAdminExist } = useContext(authContext)
    const { API_URL } = useContext(urlContext)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState('')

    const fetchUser = async () => {
        try {

            let user = await axios.get(API_URL.userData, { withCredentials: true })
            console.log(user);
            if (user.data) {
                setUser({ name: user.data.name })
            }
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        fetchUser()
    }, [userExist])

    const url = admin ? API_URL.adminLogout : API_URL.userLogout
    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const logout = await axios.delete(url, { withCredentials: true })
            if (logout.data.logout) {
                setIsLoading(false)
                setUser('')
                admin ? navigate('/admin/login') : navigate('/login')
                admin ? setAdminExist(false) : setUserExist(false)

            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            toast.error(err.message)
            admin ? navigate('/admin/login') : navigate('/login')
        }
    }
    if (isLoading) return <Spinner />

    return (
        <>
            <nav className="containers">
                <input id="nav-toggle" type="checkbox" />
                <div className="logo">
                    {admin ? <>Admin<strong style={{ color: '#153b66', fontWeight: "800" }}>panel</strong> </> :
                        <> Incub<strong style={{ color: '#153b66', fontWeight: "800" }}>ation</strong></>}
                </div>

                {(user && !admin) ? (
                    <div className="logo">

                        welcome<strong style={{ color: '#153b66', fontWeight: "800" }}>{user.name}</strong>
                    </div>
                ) : ''}

                {
                    (userExist && !admin) ? (
                        <ul className="links">

                            <li className="list">
                                <Link to='/' >Home</Link>
                                <div className="home_underline"></div>
                            </li>
                             
                            <li className="list">
                                <Link to='/view-application' >View Application</Link>
                                <div className="home_underline"></div>
                            </li>

                            <li className="list">
                                <Link to='/new-application' >New Application</Link>
                                <div className="home_underline"></div>
                            </li>

                            <button onClick={handleLogout} >LOGOUT</button>
                        </ul>
                    ) : (adminExist && admin) ? (
                        <ul className="links">
                            {/* 
                        <li className="list">
                            <a href="">Home</a>
                            <div className="home_underline"></div>
                        </li>
                        <li className="list">
                            <Link to='/new-application' >New Application</Link>
                            <div className="home_underline"></div>
                        </li> */}

                            <button onClick={handleLogout} >LOGOUT</button>
                        </ul>
                    ) :
                        (admin) ? ('') :



                            (
                                <ul className="links">

                                    <li className="list">
                                        <Link to='/login' >LOGIN</Link>
                                        <div className="home_underline"></div>
                                    </li>
                                    <button onClick={() => navigate('/signup')} >SIGNUP</button>
                                </ul>
                            )
                }
                <label htmlFor="nav-toggle" className="icon-burger">
                    <div className="line">LOGIN</div>
                    <div className="line">SIGNUP</div>
                    <div className="line"></div>
                </label>
            </nav>
        </>
    )
}

export default Header