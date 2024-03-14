const Header = ({name}) => {
  return(
    <h1>{name}</h1>
  )
}
const Content = ({data}) => {
  return(
    data.map(part => {
      return <p>{part.name} {part.exercises}</p>
    })
  )
}

const Total = ({data}) => {
  var total = 0
  data.map(part => {total += part.exercises})
  return(
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content data={course.parts}/>
      <Total data={course.parts}/>

    </div>
  )
}

export default App
