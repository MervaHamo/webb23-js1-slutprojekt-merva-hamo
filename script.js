const form = document.querySelector('#weatherForm');
const cityInput = document.querySelector('#cityInput');
const weatherInfo = document.querySelector('#weatherInfo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city === '') {
        showErrorMessage('MALMÖ');
    } else {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiKey = '671891334809d8f381f303eecb110e1b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                const windSpeed = data.wind.speed;
                const icon = data.weather[0].icon;

                const weatherHtml = `
                    <h2>${city}</h2>
                    <p>Beskrivning: ${description}</p>
                    <p>Temperatur: ${temperature}°C</p>
                    <p>Vindhastighet: ${windSpeed} m/s</p>
                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="Väderikon">
                `;

                weatherInfo.innerHTML = weatherHtml;
            } else {
                showErrorMessage('Staden hittades inte');
            }
        })
        .catch(error => {
            showErrorMessage('Ett fel uppstod. Var god försök igen senare.');
        });
}

function showErrorMessage(message) {
    const errorHtml = `<p class="error">${message}</p>`;
    weatherInfo.innerHTML = errorHtml;
}
