import axios from 'axios';
import { useState, useContext, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addSlotSchema } from '../../validations/validation';
import { urlContext } from '../../context/context';
import { toast } from 'react-toastify';
import Spinner from '../spinner/Spinner';
import SlotModal from './SlotModal';
// import { useEffect } from 'react';



const Slots = () => {
  const initialState = {
    show: false,
    id: ''
  }
  const [modal, setModal] = useState(initialState)
  const [slotInput, setSlotInput] = useState(false)
  const [slots, setSlots] = useState([])
  const { API_URL } = useContext(urlContext)

  const initialValues = {
    date: new Date().toJSON().slice(0, 10),
    section: '',
  }

  //Fetching available Slots
  const fetchAvailSlots = async () => {
    try {
      const response = await axios.get(API_URL.adminFetchSlots, { withCredentials: true })

      response?.data?.length > 0 && setSlots(response.data)
    } catch (e) {
      toast.error(e.message)
    }
  }

  //Adding slot 
  const addSlot = async (values, submitProps) => {
    try {
      const response = await axios.post(API_URL.adminAddSlot, values, { withCredentials: true })
      if (response.data.slotAdded) {

        //updating slots array
        setSlots((prev => [...prev, response.data.newSlot]))

        submitProps.setSubmitting(false)
        setSlotInput(false)
        toast.success('slot added successfully')
      }
    } catch (err) {
      submitProps.setSubmitting(false)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchAvailSlots()
  }, [])

  return (
    <Container className='mt-3'>
      <div className='ms-auto m-3' >
        <Button onClick={() => { setSlotInput(!slotInput) }}>ADD SLOT</Button>
      </div>
      {
        slotInput &&
         <Row>
          <Formik
            initialValues={initialValues}
            validationSchema={addSlotSchema}
            onSubmit={addSlot}
          >
            {
              formik =>
                (formik.isSubmitting) ?
                  (< Spinner />) :
                  <Form>
                    <div className="col-md-4 p-1">

                      <Field type='date' name='date' className='form-control date mb-2' />
                      <ErrorMessage name='date' className='text-danger' component='div' />

                      <Field as='select' name='section' className='form-select mb-3'>

                        <option value=''>please choose a section</option>
                        <option value="section A">Section A</option>
                        <option value="section B">Section B</option>
                        <option value="section C">Section C</option>
                        <option value="section D">Section D</option>

                      </Field>
                      <ErrorMessage name='section' className='text-danger mb-3' component='div' />

                      <Button onClick={() => setSlotInput(false)} className='m-1' variant='danger'>Close</Button>
                      <Button type='submit' variant='success'>Create</Button>

                    </div>
                  </Form>
            }
          </Formik>
        </Row> 
      }

      {slots.length > 0 ? (slots.map(slot => 
       <button className='slot' key={slot._id}
          onClick={() => {
            setModal({
              show: true,
              id: slot._id
            })
          }}
        >{slot.section},{new Date(slot.slotDay).toDateString()} </button>
      )
      ) : ('')}
      
      <SlotModal modal={modal} setModal={setModal} setSlots={setSlots} />
    </Container>
  )
}

export default Slots