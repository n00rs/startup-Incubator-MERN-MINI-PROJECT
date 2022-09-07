import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import { authContext } from '../context/context'

const AdminDash = ({ admin }) => {
    const navigate = useNavigate()
    const { adminExist } = useContext(authContext)
    useEffect(() => {
        adminExist ? navigate('/admin/dash') : navigate('/admin/login')
    }, [])

    return (
        <div>
            <Header admin={admin} />
            <h1>
                deisgn AdminDash </h1>
            {/* </div> */}
        </div>
    )
}

export default AdminDash