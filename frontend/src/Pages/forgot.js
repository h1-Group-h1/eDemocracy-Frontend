import React, { useState, byRef} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import './/styles/common.css';
import './/styles/loginSignup.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

function Forgot() {

    let navigate = useNavigate();

    const[email, emailError] = useState("");

    function sendResetData(){
        
        

        
    }

    return(
        <div className='cont'>
            <h1 className="h1">Reset</h1>

            <div className='inputCont'>
                {email && <span className='email errorTag'>{email}</span>}
                <input id='email' className='inputField' placeholder='Email' />
            </div>

            <span className='spacer'></span>

            <button className='button' onClick={() => {sendResetData()}}>Send Email</button>


        </div>
    )
}

export default Forgot;