import React, { useState, byRef} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
// import './/styles/loginSignup.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import {Requests} from './httpRequest';

function Signup() {

    let navigate = useNavigate();

    const[email, emailError] = useState("");
    const[name, nameError] = useState("");
    const[organisation, orgError] = useState("");
    const[password, passError] = useState("");
    const[confpassword, confError] = useState("");

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

        var email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(userData.email === ''){
            console.log('email cannot be left blank');
            valid = false;
            emailError("Email cannot be left blank");
        }
        else if (!email_pattern.test(userData.email)){
            console.log('invalid email format');
            valid = false;
            emailError("Email is invalid");
        }
        else{emailError("");}

        if(userData.name === ''){
            console.log("Name field left blank");
            valid = false;
            nameError("Name cannot be left blank");
        }
        else{nameError("");}

        if(userData.organisation ===''){
            console.log("Organisation field left blank");
            valid = false;
            orgError("Organisation cannot be left blank"); 
        }
        else{orgError("");}

        if (userData.password != userData.confPassword){
            console.log('passwords dont match');
            valid = false;
            confError("Passwords do not match");
        }
        else{confError("");}

        if (userData.password.length < 9){
            console.log('password too short');
            valid = false;
            passError("Password must be 9 or more characters");
        }
        else{passError("");}

        console.log(
            userData
        )
        
        if (valid){
            var data = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                organisations: [userData.organisation]
            }
            console.log('all good, sending post...')  
            function logIn (responseData) {
                UserProfile.setLoggedIn(true);
                UserProfile.setName(responseData.name);
                UserProfile.setEmail(responseData.email);
                UserProfile.setPassword(responseData.password);
                UserProfile.setOrganisations(responseData.organisations);
                navigate('/');
            }
            const request = new Requests();
            request.postRequest('users/add', data, logIn, null, data.email, data.password);
        }

        
    }

    return(
        <div className='cont'>
            <h1 className="h1">Sign Up</h1>

            <div className='inputCont'>
                {name && <span className='name errorTag'>{name}</span>}
                <input id='name' className='inputField' placeholder='Name' />
            </div>

            <div className='inputCont'>
                {email && <span className='email errorTag'>{email}</span>}
                <input id='email' className='inputField' placeholder='Email' />
            </div>

            <div className='inputCont'>
                {password && <span className='password errorTag'>{password}</span>}
                <input id='password' className='inputField' placeholder='Password' type="password" />
            </div>

            <div className='inputCont'>
                {confpassword && <span className='confpassword errorTag'>{confpassword}</span>}
                <input id='conf-password' className='inputField' placeholder='Confirm Password' type="password"/>
            </div>

            <div className='inputCont'>
                {organisation && <span className='organisation errorTag'>{organisation}</span>}
                <input id='organisation' className='inputField' placeholder='Organisation' />
            </div>

            <span className='spacer'></span>

            <button className='button' onClick={() => {sendSignUpData()}}>Sign me up</button>


        </div>
    )
}

export default Signup;