import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

//CONTEXT TO AUTHUSER AND ADMIN

export const authContext = createContext('')

export const AuthContext = (props) => {
    //GETTING DATA FROM COOKIES

    const [cookies] = useCookies()
    const initialState = cookies.tokenExist ? true : false
    const adminAuth = cookies.adminExist ? true : false

    //SETTING STATES FOR USER AND ADMIN

    const [userExist, setUserExist] = useState(initialState)
    const [adminExist, setAdminExist] = useState(adminAuth)

    //WRAPPING THE CONTEXT IN CHILD OF PROPERTIES (IF APP IS WRAPED IN  THEN APP BECOME THE CHILD )
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
        userViewAllApps: '/api/users/view-all',
        adminLogin: '/api/admin/login',
        adminLogout: '/api/admin/logout',
        adminViewAllApps: '/api/admin/all-applications',
        adminUpdateStatus: '/api/admin/update-appstatus/',
        adminFetchSlots: '/api/admin/slots-available',
        adminAddSlot: '/api/admin/addSlot',
        adminAllotSlot: '/api/admin/allot-slot'
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
    const [tabs, setTabs] = useState('pending')

    return <ApplicationContext.Provider value={{ applications, setApplications, setStatusChng, statusChng, tabs, setTabs }}>
        {props.children}
    </ApplicationContext.Provider>
}

// export const headerNotify = createContext('')