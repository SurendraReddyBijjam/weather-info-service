import fetch from 'node-fetch';

// Defining the API key and base URL for the Weatherstack API
const API_KEY = 'f7f8f997d89531fc90a8ab2c9b3f255c';
const BASE_URL = 'http://api.weatherstack.com/current';

// Function to fetch weather data for a given city
async function getWeather(city) {
  const url = `${BASE_URL}?access_key=${API_KEY}&query=${city}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Error fetching weather data: ${data.error.info}`);
    }

    const { location, current } = data;
    console.log(`Weather in ${location.name}, ${location.country}:`);
    console.log(`Temperature: ${current.temperature}°C`);
    console.log(`Weather: ${current.weather_descriptions[0]}`);
    console.log(`Humidity: ${current.humidity}%`);
    console.log(`Wind Speed: ${current.wind_speed} km/h`);
  } catch (error) {
    console.error(error.message);
  }
}

// Prompt user for input and fetch weather data
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter a city to get the weather information: ', (city) => {
  getWeather(city);
  rl.close();
});
