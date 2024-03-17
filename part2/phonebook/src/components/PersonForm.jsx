import { useState } from 'react'

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

    var existing = persons.find(person => {return person.name == newName}) ? true : false

    if (existing) { 
      alert(`${newName} is already added to phonebook`)
      return 
    
    }
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newNameObject))
    setInitialPersons(persons.concat(newNameObject))
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