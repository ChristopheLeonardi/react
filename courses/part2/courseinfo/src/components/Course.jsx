const Header = ({name}) => {
    return(
      <h1>{name}</h1>
    )
  }
const Content = ({data}) => {
    return(
        data.map(part => {
            return <p key={part.id} >{part.name} {part.exercises}</p>
        })
    )
}

const Total = ({data}) => {
    var total = data.reduce((sum, part) => { return sum + part.exercises}, 0)
    return(
        <p>Number of exercises {total}</p>
    )
}
  
const Course = ({course}) => {
    return(
        <>
            <Header name={course.name}/>
            <Content data={course.parts}/>
            <Total data={course.parts} />
        </>
    )
}
export default Course