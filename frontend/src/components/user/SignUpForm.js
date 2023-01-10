import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <form onSubmit={handleSubmit}>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>Fish Book</h1>
            </div>
          </div>
          <div className="right">
            <h5>Sign up!</h5>
            <p>Already have an account? <a href="/login">Log into your account</a> it takes less than a minute!</p>
            <div className="inputs">
              <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} required />

                <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} required />

            </div>

            <br></br>
          
          <div className="remember-me--forget-password">
            <label>
              <input type="checkbox" name="item" checked />
              <span className="text-checkbox">Remember me</span>
            </label>
            
          <button role='submit-button' id='submit' type="submit" value="Submit">Signup</button>
          </div>
          </div>
        </div>
      </form>
  );
}

export default SignUpForm;
