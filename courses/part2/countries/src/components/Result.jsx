import { useState, useEffect } from 'react'
import axios from 'axios'

const Result = ({search}) => {
    const [allData, setAllData] = useState(null)
    const [singleData, setSingleData] = useState(null)
    const [weatherData, setWeathereData] = useState(null)
    const [list, setList] = useState(null)
  
    const query_all = () => {
      const query = "https://studies.cs.helsinki.fi/restcountries/api/all"
      axios.get(query)
        .then((response) =>{
          setAllData(response.data)
        })
    }
  
    const query_single = (country) => {
      const query = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
      axios.get(query).then((response) =>{
        setSingleData(response.data)
        var api = "8eac97b062bfbfc2b6e1a600868b745f"
        const wQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data.capitalInfo.latlng[0]}&lon=${response.data.capitalInfo.latlng[1]}&appid=${api}`
        axios.get(wQuery).then(wResponse => {
          setWeathereData(wResponse.data)
        })
        setList(null)
      })
    }
  
    useEffect(() => {
      if(!allData){ 
        query_all()
        return
      }
      const regex = new RegExp(search, "i")
      const filteredCountries = allData.filter(item => {
        return item.name.common.match(regex)
      })
  
      if(filteredCountries.length > 10){
        setList(["Too many matches, specify another filter"])
        setSingleData(null)
      }
      else if(filteredCountries.length > 1){
        setList(filteredCountries.map(country => {return country.name.common}))
        setSingleData(null)
      }
      else if (filteredCountries.length == 1){
        query_single(filteredCountries[0].name.common)
      }
    }, [search])
  
    return(
      <div>
        {list && list.map((country, index) => {
          return (
            <div key={`r-${index}`}>
              <p>{country}</p>
              {index > 1 && <button onClick={() => {query_single(country)}}>Show</button>}
            </div>)
        })}
        {singleData && 
          <div>
            <h2>{singleData.name.common}</h2>
            <p>{singleData.capital}</p>
            <p>{singleData.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.keys(singleData.languages).map(key => {
                return <li>{singleData.languages[key]}</li>
              })}
            </ul>
            <img src={singleData.flags.png}/>
          </div>
        }
        {singleData && weatherData && 
          <div>
            <h2>Weather in {singleData.capital}</h2>
            <p>Température : {weatherData.main.temp - 273.15}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
            <p>Wind : {weatherData.wind.speed}m/s</p>
          </div>
        }
      </div>
    )
  }

  export default Result