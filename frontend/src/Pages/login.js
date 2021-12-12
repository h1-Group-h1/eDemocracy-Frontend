import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';

export default function Login() {

    // state = {
    //     emailValue: "",
    //     passwordValue: ""
    // };
    

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Login</h1>
            <input className='mb-3 form-control desIn' placeholder='Email' />
            <input className='mb-3 form-control desIn' placeholder='Password'  />
            <button className='btn btn-outline-primary mb-3 button' onClick={readDetails}>Login</button>
            <button className='btn btn-outline-primary mb-3 button'>Sign Up</button>
            <button className='btn btn-outline-primary mb-3 button'>Forgor 💀</button>
        </div>
    )
    
}

function readDetails(){
        
    console.log('logging in');
}