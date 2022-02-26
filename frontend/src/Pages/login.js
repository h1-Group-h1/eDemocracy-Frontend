import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

function Login() {

    function sendLoginData(){
        
        const userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        // validate
        
        valid = true;
        if (userData.email === '' || userData.password === ''){
            console.log('the email or password was left blank'); valid = false;
        }

        console.log(userData)
        
        if (valid){
            var data = {
                
            }
        }

        
    }
    

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Login</h1>
            <input  id='email' className='mb-3 form-control desIn' placeholder='Email' />
            <input id='password' className='mb-3 form-control desIn' placeholder='Password'  />
            <button className='btn btn-outline-primary mb-3 button' onClick={() => sendLoginData()}>Login</button>
            <button className='btn btn-outline-primary mb-3 button' onClick={() => {navigate("/signup" + location.search);}}>Sign Up</button>
            <button className='btn btn-outline-primary mb-3 button'>Forgor 💀</button>
        </div>
    )
    
}
export default Login;