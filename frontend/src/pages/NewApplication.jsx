import React, { useContext } from 'react'
import { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import ApplicationForm from '../components/applicationForm/ApplicationForm'
import Header from '../components/Header/Header'
import { authContext } from '../context/context'


export const NewApplication = () => {

const navigate = useNavigate()
  const {userExist} = useContext(authContext)
  useEffect(()=>{
    if(!userExist)
    navigate('/login')
  },[])
  return (
    <>
    <Header />
    <ApplicationForm />
    </>
  )
}
