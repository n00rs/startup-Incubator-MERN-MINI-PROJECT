import React, { useContext } from 'react'
import { Button, Modal } from "react-bootstrap";
import { ApplicationContext } from '../../context/context';
import TextRow from '../TextRow';

const ViewEachApp = ({ showModal, setShowModal, id }) => {

    const { applications } = useContext(ApplicationContext)
    const appData = applications.filter(app => app._id === id)
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
                        return <div className="panel p-1" key={app._id}>

                            <div className="panel-body bio-graph-info p-5">
                                <div className="row">
                                    <TextRow style={app.status === 'pending' || app.status === 'rejected' ? 'text-danger' : 'text-success'} title='Status' field={app.status} />
                                    {
                                        app.status === 'Slot Alloted' &&
                                        <>
                                            <TextRow title='Slot Id' field={app.slotId} />
                                            <TextRow title='Alloted Day' field={new Date(app.allotedDay).toDateString()} />
                                            <TextRow title='Section' field={app.slotSection} />
                                        </>
                                    }
                                    <TextRow title=' Logo' logo={app?.companyDetails?.companyLogo && app.companyDetails.companyLogo} />
                                    <TextRow title='Applied At' field={new Date(app.createdAt).toDateString()} />
                                    <TextRow title='Company' field={app?.companyDetails?.companyName && app.companyDetails.companyName} />
                                    <TextRow title='Products' field={app?.companyDetails?.companyProducts && app.companyDetails.companyProducts} />
                                    <TextRow title='Incubation Type' field={app?.companyDetails?.incubationType && app.companyDetails.incubationType} />
                                    <TextRow title=' Market Size' field={app?.companyDetails?.marketSize && app.companyDetails.marketSize} />
                                    <TextRow title='Revenue Model' field={app?.companyDetails?.revenueModel && app.companyDetails.revenueModel} />
                                    <TextRow title='Trying To Solving Problem' field={app?.companyDetails?.solvingProblem && app.companyDetails.solvingProblem} />
                                    <TextRow title='Solution for the Problem' field={app?.companyDetails?.uniqueSolution && app.companyDetails.uniqueSolution} />
                                    <TextRow title='Team Background' field={app?.companyDetails?.teamBackground && app.companyDetails.teamBackground} />
                                    <TextRow title='Applicant Name' field={app?.userDetails?.name && app.userDetails.name} />
                                    <TextRow title='Email' field={app?.userDetails?.email ? app.userDetails.email : ''} />
                                    <TextRow title='Mobile' field={app.userDetails.phone} />
                                    <TextRow title='Address' field={app?.userDetails?.address && app.userDetails.address} />
                                    <TextRow title='City' field={app?.userDetails?.city && app.userDetails.city} />
                                    <TextRow title='State' field={app?.userDetails?.state && app.userDetails.state} />
                                    <TextRow title='Bussiness Propasal' field={app?.companyDetails?.businessProposal && app.companyDetails.businessProposal} />
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