import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import {Requests} from './httpRequest';

function Polls() {

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        document.getElementById('pollsCont').innerHTML = '';
        if (!UserProfile.getLoggedIn()){
            navigate('/login');
        }else{

            //get all polls
        
            var polls = []
        
            // check for polls every 5 seconds
            var getPolls = () => {

                const request = new Requests();
                function displayPolls(responseData){
                    var pollsCont = document.getElementById('pollsCont');
                    var pollKeys = Array.from({length: polls.length}, (_, i) => polls[i].key);
                    responseData.forEach(poll => {
                        if (!(pollKeys.includes(poll.key))){
                            var pollBlock = document.createElement("div");
                            pollBlock.id = poll.key;
                            pollBlock.classList = "pollBlock";
                            pollBlock.innerHTML = `${poll.name} by ${poll.organisation_key}`;
                            pollBlock.onclick = ()=>{
                                //navigate to poll's page
                                console.log('you clicked on poll', poll.key)
                                clearInterval(checkPollsInterval);
                                navigate('/viewpoll' + `?poll=${poll.key}`);
                            };
                            pollsCont.appendChild(pollBlock);
                        }
                    });
                    var pollKeys = Array.from({length: responseData.length}, (_, i) => responseData[i].key);
                    polls.forEach(poll => {
                        if (!(pollKeys.includes(poll.key))){
                            console.log('poll needs to be removed');
                            var pollBlock = document.getElementById(poll.key);
                            pollBlock.remove();
                        }
                    })
                    polls = responseData;
                    console.log(polls)
                }
                function failPolls(responseData){
                    console.log('failed to get polls');
                }
                request.getRequest('polls', displayPolls, failPolls, UserProfile.getEmail, UserProfile.getPassword); // needs changing
            }
        
            getPolls()
            var checkPollsInterval = setInterval(() => {getPolls()}, 5000);
            return () => {
                console.log('clearing');
                clearInterval(checkPollsInterval);
            }
        }
    })
    


    return(
        <div className='cont'>
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1">Polls</h1>
                    <input id='pollsSearch' className='inputField' placeholder='Search...'/>
                    <div id='pollsCont' className='pollsCont'></div>
                </div>
                <div className='flex-bottom'>
                    <button className='button' onClick={() => {navigate("/createpoll" + location.search)}}>Create a Poll</button>
                </div>
            </div>

        </div>
    )
    
}
export default Polls;