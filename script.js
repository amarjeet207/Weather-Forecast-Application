// Scrollbar 
const scrollbarContainer = document.querySelector(".fiveDays");

// Fetching weather information
const inputCity = document.getElementById("inputCity");
const searchBttn = document.getElementById("search-bttn");
const weatherIcon = document.getElementById("weather-icon");
const apiKey = "9e5c72c2c9a54c9fbf565713240711";  //  WeatherAPI key

// This function fetches current weather for the given city
async function checkWeather(city) {
    try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const response = await fetch(apiUrl);

        // Check if the response is not okay (status code other than 200)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);  // Log the entire data for debugging

        if (data.error) {
            document.querySelector(".err").style.display = "block";
            document.querySelector(".err").innerHTML = "Invalid city name!";
            document.querySelector(".showInfo").style.display = "none";
            document.querySelector(".srollbar").style.display = "none";
        } else {
            // Show weather information
            document.querySelector(".city").innerHTML = data.location.name;
            document.querySelector(".temp").innerHTML = `Temp: ${Math.round(data.current.temp_c)}°C`;
            document.querySelector(".humidity").innerHTML = `Humidity: ${data.current.humidity}%`;
            document.querySelector(".wind").innerHTML = `Wind: ${data.current.wind_kph} km/h`;

            // Set the weather icon based on the weather condition
            let weatherCondition = data.current.condition.text.toLowerCase();
            if (weatherCondition.includes("cloud")) {
                weatherIcon.src = "images/clouds.png";
            } else if (weatherCondition.includes("clear")) {
                weatherIcon.src = "images/clear.png";
            } else if (weatherCondition.includes("drizzle")) {
                weatherIcon.src = "images/Drizzle.png";
            } else if (weatherCondition.includes("mist")) {
                weatherIcon.src = "images/mist.png";
            } else if (weatherCondition.includes("rain")) {
                weatherIcon.src = "images/rain.png";
            } else if (weatherCondition.includes("snow")) {
                weatherIcon.src = "images/snow.png";
            }

            // Show the weather info
            document.querySelector(".showInfo").style.display = "block";
            document.querySelector(".srollbar").style.display = "flex";
            document.querySelector(".err").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".err").style.display = "block";
        document.querySelector(".err").innerHTML = "Invalid Name";
        document.querySelector(".showInfo").style.display = "none";
        document.querySelector(".srollbar").style.display = "none";
    }
}

// Fetching weather forecast for 5 days
async function getWeatherForecast(city) {
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const forecastData = data.forecast.forecastday;

        // Clear any existing forecast data before displaying the new ones
        const forecastContainer = document.querySelector(".fiveDays");
        forecastContainer.innerHTML = "";  // Clear previous forecast data

        forecastData.forEach(forecast => {
            const dayElement = document.createElement("span");
            dayElement.classList.add("day");

            // Format the date to a readable format
            const date = new Date(forecast.date);
            const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;

            // Set weather icon based on forecast conditions
            let conditionIcon;
            const condition = forecast.day.condition.text.toLowerCase();
            if (condition.includes("cloud")) {
                conditionIcon = "clouds.png";
            } else if (condition.includes("clear")) {
                conditionIcon = "clear.png";
            } else if (condition.includes("rain")) {
                conditionIcon = "rain.png";
            } else if (condition.includes("snow")) {
                conditionIcon = "snow.png";
            } else {
                conditionIcon = "drizzle.png";
            }

            // Create the forecast element
            dayElement.innerHTML = `
                <img src="images/${conditionIcon}" alt="${forecast.day.condition.text}">
                <p>${formattedDate}</p>
                <p>Temp: ${Math.round(forecast.day.avgtemp_c)}°C</p>
                <p>Wind: ${forecast.day.maxwind_kph} km/h</p>
                <p>Humidity: ${forecast.day.avghumidity}%</p>
            `;
            forecastContainer.appendChild(dayElement);
        });
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

// Handle the search button click
searchBttn.addEventListener("click", () => {
    const city = inputCity.value.trim();

    if (city === "") {
        document.querySelector(".err").style.display = "block";
        document.querySelector(".err").innerHTML = "Please enter a city name.";
        document.querySelector(".showInfo").style.display = "none";
        document.querySelector(".srollbar").style.display = "none";
    } else {
        checkWeather(city); // Call the function to fetch weather for the city
        getWeatherForecast(city);  // Fetch the 5-day forecast
    }
});
