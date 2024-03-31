import PropTypes from 'prop-types';
import { useState } from 'react';

const Filter = ({ setPersons, initialPersons }) => {

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    var regex = new RegExp(`${event.target.value}`, 'gi');
    const filtered = initialPersons.filter(person => { return person.name.search(regex) !== -1 });
    setPersons(filtered);
  };

  return (
    <div>search <input value={search} onChange={handleSearch} /></div>
  );
};

Filter.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
  })),
  setPersons: PropTypes.func,
  initialPersons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string
  }))
};


export default Filter;
