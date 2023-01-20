const User = require('../models/user')
const UserSchema = require('../models/user')

const UsersController = {
  Create: async (req, res) => {
    const payload = new User(req.body)
    const email = payload.email
    const password = payload.password
    const username = payload.username 

    try {
      const user = await User.signup(username, email, password)
      res.status(201).json({ username, email, password })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  UpdateProfilePicture: async(req,res) => {
    const filter = { username: req.body.username };
    const new_picture = req.body.new_picture;
    console.log("new picture: ",req.body.new_picture)
    const update = { picture: new_picture };
    let test= await User.findOneAndUpdate(filter, update);
    console.log("TEST:", test)
    const Updateduser = await User.findOne(filter);

    res.json(Updateduser)
  },
  getProfile: async(req, res) => {

    const filter = {username: req.param("username") };
    const user = await User.find(filter)
    res.json(user)
    console.log("User: ", user.username)
  },
}

module.exports = UsersController
