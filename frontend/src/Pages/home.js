import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';

function Home() {

    

    return(
        <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-3" styleName="max-width: 20rem;">Home</h1>
        </div>
    )
    
}
export default Home;