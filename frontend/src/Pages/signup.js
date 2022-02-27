import React, { useState, byRef} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import './/styles/common.css';
import './/styles/loginSignup.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

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

        if(userData.name === ''){
            console.log("Name field left blank"); valid = false;
            nameError("Name cannot be left blank");
        }
        else{nameError("");}

        if(userData.email ===''){
            console.log("Email field left blank"); valid = false;
            emailError("Email cannot be left blank");
        }
        else{emailError("");}

        if(userData.organisation ===''){
            console.log("Organisation field left blank"); valid = false;
            orgError("Organisation cannot be left blank"); 
        }
        else{orgError("");}

        if (userData.password != userData.confPassword){
            console.log('passwords dont match'); valid = false;
            confError("Passwords do not match");
        }
        else{confError("");}

        if (userData.password.length < 9){
            console.log('password too short'); valid = false;
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
            const request = new XMLHttpRequest();
            request.open("POST", 'http://localhost:8000/users/add');
            request.setRequestHeader(
                'Content-Type',
                'application/json;charset=UTF-8'
            );
            request.onload = () => {
                console.log('recieved: ', request.status);
                if (request.status == 200){
                    // success
                    navigate('/login')
                }else{
                    console.log('ERROR: ', request.status, '\n', JSON.parse(request.response))
                }
            }
            request.send(JSON.stringify(data))
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