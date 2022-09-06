import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const authContext = createContext(null)
// import React from 'react'

const AuthContext = (props) => {
   
    const [cookies] = useCookies()
    const userExist = cookies.tokenExist ? true : false

    return (
        <authContext.Provider value={{ userExist }}>
            {props.children}
        </authContext.Provider >
    )
}

export default AuthContext