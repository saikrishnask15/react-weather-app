import { useEffect, useRef, useState } from "react";
import "./weather.css";
import search_img from "../assets/search_btn.svg";
import sun_img from "../assets/sun.png";
import cloudy_img from "../assets/cloudy.png";
import day_thunder_rain from "../assets/day_thunder_rain.png";
import rainy_img from "../assets/rainy-day.png";
import moon_clear from "../assets/moon_clear.png";
import night_cloudy from "../assets/night_cloudy.png";
import night_thunder from "../assets/night-thunder.png";
import snow from "../assets/snowflake.png";
import night_rain from "../assets/night_rain.png";
import mist from '../assets/mist.png';

const Weather = () => {
  //for setting search input
  const [locationValue, setLocationValue] = useState();
  const handleChange = (e) => {
    setLocationValue(e.target.value);
  };
  
  const inputRef = useRef();
  //setting data from api
  const [weatherData, setWeatherData] = useState({});
  const api_key = "4b2d25faec39a5d905f458aed5b5f09a";
  const search = async (city) => {
    const allIcons = {
      "01d": sun_img,
      "01n": moon_clear,
      "02d": cloudy_img,
      "02n": night_cloudy,
      "03d": cloudy_img,
      "03n": night_cloudy,
      "04d": rainy_img,
      "04n": night_rain,
      "09d": rainy_img,
      "09n": night_rain,
      "10d": rainy_img,
      "10n": night_rain,
      "11d": day_thunder_rain,
      "11n": night_thunder,
      "13d": snow,
      "13n":snow,
      "50d": mist,
      "50n": mist,
    };
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();

      if(!res.ok){
        alert("city not found");
        return;

      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun_img;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country:data.sys.country,
        icon: icon,
      });

    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching weather data");
    }
  };
  useEffect(() => {
    search("Hyderabad");
  }, []);

  return (
    <div className="weather-ctn">
      <div className="serach-ctn">
        <input ref={inputRef}
          type="text"
          placeholder="search"
          value={locationValue}
          onChange={handleChange}
        />
        <img src={search_img} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <div className="weather-symbol-ctn">
        <img src={weatherData.icon} alt="" />
        <p className="tempearture">{weatherData.temperature}°c</p>
        <p className="location">{weatherData.location},{weatherData.country}</p>
      </div>
      <div className="weather-data">
        <div className="col">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M562.1 383.9c-21.5-2.4-42.1-10.5-57.9-22.9-14.1-11.1-34.2-11.3-48.2 0-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9 .8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1 .8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3zm0-144c-21.5-2.4-42.1-10.5-57.9-22.9-14.1-11.1-34.2-11.3-48.2 0-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9 .8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1 .8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3zm0-144C540.6 93.4 520 85.4 504.2 73 490.1 61.9 470 61.7 456 73c-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9 .8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1 .8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3z" />
          </svg>
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z" />
          </svg>
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>:<></>}
      
    </div>
  );
};

export default Weather;
