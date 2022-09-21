import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm'
import { authContext } from '../context/context';
import Header from "../components/Header/Header";


const Login = ({ admin }) => {
  const navigate = useNavigate()
  const { userExist, adminExist } = useContext(authContext)
 
  useEffect(() => {
    if (admin)
      adminExist ? navigate('/admin/dash') : navigate('/admin/login')            //checking if props contain admin then check for admin  in cookie 
    else
      userExist ? navigate('/') : navigate('/login')
  }, [])

  return (
    <>
      <Header admin={admin} />
      <LoginForm admin={admin} />

    </>
  )
}

export default Login