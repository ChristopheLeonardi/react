import { useState } from 'react'
import './App.css'
import Result from './components/Result'
import Form from './components/Form'

function App() {
  const [search, setSearch] = useState("")

  return (
    <>
      <Form search={search} setSearch={setSearch}/>
      <Result search={search}/>
    </>
  )
}

export default App
