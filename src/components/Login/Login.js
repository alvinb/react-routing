import React, { useState } from 'react';
import './styles.css';

import { login } from 'util/api';

export function Login(props){
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [formValues, setFormValues] = useState({
    username: null,
    password: null
  });

  function handleUserNameChange(e){
    const value = e.target.value;
    if(value){
      setFormValues({ ...formValues, username: value});
    }

    if(formValues.username && formValues.password){
      setSubmitEnabled(true);
    }else{
      setSubmitEnabled(false);
    }
  }
  function handlePasswordChange(e) {
    const value = e.target.value;
    if (value) {
      setFormValues({ ...formValues, password: value });
    }

    if (formValues.username && formValues.password) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }


  function handleSubmit(e){
    e.preventDefault();
    setSubmitEnabled(false);

    login(formValues.username, formValues.password)
      .then((user) => {
        props.onUserLoginSuccess(user);
      })
      .catch((error) => {
        console.log(error);
        setSubmitEnabled(false);
      });
  };
  return (
    <div className='login'>
      <h3>Login</h3>
      <input onChange={handleUserNameChange} type='text'/>
      <input onChange={handlePasswordChange} type='password'/>
      <button type='submit' onClick={handleSubmit}>Login</button>
    </div>
  )
}