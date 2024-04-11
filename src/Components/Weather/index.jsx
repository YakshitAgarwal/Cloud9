import { useEffect, useState } from "react";
import Search from '../Search';



export default function Weather(){
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param){
        setLoading(true);
        try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=1d03d0efee2b4347794daf3c359dd884`);
         
        
        const data = await response.json();
        console.log(data)
        if(data){
            setWeatherData(data)
            setLoading(false)
        }
        } catch(e){
            setLoading(false);
            console.log(e);
        }
    }

    function temp1(){
        return Math.round(weatherData?.main?.temp-273.15)
    }


    function temp2(){
        return Math.round(weatherData?.main?.feels_like-273.15)
    }


    function getCurrentDate(){
        return new Date().toLocaleDateString('en-us', {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    useEffect(()=>{
        fetchWeatherData("Mumbai");
    }, []);

    async function handleSearch(){
        fetchWeatherData(search)
    }


    return(
        <div className='content'>
            <Search 
                search = {search}
                setSearch = {setSearch}
                handleSearch = {handleSearch}
            />
            {
                loading ? <div>Loading...</div>:
                <div>
                    <div className="cityName">
                        <p>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></p>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp1">
                        {temp1()}°C | {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].main : ''}
                    </div>
                    <div className="box1">
                        <div className="temp2">
                            <p>Feels Like</p>
                            {temp2()}°C
                        </div>
                        <div className="description">
                            <p>Description</p>
                            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                        </div>
                    </div>
                    <div className="box2">
                        <div className="wind">
                            <p>Wind Speed</p>
                            {weatherData?.wind?.speed} km/hr
                        </div>
                        <div className="humidity">
                            <p>Humidity</p>
                            {weatherData?.main?.humidity}%
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}