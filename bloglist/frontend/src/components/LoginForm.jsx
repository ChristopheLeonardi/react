import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'
import FormEntry from './FormEntry'

const LoginForm = ({ setUser, setNotificationMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    try{
      var response = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(response))
      blogService.setToken(response.token)

      setUser(response)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <FormEntry name="username" value={username} setValue={setUsername}/>
      <FormEntry name="password" value={password} setValue={setPassword}/>
      <button type='submit'>submit</button>
    </form>
  )
}

export default LoginForm