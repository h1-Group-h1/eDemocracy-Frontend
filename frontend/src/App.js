import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/login.js';
import Signup from './Pages/signup.js';
import Try from './Pages/try.js';


function App() {
  
  const email = useState('')
  const password = useState('')

  const readDetails =  () => {
    console.log(email)
  }

  return (
    <div className="App">
      <Login />
      <Signup />
    </div>
  );
}

export default App;
