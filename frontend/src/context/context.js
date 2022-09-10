import { createContext, useState } from "react";
import { useCookies } from "react-cookie";


//Authentication Context

export const authContext = createContext(null)
// import React from 'react'

export const AuthContext = (props) => {

    const [cookies] = useCookies()
    const initialState = cookies.tokenExist ? true : false
    const adminAuth = cookies.adminExist ? true : false
    const [userExist, setUserExist] = useState(initialState)
    const [adminExist, setAdminExist] = useState(adminAuth)
    return (

        <authContext.Provider value={{ setUserExist, userExist, adminExist, setAdminExist }}>
            {props.children}
        </authContext.Provider >
    )
}



//URL Context
export const urlContext = createContext(null)


export const UrlContext = ({ children }) => {

    const API_URL = {
        userLogin: '/api/users/login',
        userSignup: '/api/users/signup',
        userLogout: '/api/users/logout',
        userData: '/api/users/user',
        userNewApplication: '/api/users/apply',
        userViewApplication: '/api/users/view-application/',
        userViewAllApps: '/api/users/view-all',
        adminLogin: '/api/admin/login',
        adminLogout: '/api/admin/logout',
        adminViewAllApps: '/api/admin/all-applications',
        adminUpdateStatus: '/api/admin/update-appstatus/'
    }
    return (
        <urlContext.Provider value={{ API_URL }}>
            {children}
        </urlContext.Provider>
    )
}



//All Application Context

export const ApplicationContext = createContext(null)


export const AppsContext = (props) => {

    const [applications, setApplications] = useState([])
    const [statusChng, setStatusChng] = useState(false)


    return <ApplicationContext.Provider value={{ applications, setApplications, setStatusChng, statusChng}}>
        {props.children}
    </ApplicationContext.Provider>
}