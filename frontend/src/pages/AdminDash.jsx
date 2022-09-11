import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminBanner from '../components/admin/AdminBanner'
import Header from '../components/Header/Header'
import { ApplicationContext, AppsContext, authContext } from '../context/context'

const AdminDash = ({ admin }) => {
    const navigate = useNavigate()
    const { adminExist } = useContext(authContext)
    // const { tabs } = useContext(ApplicationContext)



    useEffect(() => {

        adminExist ? (

            navigate('/admin/dash')

        ) : navigate('/admin/login')
    }, [])

    return (
        <div>
            <AppsContext>
                <Header admin={admin} />
                <AdminBanner />
            </AppsContext>
        </div>
    )
}

export default AdminDash