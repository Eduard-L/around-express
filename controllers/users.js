// handlers for sending data to the user // async opertaion

const User = require('../models/user')
const NOTFOUND_CODE = 404;
const VALIDATION_CODE = 400;


const getUsersData = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    }
    else {
      res.send('something went wrong with the users')
    }


  } catch (e) {

    res.status(500).send('{ message: some thing went wrong with the server }');

  }
};

const getUserById = async (req, res) => {
  console.log(req.params)

  try {
    const user = await User.findById(req.params.id)

    if (user) {
      res.status(200).send(user);
    } else {
      res.send(' something went wrong ');
    }
  } catch (e) {
    console.log(e)
    if (e.name === "CastError") {
      res.status(NOTFOUND_CODE).json("User has not found")
      return;
    }

    res.status(500).send('{ message: some thing went wrong with the server }');




  }
};

const createUser = async (req, res) => {

  const { name, about, avatar } = req.body
  try {
    const newUser = await User.create({ name: name, about: about, avatar: avatar });
    if (newUser) {
      res.status(200).send(newUser)
    }
    else {
      res.json("something went wrong with user creation")
    }

  }
  catch (e) {
    if (e.name === 'ValidationError') {
      res.status(VALIDATION_CODE).json('you have sent a invalid info to the server')
      return;
    }
    res.status(500).json('something went wrong with user creation')
  }
}

const updateUserInfo = async (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body

  try {
    const updateInfo = await User.findByIdAndUpdate(userId, { name: name, about: about })
    if (updateInfo && (name || about)) {
      res.status(200).send('the user Info updated successfully')
    }
    else {
      res.send("something went wrong with the update")
    }
  }
  catch (e) {
    res.status(500).send(`something went wrong with the backend, ${e}`)
  }

}

const updateUserAvatar = async (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body

  try {
    const updateInfo = await User.findByIdAndUpdate(userId, { avatar: avatar })
    if (updateInfo && avatar) {
      res.status(200).send('the user avatar updated successfully')
    }
    else {
      res.send("something went wrong with the update avatar")
    }
  }
  catch (e) {
    res.status(500).send(`something went wrong with the backend, ${e}`)
  }


}

const deleteUser = async (req, res) => {
  const id = req.params.id

  try {
    const deleteUser = await User.findByIdAndDelete(id)

    if (deleteUser) {
      res.status(200).json(`{the user has been deleted : ${deleteUser}}`)
    }
    else {
      res.send("error while deleting user")
    }
  }
  catch (e) {
    res.status(500).send("server error")
  }
}
module.exports = { deleteUser, getUsersData, getUserById, createUser, updateUserAvatar, updateUserInfo };
