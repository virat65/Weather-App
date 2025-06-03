import seach_icon from "../../src/assets/search.png";
import sun from "../../src/assets/sun.png";
import wind from "../../src/assets/wind.png";
import weather from "../../src/assets/weather.png";
import "./Weather.css";
import { useEffect, useRef, useState } from "react";
const Weather = () => {
  const inputRef = useRef();
  const [weatherdata, setWeatherdata] = useState(false);
  const allIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    "13n": "https://openweathermap.org/img/wn/13n@2x.png",
    "50d": "https://openweathermap.org/img/wn/50d@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  };

  const search = async (city) => {
    city = city && city.trim();
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        alert(data.message || "City not found");
        return;
      }
      const w_icon = allIcons[data.weather[0].icon];
      setWeatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: w_icon,
      });
    } catch (error) {
      console.log(error, "Error occured in catch block");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <img
          src={seach_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={sun} alt="" className="img-fit weather-icon" />
      <p className="temperature">{weatherdata.temperature}°c</p>
      <p className="location">{weatherdata.location}</p>
      <div className="data">
        <div className="weather-data">
          <div className="col">
            <img src={weather} alt="" className="img-fit" />
            <div>
              <p>{weatherdata.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
        </div>
        <div className="weather-data">
          <div className="col">
            <img src={wind} alt="" className="img-fit" />
            <div>
              <p>{weatherdata.windSpeed} Km/h</p>
              <p>Wind_Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
