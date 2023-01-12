import React, { useState } from 'react'
import './SignUpForm.css'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validateEmail(email)) {
      if (validatePassword(password)) {
        fetch('/users', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        }).then((response) => {
          if (response.status === 201) {
            navigate('/login')
          } else {
            navigate('/signup')
          }
        })
      } else {
        setPasswordError('Enter a valid password')
      }
    } else {
      setEmailError('Enter a valid email')
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setEmailError('')
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setPasswordError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Fish Book</h1>
          </div>
        </div>
        <div className="right">
          <h5>Sign up!</h5>
          <p>
            Already have an account? <a href="/login">Log into your account</a>{' '}
            it takes less than a minute!
          </p>
          <div className="inputs"></div>
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div className="error-msg">{emailError}</div>}

          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error-msg">{passwordError}</div>}
        </div>

        <br></br>

        <div className="remember-me--forget-password">
          <label>
            <input type="checkbox" name="item" checked />
            <span className="text-checkbox">Remember me</span>
          </label>
          <button role="submit-button" id="submit" type="submit" value="Submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
