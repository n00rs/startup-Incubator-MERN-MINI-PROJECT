import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext } from 'react';
import { Button, Container, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { ApplicationContext, urlContext } from '../../context/context';
import { allotSlotSchema } from '../../validations/validation';
import Spinner from '../spinner/Spinner'


const SlotModal = ({ modal, setModal, setSlots }) => {

    const { applications, setStatusChng } = useContext(ApplicationContext)
    const { API_URL } = useContext(urlContext)

    //getting all the approved apps from context
    const approvedApps = applications?.filter(app => app.status === 'approved')

    const handleSubmit = async (values, submitProps) => {
        try {
            const data = {
                ...values,
                slotId: modal.id
            }
            const response = await axios.post(API_URL.adminAllotSlot, data, { withCredentials: true })
            
            if (response.data.slotAlloted) {
                setSlots((prev) => prev.filter(slot => slot._id !== modal.id))
                setStatusChng(prev => !prev)
                toast.success('slot alloted successfully')
                submitProps.setSubmitting(false)
                setModal(!modal.show)
            }
        } catch (e) {
            setModal(!modal.show)
            submitProps.setSubmitting(false)
            toast.error(e.message)
        }
    }



    return <>
        <Modal show={modal.show} backdrop='static' centered='true' onHide={() => setModal(!modal.show)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Approvered Startup's
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='m-3'>

                    <Formik
                        initialValues={{ applicationId: '' }}
                        validationSchema={allotSlotSchema}
                        onSubmit={handleSubmit}
                    >
                        {formik => formik.isSubmitting ? <Spinner /> :
                            <Form>
                                <ErrorMessage name='applicationId' className='text-danger' component='div' />

                                <Field as='select' name='applicationId' className="form-select" >
                                    <option value="">click to select</option>
                                    {approvedApps.map(app =>
                                        <option key={app._id} value={app._id}>{app?.companyDetails?.companyName}</option>
                                    )}
                                </Field>
                                <Modal.Footer>
                                    <Button onClick={() => setModal(!modal.show)}>Close</Button>
                                    <Button type='submit'>Allot</Button>
                                </Modal.Footer>
                            </Form>}
                    </Formik>
                </Container>
            </Modal.Body>
        </Modal>
    </>
}

export default SlotModal