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
    
    function getOrgs(input){
        const text = input.target.value;
        const cont = document.getElementById('searchSuggest');
        const contcont = document.getElementById('searchSuggestCont')
        cont.innerHTML = '';
        contcont.style.display = 'none';
        const callback = (responseData) => {
            responseData.forEach(element => {
                const suggestion = document.createElement('div');
                suggestion.innerHTML = element.name;
                suggestion.id = element.key;
                suggestion.className = 'suggestion';
                suggestion.addEventListener('click', ()=>{
                    input.target.value = element.name;
                });
                cont.appendChild(suggestion);
                contcont.style.display = 'flex';
            });
        }
        if (text.length > 3){
            const request = new Requests();
            request.getRequest(`organisations/search_orgs/${text}`, callback, null);
        }
    }
    
    function sendSignUpData(){
        
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confPassword: document.getElementById('conf-password').value,
            organisation: document.getElementById('organisation').value,
        }
                    
        const sendRequest = () => {
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

        if(userData.organisation ===''){
            console.log("Organisation field left blank");
            valid = false;
            orgError("Organisation cannot be left blank"); 
        }
        else{
            orgError("");

            //check org that has been input exists

            const request = new Requests();
            const success = (responseData) =>{
                if (responseData.length == 0){
                    console.log('organisation does not exist')
                    valid = false;
                    orgError('That organisation does not exist!')
                }else{
                    userData.organisation = responseData[0].key;
                    console.log(userData.organisation);
                }
                sendRequest()
            }
            request.getRequest(encodeURI(`organisations/search_orgs/${userData.organisation}`), success, sendRequest);
        }
        
        console.log(userData)

    
    }
    
    return(
        <div className='cont'>
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1">Sign Up</h1>

                    <div className='inputCont'>
                        <span className='errorCont'>{name && <span className='name errorTag'>{name}</span>}</span>
                        <input id='name' className='inputField' placeholder='Name' />
                    </div>

                    <div className='inputCont'>
                        <span className='errorCont'>{email && <span className='email errorTag'>{email}</span>}</span>
                        <input id='email' className='inputField' placeholder='Email' />
                    </div>

                    <div className='inputCont'>
                        <span className='errorCont'>{password && <span className='password errorTag'>{password}</span>}</span>
                        <input id='password' className='inputField' placeholder='Password' type="password" />
                    </div>

                    <div className='inputCont'>
                        <span className='errorCont'>{confpassword && <span className='confpassword errorTag'>{confpassword}</span>}</span>
                        <input id='conf-password' className='inputField' placeholder='Confirm Password' type="password"/>
                    </div>

                    <div className='inputCont'>
                        <span className='errorCont'>{organisation && <span className='organisation errorTag'>{organisation}</span>}</span>
                        <input id='organisation' className='inputField' placeholder='Organisation' onInput={(text) => {getOrgs(text)}} />
                    </div>

                </div>

                <div className='flex-bottom-fill'>
                    <div className='searchSuggestCont' id='searchSuggestCont' style={{display: 'none'}}>
                        <div className='searchSuggest' id='searchSuggest'></div>
                   </div>
                </div>

                <div className='flex-bottom'>
                    <button className='button' onClick={() => {sendSignUpData()}}>Sign me up</button>
                </div>
            </div>
        </div>
    )
    
}

export default Signup;