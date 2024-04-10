const LoginGreetings = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  return (
    <>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}
export default LoginGreetings