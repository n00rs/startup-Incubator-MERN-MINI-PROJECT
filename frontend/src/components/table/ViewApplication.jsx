import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { urlContext } from '../../context/context'
import TextRow from '../TextRow'

const ViewApplication = () => {
    const navigate = useNavigate()
    const { API_URL } = useContext(urlContext)
    const [application, setApplication] = useState(null)

    const appsData = async () => {
        try {
            let fetchApps = await axios.get(API_URL.userViewAllApps, { withCredentials: true })

            if (fetchApps.data[0])
                setApplication(fetchApps.data)
            else
                throw new Error('no application found ')
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }
    useEffect(() => {
        appsData()
    }, [])
    return (
        <div className='align-items-center'>
            <img src="/images/viewAppBanner.jpg" alt="" className='img-fluid ' />
            <div className="container mt-5">

                <div className="col md-12 justify-content-center">
                    <div className="row">
                        <div className="card">
                            {
                                application ? application.map(app => {
                                    return <div className="panel p-1">
                                        <div className="bio-graph-heading">
                                            Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
                                        </div>
                                        <div className="panel-body bio-graph-info p-5">
                                            <div className="row">
                                                <TextRow style={app.status === 'pending' || app.status == 'rejected' ? 'text-danger' : 'text-success'} title='Status' field={app.status} />
                                                <TextRow title='Company Logo' logo={app.companyDetails.companyLogo} />
                                                <TextRow title='Applied At' field={new Date(app.createdAt).toDateString()} />
                                                <TextRow title='Slot' field={app.slotId ? app.slotId : `application is pending`} />
                                                <TextRow title='Slot No.' field={app.slotNumber ? app.slotNumber : `no application is pending`} />
                                                <TextRow title='Company' field={app.companyDetails.companyName} />
                                                <TextRow title='Products' field={app.companyDetails.companyProducts} />
                                                <TextRow title='Email' field={app?.userDetails?.email ? app.userDetails.email : ''} />
                                                <TextRow title='Mobile' field={app.userDetails.phone} />
                                                <TextRow title='Incubation Type' field={app.companyDetails.incubationType} />
                                            </div>

                                        </div>
                                    </div>
                                }) : (
                                    <>
                                        <button onClick={() => navigate('/new-application')}>Apply for Incubation </button>
                                    </>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default ViewApplication

// [{companyDetails:{
//     businessProposal: "testapplication",
//     companyName: "testapplication",
//     companyProducts: "testapplication",
//     incubationType: "Virtual Incubation",
//     marketSize: "testapplication",
//     revenueModel: "testapplication",
//     solvingProblem: "testapplication",
//     teamBackground: "testapplication",
//     uniqueSolution: "testapplication",
//       },
//     // [[Prototype]]: Object
//     createdAt: "2022-09-08T16:05:27.778Z",
//     slotId: null,
//     slotNumber: null,
//     status: "pending",
//     updatedAt: "2022-09-08T16:05:27.778Z",
//     userDetails:{
//     address: "testapplication",
//     city: "testapplication",
//     email: "testapplication@123.mom",
//     name: "testapplication",
//     phone: "1234567890",
//     state: "testapplication",
//     userId: "631708d2c3151715e6620b59",
//     // [[Prototype]]: Object
//     },
//     // __v: 0
//     _id: "631a12c713d986786734d1a1"
//     }]