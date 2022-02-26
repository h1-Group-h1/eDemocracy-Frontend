import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

function Login() {

    // state = {
    //     emailValue: "",
    //     passwordValue: ""
    // };

    // const emailRef = useRef()
    // const passwordRef = useRef()

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Login</h1>
            <input className='mb-3 form-control desIn' placeholder='Email' />
            <input className='mb-3 form-control desIn' placeholder='Password'  />
            <button className='btn btn-outline-primary mb-3 button'>Login</button>
            <button className='btn btn-outline-primary mb-3 button' onClick={() => {navigate("/signup" + location.search);}}>Sign Up</button>
            <button className='btn btn-outline-primary mb-3 button'>Forgor 💀</button>
        </div>
    )
    
}
export default Login;