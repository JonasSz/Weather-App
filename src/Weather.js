import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './Styles/Weather.css';
import './Styles/WeatherResp.css';
import Background from './Pictures/FullBG.png';


function App() {

  const [isSearched, setIsSearched] = useState(false);
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8f9aa3e1717f06973d70e426063de566`;
  
 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('');
      setIsSearched(true);
    }
  }



return (
  <>

  {isSearched ? (
    <div className="App-content">

      <div className="picture">
      <img src={Background} className='app-bg' alt='Background pic'/>
      </div>
      

      <div className="search-bar">
      <input
      className='search' 
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder='Search Location...'
      type="text"/>
    </div>

    <div className="city-name">
      <p>
      <strong>
      {data.name}
      </strong>
      </p>
    </div>

    <div className="temperature">
      <div className="current-temperatur">
      {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
      </div>


      <div className="min-temperature">
     {data.main ? <h1>{data.main.temp_min.toFixed()}°/</h1> : null}
    </div>

    <div className="max-temperature">
     {data.main ? <h1>{data.main.temp_max.toFixed()}°</h1> : null}
    </div>
     
    </div>

    <div className="weather" >
    {data.weather ? <strong>{data.weather[0].main}</strong> : null}
    </div>

    <div className="feelsLike">
      <strong className='feelsLike-p-1'>Feels like</strong>
      {data.main ? <p  className='feelsLike-p-2'>{data.main.feels_like.toFixed()}°</p> : null}
    </div>

    <div className="humidity-and-windSpeed">
    <div className="humidity">
      <p>Humidity</p>
    {data.main ? <p className='humidity-number'>{data.main.humidity.toFixed()}%</p> : null}
    </div>

    <div className="wind-speed">
      <p>wind speed</p>
    {data.wind ? <p className='wind-speed-number'>{data.wind.speed.toFixed()} km/h</p> : null}
    </div>
    </div>

    


    </div> 
  ) : (
    <>
    <div className="picture">
      <img src={Background} className='app-bg' alt='Background pic'/>
      </div>

    <div className="search-bar">
    <input
    className='search-start' 
    value={location}
    onChange={event => setLocation(event.target.value)}
    onKeyPress={searchLocation}
    placeholder='Search Location...'
    type="text"/>
  </div>
  </>
  )}
    
    </>
  );

}

export default App;