import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { urlContext } from '../../context/context'

const Table = () => {
    const navigate = useNavigate()
    const { API_URL } = useContext(urlContext)
    const [application, setApplication] = useState(null)
    // console.log(application[1]);
    const appsData = async () => {
        try {
            let fetchApps = await axios.get(API_URL.userViewAllApps, { withCredentials: true })
            // console.log(fetchApps.data[0]);
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
                            <div className="panel p-1">
                                <div className="bio-graph-heading">
                                    Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
                                </div>
                                <div className="panel-body bio-graph-info p-5">
                                    {
                                        application ? application.map(app => {
                                            return <div className="row">
                                                <div className="bio-row">
                                                    <p className={app.status === 'pending' || app.status == 'rejected' ? 'text-danger' : 'text-success'}  ><span>Status </span>: {app.status}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p ><span>Applied At </span>: {new Date(app.createdAt).toDateString()}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Slot </span>: {app.slotId ? app.slotId : `application is pending`}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Slot No. </span>: {app.slotNumber ? app.slotNumber : `application is pending`}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Company</span>: {app.companyDetails.companyName}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Products </span>: {app.companyDetails.companyProducts}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Email </span>: {app.userDetails.email}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Mobile </span>:{app.userDetails.phone}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Incubation Type </span>: {app.companyDetails.incubationType}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>Company Logo </span>: <img src={`/images/companyLogo/${app.companyDetails.companyLogo}`} style={{ height: '30px' }} alt="helo" /> </p>
                                                </div>
                                            </div>

                                        }) : (
                                            <>
                                            <button onClick={()=>navigate('/new-application')}>Apply for Incubation </button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table> */}
        </div>
    )
}

export default Table

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