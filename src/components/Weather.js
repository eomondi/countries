import axios from "axios";
import { useState } from "react";

function Weather({ capital }) {
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [wind, setWind] = useState();

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
    .then((response) => {
      setIcon(response.data.weather[0].icon);
      setTemp(response.data.main.feels_like);
      setWind(response.data.wind.speed);
    });

  return (
    <section>
      <p>
        <strong>Weather in {capital}</strong>
      </p>
      <p key={temp}>
        Temperature: {temp} <span>&#8451;</span>
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather-icon"
        key={icon}
      ></img>
      <p key={wind}>Wind speed: {temp} m/s</p>
    </section>
  );
}

export default Weather;
