const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    "title": request.body.title,
    "author": request.body.author,
    "url": request.body.url,
    "likes": request.body.likes,
    "user": user.id
  })

  if (body.title && body.url){
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(blog)
})


module.exports = blogRouter