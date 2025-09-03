async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");
  const errorBox = document.getElementById("error");

  if (!city) {
    errorBox.textContent = "Please enter a city name.";
    resultBox.classList.add("hidden");
    return;
  }

  const apiKey = "408c078812504ee79db72939250309 ";  // 🔁 Replace with your actual WeatherAPI key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      errorBox.textContent = data.error.message;
      resultBox.classList.add("hidden");
    } else {
      errorBox.textContent = "";
      document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
      document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;
      document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.current.wind_kph} kph`;
      document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;
      resultBox.classList.remove("hidden");
    }
  } catch (err) {
    errorBox.textContent = "Failed to fetch weather data. Please try again.";
    resultBox.classList.add("hidden");
    console.error(err);
  }
}
