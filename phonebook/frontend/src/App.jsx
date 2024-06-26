import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import servicePhonebook from './services/phonebook'
import './index.css'

const App = () => {
  const [initialPersons, setInitialPersons] = useState(null)
  const [persons, setPersons] = useState(initialPersons)

  useEffect(() => {
    servicePhonebook.getAll()
      .then(data => {
        setInitialPersons(data)
        setPersons(data)
      })
  }, [])

  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter 
        setPersons={setPersons} 
        initialPersons={initialPersons}
        />
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        setInitialPersons={setInitialPersons}
        />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        setPersons={setPersons}/>
    </div>
  )
}

export default App
