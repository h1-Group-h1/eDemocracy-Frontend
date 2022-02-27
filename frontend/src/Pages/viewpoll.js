import React, { useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function ViewPolls() {

    const URLparams = new URLSearchParams(window.location.search);
    var pollKey = URLparams.get('poll');

    var request = new XMLHttpRequest();
    request.open("GET", `http://localhost:8000/poll/${pollKey}`);
    request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8'
    );
    request.setRequestHeader(
        'Authorization',
        'Basic ' + btoa(`${UserProfile.getEmail()}:${UserProfile.getPassword()}`)
    );
    request.onload = () => {
        console.log('recieved: ', request.status);
        var responseData = JSON.parse(request.response);
        if (request.status == 200){
            // success
            var poll = JSON.parse(request.response);
            console.log(poll);
        }else{
            console.log('failed to get poll')
        }
    }
    request.send();

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className='cont'>
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1">Polls</h1>
                </div>
                <div className='flex-bottom'>
                </div>
            </div>
        </div>
    )
    
}
export default ViewPolls;