import React, { useContext } from 'react'
import { Button, Modal } from "react-bootstrap";
import { ApplicationContext } from '../../context/context';
import TextRow from '../TextRow';
const ViewEachApp = ({ showModal, setShowModal, id }) => {

    const { applications } = useContext(ApplicationContext)
    const appData = applications.filter(app => app._id == id)
    // console.log(appData[0].userDetails, 'from modal');
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop='static' centered={true} scrollable={true} size='lg'>

            <Modal.Header closeButton>
                <Modal.Title>
                    Application Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    appData ? appData.map(app => {
                        return <div className="panel p-1">

                            <div className="panel-body bio-graph-info p-5">
                                <div className="row">
                                    <TextRow style={app.status === 'pending' || app.status == 'rejected' ? 'text-danger' : 'text-success'} title='Status' field={app.status} />
                                    <TextRow title=' Logo' logo={app?.companyDetails?.companyLogo && app.companyDetails.companyLogo} />
                                    <TextRow title='Applied At' field={new Date(app.createdAt).toDateString()} />
                                    <TextRow title='Company' field= { app?.companyDetails?.companyName && app.companyDetails.companyName } />
                                    <TextRow title='Products' field={ app?.companyDetails?.companyProducts && app.companyDetails.companyProducts } />
                                    <TextRow title='Incubation Type' field={ app?.companyDetails?.incubationType && app.companyDetails.incubationType} />
                                    <TextRow title=' Market Size' field={ app?.companyDetails?.marketSize && app.companyDetails.marketSize} />
                                    <TextRow title='Revenue Model' field={ app?.companyDetails?.revenueModel && app.companyDetails.revenueModel} />
                                    <TextRow title='Trying To Solving Problem' field={ app?.companyDetails?.solvingProblem && app.companyDetails.solvingProblem} />
                                    <TextRow title='Solution for the Problem' field={ app?.companyDetails?.uniqueSolution && app.companyDetails.uniqueSolution} />
                                    <TextRow title='Team Background' field={ app?.companyDetails?.teamBackground && app.companyDetails.teamBackground} />
                                    <TextRow title='Applicant Name' field={ app?.userDetails?.name && app.userDetails.name} />
                                    <TextRow title='Email' field={ app?.userDetails?.email ? app.userDetails.email : ''} />
                                    <TextRow title='Mobile' field={ app.userDetails.phone} />
                                    <TextRow title='Address' field = { app?.userDetails?.address && app.userDetails.address} />
                                    <TextRow title='City' field={ app?.userDetails?.city && app.userDetails.city} />
                                    <TextRow title='State' field={ app?.userDetails?.state && app.userDetails.state} />
                                    <TextRow title= 'Bussiness Propasal' field={app?.companyDetails?.businessProposal && app.companyDetails.businessProposal} />
                                    {/* <TextRow title= ''/> */}
                                    {/* <TextRow title='Slot' field={app.slotId ? app.slotId : `application is pending`} />
                                    <TextRow title='Slot No.' field={app.slotNumber ? app.slotNumber : `no application is pending`} /> */}
                                </div>
                            </div>
                        </div>
                    }) : ''
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal(false)}>
                    close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default ViewEachApp

// [{companyDetails:{
//     businessProposal: "testapplication",
//     solvingProblem: "testapplication",
//     teamBackground: "testapplication",
//     uniqueSolution: "testapplication",
//     marketSize: "testapplication",
//     revenueModel: "testapplication",
//     companyName: "testapplication",
//     companyProducts: "testapplication",
//     incubationType: "Virtual Incubation",
//       },
//     userDetails:{
    //     address: "testapplication",
    //     city: "testapplication",
    //     email: "testapplication@123.mom",
    //     name: "testapplication",
    //     phone: "1234567890",
    //     state: "testapplication",
    //     userId: "631708d2c3151715e6620b59",
    
    //     },

    //     createdAt: "2022-09-08T16:05:27.778Z",
    //     slotId: null,
    //     slotNumber: null,
    //     status: "pending",
    //     updatedAt: "2022-09-08T16:05:27.778Z",
//     // __v: 0
//     _id: "631a12c713d986786734d1a1"
//     }]