import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext, urlContext, } from '../../context/context'
import { toast } from 'react-toastify'
import axios from "axios";
import './Header.css'
import Spinner from '../spinner/Spinner';
import { Badge } from 'react-bootstrap';



const Header = ({ admin }) => {
    const navigate = useNavigate()
    const { userExist, setUserExist, adminExist, setAdminExist } = useContext(authContext)
    const { API_URL } = useContext(urlContext)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState('')

    const fetchUser = async () => {
        try {
            let user = await axios.get(API_URL.userData, { withCredentials: true })
            if (user.data) {
                setUser({ name: user.data.name })
            }
        } catch (err) {
            console.log(err.message, 'in header.jsx');
        }
    }

    useEffect(() => {
        userExist && !admin && fetchUser()
    }, [userExist])

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const url = admin ? API_URL.adminLogout : API_URL.userLogout
            const logout = await axios.delete(url, { withCredentials: true })

            if (logout.data.logout) {
                setIsLoading(false)
                setUser('')
                admin ? navigate('/admin/login') : navigate('/login')
                admin ? setAdminExist(false) : setUserExist(false) 
            }
        } catch (err) {
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

                        welcome<strong style={{ color: '#153b66', fontWeight: "800" }}> {user.name}</strong>
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
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16" aria-label='20' >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                                <Badge bg='warning' text='dark' >
                            </Badge>
                             </li>
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