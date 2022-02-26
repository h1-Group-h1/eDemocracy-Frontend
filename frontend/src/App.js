import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/login.js';
import Signup from './Pages/signup.js';
import Try from './Pages/try.js';
import {Route, Link} from "react-router-dom";


function App() {

  function readDetails(e){
    const email = Login.emailRef.current.value;
    if (email === '') return;
    console.log(email);
  }

  return (
    <div className="App">
      {/* <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} /> */}
    </div>
  );
}

export default App;
