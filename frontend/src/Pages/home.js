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

    return(
        <div className='cont'>
            <h1 className="h1">Home</h1>
            {/* <button className='button' onClick={() => {navigate("/login" + location.search);}}>Login</button>
            <button className='button' onClick={() => {navigate("/signup" + location.search);}}>Sign Up</button> */}
            <button className='button' onClick={() => {navigate("/polls" + location.search);}}>Polls</button>
        </div>
    )

}
export default Home;