import { useState } from 'react'


const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad, total}) => {
  if(total == 0){
    return(
      <p>No feedback given</p>
    )
  }
  else {
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={total != 0 ? (good - bad) / total : 0} />
          <StatisticLine text="positive" value ={(total != 0 ? good / total * 100: 0) + "%"} />
        </tbody>
      </table>
    )
  }
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const onClickAction = (option) => {
    if(option == "good"){
      setGood(good + 1)
    }
    if(option == "neutral"){
      setNeutral(neutral + 1)
    }
    if(option == "bad"){
      setBad(bad + 1)
    }
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => {onClickAction("good")}} text="good"/>
      <Button onClick={() => {onClickAction("neutral")}} text="neutral"/>
      <Button onClick={() => {onClickAction("bad")}} text="bad"/>

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>

    </div>
  )
}

export default App
