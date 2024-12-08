const weatherForm = document.querySelector(".weatherForm");
const cityinput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apikey = "29e2f90f22621d0171ce58f2419a623e";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityinput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData);

        } catch (error) {
            console.error();
            displayError(error);
        }
    }

    else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("could not fetch weather data")
    }

    return await response.json();

}

function displayWeatherInfo(data) {

    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const desdisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `humidity: ${humidity}`;
    desdisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desdisplay.classList.add("desdisplay");
    WeatherEmoji.classList.add("WeatherEmoji")


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desdisplay);
    card.appendChild(WeatherEmoji);
}


function getWeatherEmoji(Weatherid) {
    switch (true) {
        case (Weatherid >= 200 && Weatherid < 300):
            return "⛈️";
        case (Weatherid >= 300 && Weatherid < 400):
            return "🌧️";
        case (Weatherid >= 500 && Weatherid < 600):
            return " 🌦️ ";

        case (Weatherid >= 600 && Weatherid < 700):
            return " ❄️ ";
        case (Weatherid >= 700 && Weatherid < 800):
            return " 🌫️ ";

        case (Weatherid === 800):
            return "☀️";

        case (Weatherid >= 801 && Weatherid < 810):
            return "☀️";

        default:
            return "❓";

    }
}


function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);
}




