const apiKey = 'd83e071dc4fa4cfbb89120316262705';
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const errorMsg = document.getElementById('error-msg');
const loader = document.getElementById('loader');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

async function getWeather(city) {
    try {
        errorMsg.classList.add('hidden');
        weatherContainer.classList.add('hidden');
        loader.classList.remove('hidden');

        const url = `${baseUrl}${apiKey}&q=${city}&aqi=yes`;
        const response = await fetch(url);
        const data = await response.json();
        updateUI(data);

    } catch (error) {
        console.error(error);
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
}

function updateUI(data) {
    const location = data.location;
    const current = data.current;
    const air = data.current.air_quality;

    document.getElementById('city-name').innerText = `${location.name}, ${location.region}`;
    document.getElementById('current-date').innerText = location.localtime;
    document.getElementById('temp-display').innerText = `${current.temp_c}°C`;
    document.getElementById('condition-text').innerText = current.condition.text;
    document.getElementById('weather-icon').src = `https:${current.condition.icon}`;

    document.getElementById('humidity-val').innerText = `${current.humidity}%`;
    document.getElementById('wind-val').innerText = `${current.wind_kph} km/h`;
    document.getElementById('dew-val').innerText = `${current.dewpoint_c}°C`;
    document.getElementById('uv-val').innerText = current.uv;
    document.getElementById('vis-val').innerText = `${current.vis_km} km`;

    document.getElementById('pm25-val').innerText =  Math.round(air.pm2_5);
    document.getElementById('pm10-val').innerText =  Math.round(air.pm10);
    document.getElementById('co-val').innerText = Math.round(air.co);
    document.getElementById('no2-val').innerText =  Math.round(air.no2);
    document.getElementById('o3-val').innerText =  Math.round(air.o3);

    weatherContainer.classList.remove('hidden');
    loader.classList.add('hidden');
}