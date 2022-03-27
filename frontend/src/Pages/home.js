import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import { AutoLogin } from './autoLogin';

function Home() {

    const navigate = useNavigate();
    const location = useLocation();

    function renderPage(){
        ReactDOM.render(
            <div>
                <h1 className="h1">Home</h1>
                <button className='button' onClick={() => {navigate("/polls" + location.search);}}>Polls</button>
                <button className='button' onClick={() => {signOut()}}>Sign Out</button>
            </div>,
            document.getElementById('page')
        );
    }

    useEffect(()=>{    
        if (!UserProfile.getLoggedIn()){

            // try to login

            function loginSuccess(){
                renderPage()
            }
            function loginFail(){
                navigate('/login');
            }

            const autoLogin = new AutoLogin();
            autoLogin.login(loginSuccess, loginFail);

        }else{
            renderPage()
        }
    })

    function signOut(){
        UserProfile.setLoggedIn(false);
        UserProfile.setName('');
        UserProfile.setEmail('');
        UserProfile.setPassword('');
        UserProfile.setOrganisations([]);
        navigate('/login');
    }

    return(
        <div className='cont' id='page'>Please bear with us</div>
    )

}
export default Home;