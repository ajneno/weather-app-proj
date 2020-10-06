function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0 ${hours} `;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes} `;
  }
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let units = "metric";

  let apiKey = "34ab83f78081d8121e2f9a19e2f4db72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#searchEngine").value;
  searchCity(city);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "34ab83f78081d8121e2f9a19e2f4db72";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units="metric" `;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("Click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");
