import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import {Requests} from './httpRequest';
import { AutoLogin } from './autoLogin';

function Polls() {

    const navigate = useNavigate();
    const location = useLocation();
    var checkPollsInterval;
    var polls = [];

    function runPage(){

        document.getElementById('pollsCont').innerHTML = '';
        
        // check for polls every 5 seconds
        
        getPolls()
        checkPollsInterval = setInterval(() => {getPolls()}, 5000);
        return () => {
            console.log('clearing');
            clearInterval(checkPollsInterval);
        }
    }
    
    function renderPage(){
        ReactDOM.render(
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1">Polls</h1>
                    <input id='pollsSearch' className='inputField' placeholder='Search...' onInput={(text) => {searchPolls(text)}}/>
                    <div id='pollsCont' className='pollsCont'></div>
                </div>
                <div className='flex-bottom'>
                    <button className='button' onClick={() => {navigate("/createpoll" + location.search)}}>Create a Poll</button>
                </div>
            </div>,
            document.getElementById('page'),
            runPage
        );
    }
    
    var getPolls = () => {

        const request = new Requests();
        function displayPolls(responseData){
            var pollsCont = document.getElementById('pollsCont');
            // var pollKeys = Array.from({length: polls.length}, (_, i) => polls[i].key);
            var displayedKeys = Array.from(pollsCont.children).map((child)=>{return child.id});
            console.log(displayedKeys)
            responseData.forEach(poll => {
                if (!(displayedKeys.includes(poll.key))){
                    var pollBlock = document.createElement("div");
                    pollBlock.id = poll.key;
                    pollBlock.classList = "pollBlock";
                    pollBlock.innerHTML = `${poll.name} by ${poll.organisation_name}`;
                    pollBlock.onclick = ()=>{
                        //navigate to poll's page
                        console.log('you clicked on poll', poll.key)
                        clearInterval(checkPollsInterval);
                        navigate('/viewpoll' + `?poll=${poll.key}`);
                    };
                    pollsCont.appendChild(pollBlock);
                }
            });
            // var pollKeys = Array.from({length: responseData.length}, (_, i) => responseData[i].key);
            // polls.forEach(poll => {
            //     if (!(pollKeys.includes(poll.key))){
            //         console.log('poll needs to be removed');
            //         var pollBlock = document.getElementById(poll.key);
            //         pollBlock.remove();
            //     }
            // })
            // polls = responseData;
            // console.log(polls)
        }
        function failPolls(responseData){
            console.log('failed to get polls');
        }
        UserProfile.getOrganisations().forEach(key=>{
            request.getRequest(encodeURI(`polls/${key}`), displayPolls, failPolls, UserProfile.getEmail(), UserProfile.getPassword()); // needs changing
        })
    }

    useEffect(()=>{    
        if (!UserProfile.getLoggedIn()){

            // try to login

            function loginSuccess(){
                renderPage()
            }
            function loginFail(){
                navigate('/login');
            }

            const autoLogin = new AutoLogin();
            autoLogin.login(loginSuccess, loginFail);

        }else{
            renderPage()
        }
    })

    function searchPolls(input) {
        clearInterval(checkPollsInterval);
        const text = input.target.value;
        const cont = document.getElementById('pollsCont')
        const callback = (responseData) => {
            console.log(responseData)
            cont.innerHTML = '';
            responseData.forEach(element => {
                const pollBlock = document.createElement('div');
                pollBlock.innerHTML = `${element.name} by ${element.organisation_name}`;
                pollBlock.id = element.key;
                pollBlock.className = 'pollBlock';
                pollBlock.onclick = ()=>{
                    //navigate to poll's page
                    console.log('you clicked on poll', element.key)
                    clearInterval(checkPollsInterval);
                    navigate('/viewpoll' + `?poll=${element.key}`);
                };
                cont.appendChild(pollBlock);
                console.log(element)
            });
        }
        if (text.length > 3){
            const request = new Requests();
            UserProfile.getOrganisations().forEach(key=>{
                request.getRequest(encodeURI(`polls/search_polls/${key}/${text}`), callback, null, UserProfile.getEmail(), UserProfile.getPassword());
            })
        }else{
            cont.innerHTML= '';
            getPolls();
            checkPollsInterval = setInterval(() => {getPolls()}, 5000);
        }
    }

    


    return(
        <div className='cont' id='page'></div>
    )
    
}
export default Polls;