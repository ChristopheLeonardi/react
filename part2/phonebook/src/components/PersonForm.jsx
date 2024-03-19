import { useState } from 'react'
import servicePhonebook from '../services/phonebook'

const PersonForm = ({persons, setPersons, setInitialPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleOnSubmit = (event) => {
    event.preventDefault()

    var existing = persons.find(person => {return person.name == newName})

    if (existing) { 
      if(!window.confirm(`${newName} is already added to phonebook. Change the phone number ?`)){ return }
      const updatedContact = { ...existing, number:newNumber }
      servicePhonebook.update(existing.id, updatedContact)
        .then(data => {
          var newPersons = persons
            .filter(person => person.id !== data.id)
            .concat(data)

          setPersons(newPersons)
          setInitialPersons(newPersons)
        })
      return 
    }
    const newNameObject = {
      name: newName,
      number: newNumber    
    }
    servicePhonebook.create(newNameObject)
      .then(data => {
        setPersons(persons.concat(data))
        setInitialPersons(persons.concat(data))
      })

  }

  return (
    <form>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit" onClick={handleOnSubmit}>add</button>
      </div>
    </form>
  )
}
export default PersonForm