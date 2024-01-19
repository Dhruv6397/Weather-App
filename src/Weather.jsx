import React, { useEffect,useState } from 'react'
import './Weathr.css'
export default function Weather() {
    const [location,locationData ] = useState([]);
    const [current,setCurrent] = useState([]);
    const [search,setSearch] = useState('');
    const [status,setStatus] = useState(false);
    const func= async()=>{
        let raw = await fetch(`http://api.weatherapi.com/v1/current.json?key=df227d2cf6664e879ca115948241901&q=${search}&aqi=yes`)
        let parsedData = await raw.json();
        setCurrent(parsedData.current)
        locationData(parsedData.location)
        
    }
    useEffect(()=>{
            func() 
    },)
    const submt=(e)=>{
        e.preventDefault();
        func()
    }
  return (
    <>
      <form className='search-box' onSubmit={submt}>
        <input text="" placeholder='Give your city name...' value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        <button>SEARCH</button>
      </form>
      {location? <div className='main-container'>
        <div className='location'>
            <h1>{location.name?location.name:`we could not find ${search}`}</h1>
            <h2>Country : {location.country?location.country:"Country not found"}</h2>
            <h2>Local time: {location.localtime?location.localtime:"Time is not specified"}</h2>
        </div>
        <div className='current'>
            <h2>Last Updated: {current.last_updated?current.last_updated:"Data not found"}</h2>
            <h2>Temperature in celsius : {current.temp_c?current.temp_c:"Data not found"} C</h2>
            {/* <h2>Condition:{current.condition.text?current.condition.text:"Data not found"}</h2> */}
            <h2>Wind degree:{current.wind_degree?current.wind_degree:"Data not found"}</h2>
            <h2>Cloud:{current.cloud?"Cloudy":"Not cloudy"}</h2>
            <h2>Humidity:{current.humidity?current.humidity:"Data not found"}</h2>
        </div>
      </div>:<h1>{``}</h1>}
      
      
     
    </>
  )
}
