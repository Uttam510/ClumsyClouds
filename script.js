// OpenWeatherMap API config
const apiKey = '4e1d93f08903cc274c57e0d922829ea7';  // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Get DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const cityNameElem = document.getElementById('city-name');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const humidityElem = document.getElementById('humidity');
const windSpeedElem = document.getElementById('wind-speed');
const feelsLikeElem = document.getElementById('feels-like');
const weatherIconElem = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});

// Fetch weather data from OpenWeatherMap API
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('An error occurred while fetching the weather data.');
    }
}

// Display the fetched weather information
function displayWeather(data) {
    const { name, main, weather, wind } = data;

    cityNameElem.textContent = name;
    temperatureElem.textContent = `${Math.round(main.temp)}°C`;
    descriptionElem.textContent = weather[0].description;
    humidityElem.textContent = main.humidity;
    windSpeedElem.textContent = wind.speed;
    feelsLikeElem.textContent = `${Math.round(main.feels_like)}°C`;
    weatherIconElem.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Handle errors and display an error message
function displayError(message) {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}


// Function to display weather news in the red box
function displayWeatherNews(articles) {
    const newsList = document.getElementById('weather-news-list');
    newsList.innerHTML = ''; // Clear any existing news

    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(listItem);
    });
}

// Function to handle errors
function displayError(message) {
    const newsList = document.getElementById('weather-news-list');
    newsList.innerHTML = `<li>${message}</li>`;
}
document.querySelectorAll('.wind-leaf').forEach(leaf => {
    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.animationDuration = (8 + Math.random() * 5) + 's';
});

