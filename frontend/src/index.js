import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Pages/login.js';
import Signup from './Pages/signup.js';
import Home from './Pages/home.js';
import Forgot from './Pages/forgot.js';
import Polls from './Pages/polls.js';
import CreatePoll from './Pages/createPoll.js';
import ViewPoll from './Pages/viewpoll';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/forgot" element={<Forgot />} />
      <Route exact path="/polls" element={<Polls />} />
      <Route exact path="/createpoll" element={<CreatePoll />} />
      <Route exact path="/viewpoll" element={<ViewPoll />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

document.getElementById('root').classList = "root";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
