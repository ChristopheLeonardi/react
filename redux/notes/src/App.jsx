import React from 'react'
import ReactDOM from 'react-dom/client'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {

  return(
    <div>
      <NewNote/>
      <Notes/>
    </div>
  )
} 

export default App