import PropTypes from 'prop-types'

const FormEntry = ({ name, value, setValue }) => {
  return(
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        value={value}
        onChange={({ target }) => {setValue(target.value)}}/>
    </div>
  )
}
FormEntry.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}
export default FormEntry