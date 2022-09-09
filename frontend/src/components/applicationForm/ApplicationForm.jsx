import React, { useContext, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "./TextField";
import { applicationSchema } from '../../validations/signupValid';
import { } from "../../index.css";
import axios from 'axios';
import { urlContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../spinner/Spinner';



const ApplicationForm = () => {
    // const [companyLogo, setCompanyLogo] = useState('')
    const { API_URL } = useContext(urlContext)

    const navigate = useNavigate()
    return (<>
        <section>

            <div className="">
                <img src="/images/IncubatorPage_banner_v2.gif" style={{ width: "100% " }} className="img-fluid" />
            </div>
            <div className="container  p-5">
                <p className="fs-6 text-black">Need to get in touch with us?  fill out the form. <br />
                    It will help us get your question to the right team and get back to you sooner. <br />
                    You can reach us via Live Chat Mon-Fri from 11am – 3pm PST (Pacific Standard Time) or call us toll free
                    Mon-Fri from 8am – 4pm PST at (949) 625-0412. For all After Sales/Warranty/Repairs call (949) 645-9500.</p>
            </div>
            <div className="container p-5 ">
                <Formik
                    initialValues={{
                        address: '',
                        companyName: '',
                        city: '',
                        name: '',
                        state: '',
                        email: '',
                        phone: "",
                        businessProposal: '', companyProducts: "",
                        marketSize: "",
                        revenueModel: '',
                        solvingProblem: '',
                        teamBackground: '',
                        uniqueSolution: '',
                        incubationType: '',
                        companyLogo:''

                    }}
                    validationSchema={applicationSchema}
                   
                    onSubmit={

                        async (values,onSubmitProps) => {

                            try {
                                const body = new FormData()
                                for (let value in values) {
                                    body.append(value, values[value]);
                                }
                                // body.append('companyLogo', companyLogo)
                                let submitForm = await axios.post(API_URL.userNewApplication, body, { withCredentials: true, 'Content-Type': `multipart/form-data` })
                                console.log(submitForm, 'form submiited');
                                if(submitForm.data.formSubmitted){
                                    navigate('/')
                                    onSubmitProps.setSubmitting(false)
                                }
                            } catch (error) {
                                console.log(error);
                                toast.error(error.message)
                                onSubmitProps.setSubmitting(false)

                            }
                        }
                    }
                >
                    {formik => (formik.isSubmitting)?(<Spinner />) : (
                    //    { :('') }
                        <Form onSubmit={(e)=>{
                            e.preventDefault()
                            formik.handleSubmit()
                        }} >
                            <div className="col-md-12">
                                <div className="row g-2 " >
                                    <TextField type="text" label='NAME' name='name' id="name" />
                                    <TextField type='text' label='ADDRESS' id="address" name='address' />
                                </div>
                                <div className="row g-2 " >
                                    <TextField type="text" label='CITY' name='city' id="city" />
                                    <TextField type='text' label='STATE' id="state" name='state' />
                                </div>
                                <div className="row g-2 " >
                                    <TextField type="email" label='EMAIL' name='email' id="email" />
                                    <TextField type='number' label='PHONE' id="phone" name='phone' />
                                </div>
                                <div className="row g-2 " >
                                    <TextField type="text" label='COMPANY NAME' name='companyName' id="companyName" />
                                    <div className="form-floating col-md">
                                        <div className="text-black">
                                            <input onChange={(e) => formik.setFieldValue('companyLogo',e.target.files[0])}
                                                type='file' className="form-control" id="companyLogo" name='companyLogo' hidden />
                                            <label htmlFor="companyLogo">
                                                
                                                <ErrorMessage name='companyLogo' className='text-danger' component='div' />
                                                <img src={formik.values.companyLogo ? URL.createObjectURL(formik.values.companyLogo) : "/images/companyLogoalt.png"} 
                                                style={{ widht: '50px', height: '50px' }} alt="" id='companyLogo' name='companyLogo' />
                                                Choose a logo
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <TextField id="teamBackground" name='teamBackground' label='Describe Your Team and Background' type='text' />
                                <TextField id="companyProducts" name='companyProducts' label=' Describe Your Company Products' type='text' />
                                <TextField label='Describe  The Problem You Are Solving' id="solvingProblem" name='solvingProblem' type='text' />
                                <TextField label='Describe Your Solution For The Above Problem' id="uniqueSolution" name='uniqueSolution' type='text' />

                                <TextField type='text' label='Explain Your Revenue Mode' id="revenueModel" name='revenueModel' />
                                <TextField label="What Is Your Product's Market Size ?" id="marketSize" name='marketSize' type='text' />
                                <TextField label='Explain Your Bussiness Proposal' type='text' id="businessProposal" name='businessProposal' />
                                <div className="col-md-6 mb-3" >
                                    <Field as='select' name='incubationType' className="form-select">
                                        <option value={null} >Choose Incubation type</option>

                                        <option value="Virtual Incubation" >Virtual Incubation</option>
                                        <option value="Physical Incubation">Physical Incubation</option>
                                    </Field>
                                    <ErrorMessage name='incubationType' className='text-danger' component='div' />
                                </div>
                            </div>
                            <button className="BTN" type="submit" id='submit' >
                                SUBMIT
                                <span style={{ marginLeft: "1em" }}></span>
                            </button>
                        </Form>
                    )


                    }
                </Formik>

            </div >
        </section >
    </>
    )

}

export default ApplicationForm