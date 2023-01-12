const mongoose = require('mongoose')
const validator = require('validator')
// import validator from 'validator'
// const bcrypt = require('bcrypt')

// const strongPasswordRegex = new RegExp(
//   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
// )

// const emailRegex = new RegExp(
//   '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
// )

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// const User = mongoose.model('User', UserSchema)

// static signup

UserSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  // if (!strongPasswordRegex.test(password)) {
  //   throw Error('Password not strong enough')
  // }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password does not meet the requirements')
  }
  // if (password.length < 8) {
  //   throw Error('Password must be at least 8 characters long')
  // }

  // if (!password.match(/[A-Z]/)) {
  //   throw Error('Password must contain at least 1 uppercase letter')
  // }

  // if (!password.match(/[a-z]/)) {
  //   throw Error('Password must contain at least 1 lowercase letter')
  // }

  // if (!password.match(/[0-9]/)) {
  //   throw Error('Password must contain at least 1 number')
  // }

  // if (!password.match(/[!@#\$%\^&\*]/)) {
  //   throw Error('Password must contain at least 1 special character')
  // }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  //bcrypt
  // const salt = await bcrypt.genSalt(10)
  // const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password }).catch((err) => {
    throw err
  })

  return user
}

/*
UserSchema.statics.signup = (email, password) => {
  return User.findOne({ email })
    .then(exists => {
      if (exists) {
        throw Error('Email already in use');
      }
      return bcrypt.genSalt(10);
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({ email, password: hash }))
    .catch(err => {
      throw err;
    });
};
*/
// module.exports = (User, UserSchema)
module.exports = mongoose.model('User', UserSchema)
