import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';

export default function Signup() {
    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Sign Up</h1>

            <input className='mb-3 form-control desIn' placeholder='Name' />
            <input className='mb-3 form-control desIn' placeholder='Email' />
            <input className='mb-3 form-control desIn' placeholder='Password' type="password" />
            <input className='mb-3 form-control desIn' placeholder='Confirm Password' type="password"/>

            <button className='btn btn-outline-primary mx-2 mb-3 button'>Sign me up</button>


        </div>
    )
}