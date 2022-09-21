import React from 'react'
import { useField, ErrorMessage } from "formik";

const TextField = ({ label, ...props }) => {

    const [field, meta] = useField(props)                 //to getthe field value and errors
    return (
        <div className="col-md mb-3">
            <div className="form-floating text-black">
                <input 
                className= {`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props} />
                <ErrorMessage name={field.name} className='text-danger' component='div' />
                <label htmlFor={field.name}>{label}</label>
            </div>
        </div>
    )
}

export default TextField