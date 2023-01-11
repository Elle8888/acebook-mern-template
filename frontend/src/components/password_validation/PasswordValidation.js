import React, { useState } from 'react'

const PasswordInput = () => {
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)
  const [errors, setErrors] = useState({
    minLength: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
  })

  const handleChange = (event) => {
    setPassword(event.target.value)
    let errors = { ...errors }
    if (event.target.value.length < 8) {
      errors.minLength = true
    } else {
      errors.minLength = false
    }
    if (!/[A-Z]/.test(event.target.value)) {
      errors.hasUpper = true
    } else {
      errors.hasUpper = false
    }
    if (!/[0-9]/.test(event.target.value)) {
      errors.hasNumber = true
    } else {
      errors.hasNumber = false
    }
    if (!/[!@#\$%\^&\*]/.test(event.target.value)) {
      errors.hasSpecial = true
    } else {
      errors.hasSpecial = false
    }

    setErrors(errors)

    if (
      !errors.minLength &&
      !errors.hasUpper &&
      !errors.hasNumber &&
      !errors.hasSpecial
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  return (
    <div>
      <label>
        Password:
        <input type="password" value={password} onChange={handleChange} />
      </label>
      {valid ? <p>Password is valid!</p> : <p>Password is invalid.</p>}
      {errors.minLength && <p>Password must be at least 8 characters long.</p>}
      {errors.hasUpper && (
        <p>Password must contain at least one uppercase letter.</p>
      )}
      {errors.hasNumber && <p>Password must contain at least one number.</p>}
      {errors.hasSpecial && (
        <p>Password must contain at least one special character.</p>
      )}
    </div>
  )
}

export default PasswordInput

/* In this example, the component uses the useState hook to manage the state of the password and whether it's valid or not. When the user types in the password input, the handleChange function is called, which updates the state of the password and also checks if the password is at least 8 characters long. If it is, the valid state is set to true, otherwise it's set to false. The component then renders a message indicating whether the password is valid or not.
Here, I've added an additional state variable called errors, which is an object that contains a property for each validation check (minLength, hasUpper, hasNumber, hasSpecial) and is initially set to false for all properties.

In the handleChange function, I've added a block of code that runs each validation check and sets the corresponding property in the errors object to true or false depending on the result. Then, I've added a series of p tags at the end of the component that display error messages if the corresponding property in*/
