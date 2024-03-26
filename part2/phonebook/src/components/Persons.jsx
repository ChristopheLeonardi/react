import servicePhonebook from '../services/phonebook'
const handleDeleteAction = (id, persons, setPersons) => {
  let entry = persons.find(person => person.id === id)
  if (!window.confirm(`Delete ${entry.name} ?`)) { return }
  servicePhonebook.remove(id)
  .then(data => {
    setPersons(persons.filter(person => person.id !== data.id))
  })
}
const Persons = ({persons, setPersons}) => {
    return(
      <ul>
        {persons.map(person => {
          return(
              <li key={person.id}>
                <p>{person.name} {person.number}</p>
                <button 
                  key={`rmButton-${person.id}`}
                  onClick={() => {handleDeleteAction(person.id, persons, setPersons)}}>Delete</button>
              </li>
          )

            
        })}
      </ul>
    )
}
export default Persons