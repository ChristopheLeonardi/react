import servicePhonebook from '../services/phonebook'
import PropTypes from 'prop-types'

const handleDeleteAction = async (id, persons, setPersons) => {
  let entry = persons.find(person => person.id === id)

  if (!window.confirm(`Delete ${entry.name} ?`)) { return }
  await servicePhonebook.remove(id)
  const data = await servicePhonebook.getAll()
  setPersons(data)

}
const Persons = ({persons, setPersons}) => {
    return(
      <ul>
        {persons && persons.map(person => {
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
Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
  })),
  setPersons: PropTypes.func
}
export default Persons