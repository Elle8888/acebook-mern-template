const User = require('../models/user')
const UserSchema = require('../models/user')

const UsersController = {
  Create: async (req, res) => {
    const payload = new User(req.body)
    const email = payload.email
    const password = payload.password

    try {
      const user = await User.signup(email, password)
      res.status(201).json({ email, password })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
}

module.exports = UsersController
