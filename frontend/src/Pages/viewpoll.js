import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import {Requests} from './httpRequest';
import { AutoLogin } from './autoLogin';

function ViewPolls() {

    const navigate = useNavigate();
    const location = useLocation();

    function runPage(){
        
        const URLparams = new URLSearchParams(window.location.search);
        var pollKey = URLparams.get('poll');
        console.log(pollKey);

        const request = new Requests();
        function displayPoll(poll){
            console.log(poll);
            
            document.getElementById('pollName').innerHTML = poll.name;
            const request = new Requests();
            function getOrg(responseData){
                document.getElementById('pollOrg').innerHTML = `Organisation: <a href="${window.location.origin + '/organisation?key=' + poll.organisation_key}">` + responseData.name + "</a>";
            }
            request.getRequest(`organisations/${poll.organisation_key}`, getOrg, null, UserProfile.email, UserProfile.password);
            document.getElementById('pollDescr').innerHTML = poll.description;
            if (poll.anonymous){
                document.getElementById('pollAnon').innerHTML = "The creator cannot see who has responded to this poll.";
            }else{
                document.getElementById('pollAnon').innerHTML = "The creator can see your email if you respond to this poll.";
            }
            document.getElementById('creationDate').innerHTML = `Created:<br/>${String(poll.start_time.day).padStart(2, 0)}/${String(poll.start_time.month).padStart(2, 0)}/${String(poll.start_time.year).padStart(4, 0)} ${String(poll.start_time.hours).padStart(2, 0)}:${String(poll.start_time.minutes).padStart(2, 0)}`;
            document.getElementById('expirationDate').innerHTML = `Ends:<br/>${String(poll.end_time.day).padStart(2, 0)}/${String(poll.end_time.month).padStart(2, 0)}/${String(poll.end_time.year).padStart(4, 0)} ${String(poll.end_time.hours).padStart(2, 0)}:${String(poll.end_time.minutes).padStart(2, 0)}`;

            const choicesCont = document.getElementById('choicesCont');
            poll.choices.forEach(choice => {
                const choiceBlock = document.createElement('div');
                choiceBlock.innerHTML = choice.description;
                choiceBlock.classList = 'pollChoice';
                choiceBlock.id = choice.id;
                choiceBlock.addEventListener('click', ()=>{
                    // add vote 
                    const voteRequest = new Requests();
                    function voteCallback(responseData){
                        console.log(responseData);
                    }
                    voteRequest.postRequest(`polls/add_vote/${poll.key}/${choice.id}`, null, voteCallback, null, UserProfile.getEmail(), UserProfile.getPassword());
                });
                choicesCont.appendChild(choiceBlock);
            });

        }
        request.getRequest(`poll/${pollKey}`, displayPoll, null, UserProfile.getEmail(), UserProfile.getPassword());
    }
    
    function renderPage(){
        ReactDOM.render(
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1"><span id='pollName'>Loading</span></h1>
                    <div className='pollDescr' id='pollOrg'>Organisation:</div>
                    <div className='pollDescr' id='pollDescr'></div>
                    <div className='pollDescr' id='pollAnon' style={{'fontStyle': 'italic'}}></div>
                    <div className='pollDescr' id='creationDate'></div>
                    <div className='pollDescr' id='expirationDate'></div>
                    <div className='pollDescr'>Vote for your choice:</div>
                </div>
                <div className='flex-bottom-fill'>
                    <div className='pollChoicesCont' id='choicesCont'></div>
                </div>
            </div>,
            document.getElementById('page'),
            runPage
        );
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

    return(
        <div className='cont' id='page'></div>
    )
    
}
export default ViewPolls;