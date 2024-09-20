const apikey = "2dc696839d5210eaf136cb866bfd5d21";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
  if (!city) {
    console.error('City name is required');
    return;
  }

  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apikey}`);

    if (!response.ok) {
      // Handle HTTP errors, e.g., city not found
      if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        throw new Error('Failed to fetch weather data');
      }
      return; 
    }

    const data = await response.json();

    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    if (cityElement) cityElement.innerHTML = data.name;
    if (tempElement) tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    if (humidityElement) humidityElement.innerHTML = data.main.humidity + "%";
    if (windElement) windElement.innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        if (weathericon) weathericon.src = "images/clouds.png";
        break;
      case "Clear":
        if (weathericon) weathericon.src = "images/clear.png";
        break;
      case "Rain":
        if (weathericon) weathericon.src = "images/rain.png";
        break;
      case "Drizzle":
        if (weathericon) weathericon.src = "images/drizzle.png";
        break;
      case "Mist":
        if (weathericon) weathericon.src = "images/mist.png";
        break;
      default:
        if (weathericon) weathericon.src = "images/default.png";
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  } catch (error) {
    console.error('Error fetching weather data:', error);
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    if (cityElement) cityElement.innerHTML = "Error fetching data.";
    if (tempElement) tempElement.innerHTML = "";
    if (humidityElement) humidityElement.innerHTML = "";
    if (windElement) windElement.innerHTML = "";
    if (weathericon) weathericon.src = "images/error.png";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value.trim());
});

// Optional: Automatically check weather when Enter key is pressed
searchbox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkweather(searchbox.value.trim());
  }
});
