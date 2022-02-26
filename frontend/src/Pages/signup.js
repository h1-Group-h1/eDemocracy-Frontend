import React, { useState, byRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

function Signup() {

    let navigate = useNavigate();

    function sendSignUpData(){
        
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confPassword: document.getElementById('conf-password').value,
            organisation: document.getElementById('organisation').value,
        }

        // validate

        var valid = true;

        if(userData.name === '' || userData.email === '' || userData.organisation === ''){
            console.log('report error: name or email or organisation is left blank'); valid = false;
        }
        if (userData.password != userData.confPassword){
            console.log('passwords dont match'); valid = false;
        }
        if (userData.password.length < 8){
            console.log('password too short'); valid = false;
        }

        console.log(
            userData
        )
        
        if (valid){
            var data = {
                name: userData.name,
                email: userData.email,
                pw:userData.password,
                organisations: [userData.organisation]
            }
            console.log('all good, sending post...')            
            const request = new XMLHttpRequest();
            request.open("POST", 'http://localhost:8000/users/add');
            request.setRequestHeader(
                "Authorization",
                "Basic"
            );
            request.setRequestHeader(
                'Content-Type',
                'application/json;charset=UTF-8'
            );
            request.onload = () => {
                var data = JSON.parse(request.response);
                console.log('recieved: ', request.status);
                if (request.status == 200){
                    // success
                    navigate('/login')
                }
            }
            request.send(JSON.stringify(data))
        }

        
    }

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Sign Up</h1>

            <input id='name' className='mb-3 form-control desIn' placeholder='Name' />
            <input id='email' className='mb-3 form-control desIn' placeholder='Email' />
            <input id='password' className='mb-3 form-control desIn' placeholder='Password' type="password" />
            <input id='conf-password' className='mb-3 form-control desIn' placeholder='Confirm Password' type="password"/>
            <input id='organisation' className='mb-3 form-control desIn' placeholder='Organisation' />

            <button className='btn btn-outline-primary mb-3 button' onClick={() => {sendSignUpData()}}>Sign me up</button>


        </div>
    )
}

export default Signup;