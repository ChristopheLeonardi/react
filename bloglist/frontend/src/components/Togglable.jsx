import { useState } from 'react'


const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(props.initialView)
  const [blogButttonLabel, setBlogButtonLabel] = useState(props.initialView ? props.showLabel : props.hideLabel)
  const handleVisible = (e) => {
    setIsVisible(!isVisible)
    e.target.dataset.label === props.showLabel
      ? setBlogButtonLabel(props.hideLabel)
      : setBlogButtonLabel(props.showLabel)
  }
  return(
    <div>
      <button onClick={handleVisible} data-label={blogButttonLabel}>{blogButttonLabel}</button>
      {isVisible && props.children}
    </div>
  )
}

export default Togglable