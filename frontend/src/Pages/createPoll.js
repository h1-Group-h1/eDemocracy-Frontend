import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function CreatePoll() {

    return(
        <div className='cont'>
            <h1 className="h1">Create Poll</h1>

            <input id='name' className='inputField' placeholder='Name'/>
            <input id='description' className='inputField' placeholder='Description'/>
            <div className='dropdown'>
                <span>Anonymous: </span>
                <select id="anonymous">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <input id='date' className='inputField' placeholder='DD/MM/YYYY'/>
            
        </div>
    )
    
}
export default CreatePoll;