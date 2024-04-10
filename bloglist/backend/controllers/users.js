const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
  
})
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const users = await User.find({})
  const usersInbase = users
  const is_unique = usersInbase.find(user => user.username === username)

  if(username && password && username.length > 3 && password.length > 3 && !is_unique) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    response.status(400).end()
  }
})



module.exports = usersRouter
