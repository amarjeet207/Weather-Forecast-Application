// Format the date to a readable format
            const date = new Date(forecast.date);
            const formattedDate = ${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()};

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
