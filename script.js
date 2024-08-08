async function getWeather() {
    const apiKey = '42f9c25f557905ffb16cc1836e33ae48';
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // throw new Error('Error fetching data');
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.cod && data.cod !== 200) {
            throw new Error(`Error: ${data.cod} - ${data.message}`);
        }
        displayWeather(data);
    }
    catch (error) {
        console.log(error);
        document.getElementById('weather').innerHTML = `<p>${error.message}</p>`;
        }
}
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">${data.name}, ${data.sys.country}</h2>
                <p class="mb-2">Temperature: <span class="font-bold">${data.main.temp}°C</span></p>
                <p class="mb-2">Weather: ${data.weather[0].description}</p>
                <p class="mb-2">Humidity: <span class="font-bold">${data.main.humidity}%</span></p>
                <p class="mb-2">Wind Speed: <span class="font-bold">${data.wind.speed} m/s</span></p>
                <p class="mb-2">Geo coords lon: <span class="font-bold">${data.coord.lon}</span></p>
                <p class="mb-2">Geo coords lat: <span class="font-bold">${data.coord.lat}</span></p>
                <p class="mb-2">Clouds: <span class="font-bold">${data.clouds.all}</span></p>
            `;
}
