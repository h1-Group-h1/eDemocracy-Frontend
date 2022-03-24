import React, { useState, useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';
import { Requests} from './httpRequest';

function CreatePoll() {

    const navigate = useNavigate();
    const location = useLocation();

    const[name, nameError] = useState("");
    const[startDate, startDateError] = useState("");
    // const[radio, radioError] = useState("");
    const[endDate, endDateError] = useState("");
    const[choices, choicesError] = useState("");
    
    useEffect(()=>{    
        if (!UserProfile.getLoggedIn()){
            navigate('/login');
        }else{
            // run any code (particularly http requests) here
        }
    })

    function addChoiceBlock(){
        const cont = document.createElement('div');
        cont.classList = 'pollChoiceCont';
        const choiceBlock = document.createElement('input');
        choiceBlock.setAttribute('placeholder', 'Choice Name');
        choiceBlock.classList = 'pollChoice inputField';
        
        const removeButton = document.createElement('div');
        removeButton.innerHTML = '<span></span><span></span>';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', ()=>{
            cont.remove();
        })
        cont.append(choiceBlock);
        cont.append(removeButton);
        document.getElementById('choicesCont').appendChild(cont);
    }

    function createPoll(){
        const name = document.getElementById('name').value;
        const desc = document.getElementById('description').value;
        const anon = document.getElementById('anonymous').value;
        const imStart = document.getElementById('immediateStartCheck').checked;
        var startDate = document.getElementById('date').value;
        // const endDateRad = document.getElementById('time').checked;
        // const endDuraRad = document.getElementById('duration').checked;
        var endDate = document.getElementById('endDate').value;
        var choices = document.getElementById('choicesCont').children;

        // validation
        var valid = true;
        if (name.replace(/\s+/g, '').length == 0){
            valid = false;
            console.log('name was left empty');
            nameError('Name cannot be left blank');
        }else{nameError('')}
        if (!imStart && startDate.replace(/\s+/g, '').length == 0){
            valid = false;
            console.log('start date was left blank');
            startDateError('You must tell us the start date!');
        }else{startDateError('')}
        // if (!endDateRad && !endDuraRad){
        //     valid = false;
        //     console.log('you must select when the poll should end');
        //     radioError('You must select how to end poll');
        // }else{radioError('')}
        if (endDate.replace(/\s+/g, '').length == 0){
            valid = false;
            console.log('you must give an end date/duration')
            endDateError('you must give an end date/duration')
        }else{endDateError('')}
        choices = Array.from(choices).filter((child)=>{return (child.firstChild.value.replace(/\s+/g, '').length > 0);});
        console.log(choices)
        choices = choices.map((child) => child.firstChild.value);
        if (choices.length < 2){
            valid = false;
            console.log('you need at least 2 choices');
            choicesError('You need at least 2 choices');
        }else{choicesError('')}

        if (valid){
            if(imStart){
                startDate = Date.now();
            }else{
                var date = new Date(startDate);
                startDate = date.getTime();
            }
            var date = new Date(endDate);
            endDate = date.getTime();

            console.log(UserProfile.getOrganisations())
            const data = {
                name: name,
                description: desc,
                anonymous: anon,
                // start_time: startDate, //change back to these after db ammendments
                // end_time: endDate,
                start_time: {
                    year: 2022,
                    month: 3,
                    day: 23,
                    hours: 0,
                    minutes: 0
                },
                end_time: {
                    year: 2024,
                    month: 3,
                    day: 23,
                    hours: 0,
                    minutes: 0
                },
                organisation_key: 'to5rbwngcsg5', //change this to org key once database is changed, and add a selection for the user to select which org to use
                choices: choices
            };

            const success = (responseData)=>{
                alert('Success');
                console.log(responseData);
            };

            const request = new Requests();
            console.log(UserProfile.getEmail(), UserProfile.getPassword())
            request.postRequest('polls/add', data, success(), ()=>{console.log('error adding poll')}, UserProfile.getEmail(), UserProfile.getPassword());
            
        }
    }


    return(
        <div className='cont'>
            <div className='flex'>

                <h1 className="h1">Create Poll</h1>

                <div id='pageTop' className='pageTop' style={{height: '50%', overflowY: 'scroll'}}>
                    <span className='errorCont'>{name && <span className='errorTag'>{name}</span>}</span>
                    <input id='name' className='inputField' placeholder='Name'/>
                    <br/>
                    <input id='description' className='inputField' placeholder='Description'/>
                    <br/>
                    <div className='dropdown'>
                        <span>Anonymous: </span>
                        <select id="anonymous">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <br/>
                    <div className='checkboxCont'>
                        <span>Start poll immediately? </span>
                        <input type='checkbox' id='immediateStartCheck' defaultChecked={true} className='checkbox' onChange={(e)=>{
                            const yid = document.getElementById('yearInput'); // year input div
                            const yi = document.getElementById('date'); // year input
                            if(e.target.checked){
                                yid.classList = 'fadedInput';
                                yi.value = '';
                                yi.setAttribute('readOnly', '');
                            }else{
                                yid.classList = '';
                                yi.removeAttribute('readOnly');
                            }
                        }}></input>
                    </div>
                    <div id='yearInput' className='fadedInput' >
                        <span className='errorCont'>{startDate && <span className='errorTag'>{startDate}</span>}</span>
                        <span>Enter When the poll should start:</span>
                        <input type='datetime-local' id='date' className='inputField' readOnly placeholder='DD/MM/YYYY'/>
                    </div>
                    <span className='errorCont'>{endDate && <span className='errorTag'>{endDate}</span>}</span>
                    <span>End date (maximum 1 year)</span>
                    {/* <span className='errorCont'>{radio && <span className='errorTag'>{radio}</span>}</span>
                    <form>
                        <label className='radioCont'>
                            <span className='radioText'>Set time for poll to end</span>
                            <input type='radio' id='time' name='endTimeType' className='radio'></input>
                            <span className='checkmark'></span>
                        </label>
                        <label className='radioCont'>
                            <span className='radioText'>Set duration for poll to last</span>
                            <input type='radio' id='duration' name='endTimeType' className='radio'></input>
                            <span className='checkmark'></span>
                        </label>
                    </form> */}
                    <input type='datetime-local' id='endDate' className='inputField' placeholder='DD/MM/YYYY'/>
                </div>

                <div className='inputCont flex-bottom-fill' style={{maxHeight: '25%'}}>
                    <span className='errorCont'>{choices && <span className='errorTag'>{choices}</span>}</span>
                    <div className='pollChoicesCont noScroll'>
                        <button className='button' onClick={()=>{addChoiceBlock()}}>Add Choice</button>
                        <div className='scroll' id='choicesCont'></div>
                    </div>
                </div>

                <button className='button' onClick={()=>{createPoll()}}>Create Poll</button>
                    
            </div>
            
        </div>
    )
    
}
export default CreatePoll;