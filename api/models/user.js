const mongoose = require('mongoose')
const validator = require('validator')
// const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
})

const User = mongoose.model('User', UserSchema)

// static signup

// UserSchema.statics.signup = async function (email, password) {
//   const exists = await User.findOne({ email })

//   //validation
//   if (!email || !password) {
//     throw Error('All fields must be filled')
//   }

//   if (!validator.isEmail(email)) {
//     throw Error('Email is not valid')
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error('Password not strong enough')
//   }

//   if (exists) {
//     throw Error('Email already in use')
//   }

//bcrypt
// const salt = await bcrypt.genSalt(10)
// const hash = await bcrypt.hash(password, salt)

// const user = await this.create({ email, password: hash })

//   return user
// }

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
module.exports = User
