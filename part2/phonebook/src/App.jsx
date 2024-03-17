import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const Persons = ({persons}) => {
  return(
    <ul>
      {persons.map(person => {
        return <li key={person.id}>{person.name} {person.number}</li>
      })}
    </ul>
  )
}
const App = () => {
  const [initialPersons, setInitialPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [persons, setPersons] = useState(initialPersons)

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
