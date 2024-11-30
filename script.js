
const apiKey = '5d690387e37b59df5893112edf4625d8'; 
const weatherDisplay = document.getElementById('weather-display');

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const city = button.getAttribute('data-city');
        fetchWeather(city);
    });
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;

    
    const iconCode = weather[0].icon;  
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Display weather details, including the icon
    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <img src="${iconUrl}" alt="Weather icon" onerror="this.onerror=null; this.src='http://openweathermap.org/img/wn/50d@2x.png';">
    `;
}
