import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click")
    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    })

    if (response.status !== 201) {
      if (response.status === 401) {
        setUserNameError('Incorrect username or password');
        setPasswordError('')
        return;
      }
      console.log("Error occurred while logging in");
      return;
    } else {
      console.log("login successful");
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("currentUser", username)
      navigate('/posts');
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
    setUserNameError('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="main-forms-container">
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>FishBook</h1>
            </div>
          </div>
          <div className="right">
            <h5>Login!</h5>
            <p>Don't have an account? <a href="/signup">Create Your Account</a> it takes less than a minute!</p>
            <div className="inputs">
              <input placeholder='Username' id="username" type='username' value={username} onChange={handleUsernameChange} required />
              <span className="error-message">{userNameError}</span>
              <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} required />
              <span className="error-message">{passwordError}</span>
            </div>
            <br></br>
          <div className="remember-me--forget-password">
            <label>
              <input type="checkbox" name="item" value="checkbox" />
              <input type="checkbox" name="item" value="Yes"/>
              <span className="text-checkbox">Remember me</span>
              </label>
            <button role='submit-button' id='submit' type="submit" value="Submit">Login</button>    
        </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
