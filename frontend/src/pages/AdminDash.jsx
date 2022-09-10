import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminBanner from '../components/admin/AdminBanner'
import PendingApps from '../components/admin/PendingApps'
import Header from '../components/Header/Header'
import { applicationContext, AppsContext, authContext } from '../context/context'

const AdminDash = ({ admin }) => {
    const navigate = useNavigate()
    const { adminExist } = useContext(authContext)
    // useContext(applicationContext)
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
                <PendingApps />
            </AppsContext>
        </div>
    )
}

export default AdminDash