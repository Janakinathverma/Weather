let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Function to get the country name from the country code
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Function to get the formatted date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

// Initial city (default)
let city = "New Delhi";

// Search functionality to update the city and fetch new data
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityInput = document.querySelector(".city_name");
  city = cityInput.value.trim();
  if (city) {
    getWeatherData();
    cityInput.value = "";
  }
});

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async () => {
  const apiKey = '70c7ebfc1ab08ba7b18d40095ca69266'; // Replace with your API key
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) {
      throw new Error(`City not found: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${sys ? getCountryName(sys.country) : "Unknown country"}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="Weather icon" />`;

    const tempCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

    w_temperature.innerHTML = `${tempCelsius(main.temp)}&#176C`;
    w_minTem.innerHTML = `Min: ${tempCelsius(main.temp_min)}&#176C`;
    w_maxTem.innerHTML = `Max: ${tempCelsius(main.temp_max)}&#176C`;

    w_feelsLike.innerHTML = `${tempCelsius(main.feels_like)}&#176C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    cityName.innerHTML = "City not found or an error occurred";
    dateTime.innerHTML = "";
    w_forecast.innerHTML = "";
    w_icon.innerHTML = "";
    w_temperature.innerHTML = "";
    w_minTem.innerHTML = "";
    w_maxTem.innerHTML = "";
    w_feelsLike.innerHTML = "N/A";
    w_humidity.innerHTML = "N/A";
    w_wind.innerHTML = "N/A";
    w_pressure.innerHTML = "N/A";
  }
};

// Load the weather data for the default city when the page is loaded
window.addEventListener("DOMContentLoaded", getWeatherData);
