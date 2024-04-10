import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoginGreetings from './components/LoginGreetings'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import AddBlog from './components/AddBlog'
import './index.css'

const App = () => {

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [listNeedUpdate, setListNeedUpdate] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      setListNeedUpdate( false )
    })
  }, [listNeedUpdate])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedBlogsAppUser')
    if (user){
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {notificationMessage !== null && <p>{notificationMessage}</p>}
      {user === null
        ? <LoginForm setUser={setUser} setNotificationMessage={setNotificationMessage}/>
        : <div>
          <LoginGreetings user={user} setUser={setUser}/>
          <Togglable showLabel='Hide Form' hideLabel='Create Blog' initialView={false}>
            <AddBlog setNotificationMessage={setNotificationMessage} setListNeedUpdate={setListNeedUpdate}/>
          </Togglable>
          <BlogList blogs={blogs} setBlogs={setBlogs} setListNeedUpdate={setListNeedUpdate} listNeedUpdate={listNeedUpdate}/>
        </div>
      }
    </div>
  )
}

export default App