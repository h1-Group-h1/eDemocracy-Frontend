import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function Home() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{    
        if (!UserProfile.getLoggedIn()){
            navigate('/login');
        }else{
            // run any code (particularly http requests) here
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
        <div className='cont'>
            <h1 className="h1">Home</h1>
            <button className='button' onClick={() => {navigate("/polls" + location.search);}}>Polls</button>
            <button className='button' onClick={() => {signOut()}}>Sign Out</button>
        </div>
    )

}
export default Home;