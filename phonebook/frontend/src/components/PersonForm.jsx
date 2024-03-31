import PropTypes from 'prop-types';

import { useState } from 'react'
import Notification from './Notification'
import servicePhonebook from '../services/phonebook'

const PersonForm = ({persons, setPersons, setInitialPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message:"", type:""})


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
      servicePhonebook
        .update(existing.id, updatedContact)
        .then(data => {
          var newPersons = persons
            .filter(person => person.id !== data.id)
            .concat(data)

          setPersons(newPersons)
          setInitialPersons(newPersons)
          setNotificationMessage({message:`${newName} number changer`, type:"info"})
        
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotificationMessage({message: error.response.data.error, type:"error"})
          return
        })

      return 
    }
    const newNameObject = {
      name: newName,
      number: newNumber    
    }
    servicePhonebook
      .create(newNameObject)
      .then(data => {
        setPersons(persons.concat(data))
        setInitialPersons(persons.concat(data))
        setNotificationMessage({message:`added ${newName}`, type:"info"})
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotificationMessage({message: error.response.data.error, type:"error"})
        return
      })

  }

  return (
    <form>
      <Notification notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage}/>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit" onClick={handleOnSubmit}>add</button>
      </div>
    </form>
  )
}
PersonForm.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
  })),
  setPersons: PropTypes.func,
  setInitialPersons: PropTypes.func
}
export default PersonForm