import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click")
    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username /*, email: email*/, password: password })
    })

    if (response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("currentUser", username)
      navigate('/posts');
    }
  }

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value)
  // }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
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
            {/* <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} required /> */}
            <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} required />
            </div>
            <br></br>
            <button role='submit-button' id='submit' type="submit" value="Submit">Login</button>    
        </div>  
        </div>
        </form>
        </div>
  
  );
}

export default LogInForm;
