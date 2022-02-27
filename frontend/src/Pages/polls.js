import React, { useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function Polls() {

    //get all polls

    var polls = []

    // check for polls every 5 seconds
    var getPolls = () => {
        var request = new XMLHttpRequest();
        request.open("GET", 'http://localhost:8000/polls');
        request.setRequestHeader(
            'Content-Type',
            'application/json;charset=UTF-8'
        );
        request.setRequestHeader(
            'Authorization',
            'Basic ' + btoa(`${UserProfile.getEmail()}:${UserProfile.getPassword()}`)
        );
        request.onload = () => {
            console.log('recieved: ', request.status);
            var responseData = JSON.parse(request.response);
            if (request.status == 200){
                // success
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
            }else{
                console.log('failed to get polls')
            }
        }
        request.send();
    }

    getPolls()
    var checkPollsInterval = setInterval(() => {getPolls()}, 5000);

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className='cont'>
            <div className='flex'>
                <div className='flex-top'>
                    <h1 className="h1">Polls</h1>
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