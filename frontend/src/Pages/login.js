import React, { useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
// import './/styles/loginSignup.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile  from './userProfile';
import { Requests} from './httpRequest';

function Login() {

    const[email, emailError] = useState("");
    const[password, passError] = useState("");
    const[credentials, invalidCred] = useState("");

    function sendLoginData(){
        
        const userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        // validate
        
        var valid = true;
        if (userData.email === ''){
            console.log('the email was left blank'); valid = false;
            emailError("Email cannot be left blank");
        }
        else{emailError("");}

        if(userData.password === ''){
            console.log('the password was left blank'); valid = false;
            passError('Password cannot be left blank');
        }
        else{passError("");}

        console.log(userData)
        
        if (valid){
            console.log('all good, sending get...');
            const request = new Requests();
            function logIn(responseData){
                UserProfile.setLoggedIn(true);
                UserProfile.setName(responseData.name);
                UserProfile.setEmail(responseData.email);
                UserProfile.setPassword(responseData.password);
                UserProfile.setOrganisations(responseData.organisations);
                console.log(responseData);
                navigate('/');
            }
            function failLogIn(responseData){
                invalidCred("Login failed. Email or password is incorrect");
                setTimeout(() => {
                    invalidCred("")
                }, 2000)
            }
            request.getRequest('users/{key}', logIn, failLogIn, userData.email, userData.password);
        }

        
    }
    

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className='cont'>
            <h1 className="h1" styleName="max-width: 20rem;">Login</h1>


            <div className='inputCont'>
                {email && <span className='email errorTag'>{email}</span>}
                <input  id='email' className='inputField' placeholder='Email' />
            </div>
            
            <div className='inputCont'>
                {password && <span className='password errorTag'>{password}</span>}
                <input id='password' className='inputField' placeholder='Password' type="password" />
            </div>
            
            <span className='spacer'></span>

            <div>
                {credentials && <span className='credentials errorTag'>{credentials}</span>}
            </div>

            <button className='button' onClick={() => sendLoginData()}>Login</button>
            <button className='button' onClick={() => {navigate("/signup" + location.search);}}>Sign Up</button>
            <button className='button' onClick={() => {navigate("/forgot" + location.search)}}>Forgor 💀</button>
        </div>
    )
    
}
export default Login;