import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './/styles/common.css';
import {Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import UserProfile from './userProfile';

function CreatePoll() {

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{    
        if (!UserProfile.getLoggedIn()){
            navigate('/login');
        }else{
            // run any code (particularly http requests) here
        }
    })

    function addChoiceBlock(){
        const choiceBlock = document.createElement('input');
        choiceBlock.setAttribute('placeholder', 'Choice Name');
        choiceBlock.classList = 'pollChoice inputField';
        document.getElementById('choicesCont').appendChild(choiceBlock);
    }


    return(
        <div className='cont'>
            <div className='flex'>

                <h1 className="h1">Create Poll</h1>

                <div className='inputCont'>
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
                    <div id='yearInput' className='fadedInput'>
                        <span>Enter When the poll should start:</span>
                        <input type='datetime-local' id='date' className='inputField' readOnly placeholder='DD/MM/YYYY'/>
                    </div>
                    <br/>
                    <span>End date (maximum 1 year)</span>
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
                    </form>
                    <input type='datetime-local' id='date' className='inputField' placeholder='DD/MM/YYYY'/>
                </div>

                <div className='inputCont flex-bottom-fill'>
                    <div className='pollChoicesCont noScroll'>
                        <button className='button' onClick={()=>{addChoiceBlock()}}>Add Choice</button>
                        <div className='scroll' id='choicesCont'></div>
                    </div>
                </div>
                    
            </div>
            
        </div>
    )
    
}
export default CreatePoll;