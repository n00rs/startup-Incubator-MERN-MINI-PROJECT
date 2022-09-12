import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { urlContext } from '../../context/context'
import TextRow from '../TextRow'
import Banner from '../Banner'

const ViewApplication = () => {
    const navigate = useNavigate()
    const { API_URL } = useContext(urlContext)
    const [application, setApplication] = useState(null)

    const appsData = async () => {
        try {
            let fetchApps = await axios.get(API_URL.userViewAllApps, { withCredentials: true })

            if (fetchApps.data[0])
                setApplication(fetchApps.data)
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(() => {
        appsData()
    }, [])
    return (<>
        <Banner imgSrc={"/images/viewAppBanner.jpg"} />
        <div className="container mt-5">

            <div className="col md-12 justify-content-center">
                <div className="row">
                    <div className="card">
                        {
                            application ? application.map(app => {
                                return <div className="panel p-1" key={app._id}>
                                    <div className="bio-graph-heading">
                                        Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.
                                    </div>
                                    <div className="panel-body bio-graph-info p-5">
                                        <div className="row">
                                            <TextRow style={app.status === 'pending' || app.status === 'rejected' ? 'text-danger' : 'text-success'} title='Status' field={app.status} />
                                            <TextRow title='Company Logo' logo={app.companyDetails.companyLogo} />
                                            <TextRow title='Applied At' field={new Date(app.createdAt).toDateString()} />
                                            <TextRow title='Alloted Day' field={app.allotedDay ? new Date(app.allotedDay).toDateString() : `application is pending`} />
                                            <TextRow title='Slot' field={app.slotId ? app.slotId : `application is pending`} />
                                            <TextRow title='Slot No.' field={app.slotSection ? app.slotSection : `no application is pending`} />
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
    </>
    )
}

export default ViewApplication
