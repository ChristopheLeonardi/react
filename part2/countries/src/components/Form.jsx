const Form = ({ search, setSearch }) => {
    const handleInputChange = e => {
      setSearch(e.target.value)
    }
    return(
      <form>
        <label>find country : </label>
        <input value={search} onChange={handleInputChange}></input>
      </form>
    )
  }

  export default Form