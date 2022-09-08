import React from 'react'
import { useField, ErrorMessage } from "formik";






const TextField = ({ label, ...props }) => {



    // console.log(props);
    const [field, meta] = useField(props)
    // console.log(field, meta);
    return (
        <div className="col-md mb-3">
            <div className="form-floating text-black">
                <input className= {`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                />
                <ErrorMessage name={field.name} className='text-danger' component='div' />
                <label htmlFor={field.name}>{label}</label>
            </div>
        </div>
    )
}

export default TextField