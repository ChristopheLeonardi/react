import { useState } from 'react'

const Filter = ({persons, setPersons, initialPersons}) => {

  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
    var regex = new RegExp(`${event.target.value}`, 'gi'); 
    const filtered = initialPersons.filter(person => { return person.name.search(regex) != -1})
    setPersons(filtered)

  }

  return(
    <div>search <input value={search} onChange={handleSearch}/></div>
  )
}
export default Filter