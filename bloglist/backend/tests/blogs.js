const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('correct amount of blogs is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id is the identifier', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  
  const arrIds = await response.body.map(blog => blog.id).sort()
  const helperIds = helper.initialBlogs.map(blog => blog._id).sort()
  assert.deepStrictEqual(arrIds, helperIds)
})

test('succesfully create new blog', async () => {

  const newBlog = {
    title: "News",
    author: "John Doe",
    url: "google.com",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map(b => b.title)
  assert(titles.includes(newBlog.title))
})

test('default likes is 0 on new blog', async () => {

  const newBlog = {
    title: "likes",
    author: "John Doe",
    url: "google.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  const postedBlog = blogAtEnd.find(blog => blog.title === newBlog.title)
  assert.strictEqual(postedBlog.likes, 0)
})

test('blog have a title or an url', async () => {
  const newBlog = {
    title: "dz",
    author: "John Doe",
    url: "dzz",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

})

test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.blogsInDb()
  assert.strictEqual(notesAtEnd.length + 1, blogsAtStart.length)
})

test('blog is successfully updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = {...blogToUpdate, likes:125}

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
  
  const blogs = await helper.blogsInDb()
  const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, newBlog.likes)
})
after(async () => {
  await mongoose.connection.close()
})
