import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    return (

        <>
            <nav className="container">
                <input id="nav-toggle" type="checkbox" />
                <div className="logo">
                    Incub<strong style={{ color: '#153b66', fontWeight: "800" }}>ation</strong>
                </div>
                <ul className="links">
                    <li className="list">
                        <a href="">Home</a>
                        <div className="home_underline"></div>
                    </li>
                    <li className="list">
                        <a href="">Products</a>
                        <div className="home_underline"></div>
                    </li>
                    <li className="list">
                        <Link to='/login' >LOGIN</Link>
                        {/* <a >LOGIN</a> */}
                        <div className="home_underline"></div>
                    </li>
                    <button onClick={()=>navigate('/signup')} >SIGNUP</button>
                </ul>
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