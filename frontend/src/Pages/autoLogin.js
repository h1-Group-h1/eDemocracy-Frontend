import React, { useState, useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import UserCreds from './userCreds';
import { Requests} from './httpRequest';

export function AutoLogin(){
    this.login = (successCallback, failureCallback) => {
        const request = new Requests();
        function logIn(responseData){
            UserProfile.setLoggedIn(true);
            UserProfile.setName(responseData.name);
            UserProfile.setEmail(responseData.email);
            UserProfile.setPassword(responseData.password);
            UserProfile.setOrganisations(responseData.organisations);
            console.log(responseData);
            successCallback(responseData);
        }
        function failLogIn(responseData){
            failureCallback(responseData)
        }
        request.getRequest('users/{key}', logIn, failLogIn, UserCreds.getEmail(), UserCreds.getPassword());
    }
}