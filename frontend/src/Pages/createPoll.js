import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function CreatePoll() {

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Create Poll</h1>

            <input id='name' className='inputField' placeholder='Name'/>
            <input id='description' className='inputField' placeholder='Description'/>
            <select id="anonymous">
                <option value='Anonymous' disabled>Anonymous</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        </div>
    )
    
}
export default CreatePoll;