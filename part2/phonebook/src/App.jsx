import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [initialPersons, setInitialPersons] = useState([])
  const [persons, setPersons] = useState(initialPersons)

  useEffect(() => {
    axios
      .get("http://localhost:3001/phonebook")
      .then(response => {
        setInitialPersons(response.data)
        setPersons(response.data)

      })
  }, [])

  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} initialPersons={initialPersons}/>
      <PersonForm persons={persons} setPersons={setPersons} setInitialPersons={setInitialPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App
