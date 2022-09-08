import React, { useState } from 'react'
// import {  } from "formik";

const TpplicationForm = () => {

    const [formData, setFormData] = useState()
    const [companyLogo, setCompanyLogo] = useState('')
    const getValues = (e) => (
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    )

    console.log(formData)
    return (<>
        <section>

            <div className="">
                <img src="/images/IncubatorPage_banner_v2.gif" style={{ width: "100% " }} className="img-fluid" />
            </div>
            <div className="container  p-5">
                <p className="fs-6 text-black">Need to get in touch with us? Choose the reason below and fill out the form. <br />
                    It will help us get your question to the right team and get back to you sooner. <br />
                    You can reach us via Live Chat Mon-Fri from 11am – 3pm PST (Pacific Standard Time) or call us toll free
                    Mon-Fri from 8am – 4pm PST at (949) 625-0412. For all After Sales/Warranty/Repairs call (949) 645-9500.</p>
            </div>
            <div className="container p-5 ">

                <form id="contactus-form">
                    <div className="col-md-12">
                        <div className="row g-2 mb-3" >
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type="text" className="form-control" name='name' id="name" />
                                    <label htmlFor="name">NAME</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type='text' className="form-control" id="address" name='address' />
                                    <label htmlFor="address">ADDRESS</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type="text" className="form-control" name='city' id="city" />
                                    <label htmlFor="city">CITY</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type='text' className="form-control" id="state" name='state' />
                                    <label htmlFor="state">STATE</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type="email" className="form-control" name='email' id="email" />
                                    <label htmlFor="email">EMAIL</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type='number' className="form-control" id="phone" name='phone' />
                                    <label htmlFor="phone">PHONE</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="col-md">
                                <div className="form-floating text-black">
                                    <input onChange={getValues} type="text" className="form-control" name='companyName' id="name" />
                                    <label htmlFor="companyName">COMPANY NAME</label>
                                </div>
                            </div>
                            <div className="form-floating col-md">
                                <div className="text-black">
                                    <input onChange={(e)=>{
                                        setCompanyLogo(e.target.files[0]);
                                    }} type='file' className="form-control" id="companyLogo" name='companyLogo' hidden />
                                    <label htmlFor="companyLogo">
                                        <img src={companyLogo ? URL.createObjectURL(companyLogo) :"/images/companyLogoalt.png"} style={{ widht: '50px', height: '50px' }} alt="" id='complogo' name='complogo' />
                                        Choose a logo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="mb-3">
                            <label htmlFor="teamBackground" className="form-label text-primary  ">Describe Your Team and Background</label>
                            <textarea onChange={getValues} className="form-control" id="teamBackground" name='teamBackground' rows="3" placeholder='Describe Your Team and Background'></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companyProducts" className="form-label text-primary  "> Describe Your Company Products</label>
                            <textarea onChange={getValues} className="form-control" id="companyProducts" name='companyProducts' rows="3" placeholder='Describe Your Company Products' ></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="solvingProblem" className="form-label text-primary  ">Describe  The Problem You Are Solving</label>
                            <textarea onChange={getValues} className="form-control" id="solvingProblem" name='solvingProblem' rows="3" placeholder='Describe  The Problem You Are Solving' ></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uniqueSolution" className="form-label text-primary  ">Describe Your Solution For The Above Problem</label>
                            <textarea onChange={getValues} className="form-control" id="uniqueSolution" name='uniqueSolution' rows="3" placeholder='Describe Your Solution For The Above Problem'></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="revenueModel" className="form-label text-primary  ">Explain Your Revenue Model</label>
                            <textarea onChange={getValues} className="form-control" id="revenueModel" name='revenueModel' rows="3" placeholder='Explain Your Revenue Model'></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="marketSize" className="form-label text-primary  ">What Is Your Product's Market Size ? </label>
                            <textarea onChange={getValues} className="form-control" id="marketSize" name='marketSize' rows="3" placeholder="Whay Is Your Product's Market Size ?"></textarea >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="businessProposal" className="form-label text-primary ">Explain Your Bussiness Proposal</label>
                            <textarea onChange={getValues} className="form-control" id="businessProposal" name='businessProposal' rows="3" placeholder='Describe Your Team and Background'></textarea >
                        </div>
                        <div className="col-md-6 mb-3" >

                            <select className="form-select" aria-label="Incubation Type" name='incubationType' onChange={getValues}>
                                <option value={null} selected>Choose Incubation type</option>
                                <option  value="Physical Incubation">Physical Incubation</option>
                                <option  value="Virtual Incubation" >Virtual Incubation</option>
                                {/* <option value="3">Three</option> */}
                            </select>
                        </div>

                        <button className="btn active" type="submit">
                            SUBMIT
                            <span style={{ marginLeft: "1em" }}></span>
                        </button>
                    </div >
                </form >
            </div >
        </section >
    </>
    )
}

export default TpplicationForm