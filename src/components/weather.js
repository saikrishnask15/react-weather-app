import { useEffect, useRef, useState } from "react";
import "./weather.css";
import sun_img from "../assets/sun.png";
import cloudy_img from "../assets/cloudy.png";
import day_thunder_rain from "../assets/day_thunder_rain.png";
import rainy_img from "../assets/rainy-day.png";
import moon_clear from "../assets/moon_clear.png";
import night_cloudy from "../assets/night_cloudy.png";
import night_thunder from "../assets/night-thunder.png";
import snow from "../assets/snowflake.png";
import night_rain from "../assets/night_rain.png";
import mist from "../assets/mist.png";
import "font-awesome/css/font-awesome.min.css";

const Weather = () => {
  //for setting search input
  const [locationValue, setLocationValue] = useState();
  const handleChange = (e) => {
    setLocationValue(e.target.value);
  };
  //handling search input to api
  const inputRef = useRef();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
      setLocationValue("");
    }
  };
  //date
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = months[d.getMonth()];
  let day = days[d.getDay()];
  let date = d.getDate();

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
      "13n": snow,
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

      if (!res.ok) {
        alert("city not found");
        return;
      }
      console.log(data);
      const period = data.weather[0].icon.includes("n")
        ? "linear-gradient(to left top, #414445, #484c4d, #505355, #575b5e, #5f6366, #6a6e72, #75797e, #81858a, #93989d, #a4abb1, #b7bfc5, #c9d3d9)"
        : "linear-gradient(to left top, #4ca6d1, #6badd6, #83b5da, #99bddd, #acc5e0, #b6cbe2, #c0d0e4, #c9d6e6, #cedbe8, #d4dfeb, #d9e4ed, #dfe8f0)";

      const icon = allIcons[data.weather[0].icon] || sun_img;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country: data.sys.country,
        icon: icon,
        weatherType: data.weather[0].main,
        period: period,
      });
    } catch (error) {
      setWeatherData(false);
      alert("Error in fetching weather data");
      console.log("Error in fetching weather data");
    }
  };
  useEffect(() => {
    search("Hyderabad");
  }, []);

  let backgroundImage = weatherData.period;

  return (
    <div className="container" style={{ backgroundImage }}>
      <div class="weather-app">
        <div class="search-ctn">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter City"
            value={locationValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <i
            class="fa fa-search"
            onClick={() => search(inputRef.current.value)}
          ></i>
        </div>
        <div class="weather">
          <img src={weatherData.icon} alt="" />
          <div class="weather-type">{weatherData.weatherType}</div>
          <div class="tempeature">{weatherData.temperature}°c</div>
          <div className="location">
            {weatherData.location}, {weatherData.country}
          </div>
        </div>
        <div class="weather-date">
          <p>
            {day}, {date} {month}
          </p>
        </div>
        <div class="weather-data">
          <div class="humidity">
            <i class="fa-solid fa-droplet"></i>
            <div>
              <div class="data">{weatherData.humidity}%</div>
              <div class="data-name">humidity</div>
            </div>
          </div>
          <div class="wind">
            <i class="fa-solid fa-wind"></i>
            <div>
              <div class="data">{weatherData.windSpeed}km/h</div>
              <div class="data-name">wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
