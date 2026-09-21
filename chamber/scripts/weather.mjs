const apiKey = "e4f71b68e4e4a7ec631029e097e36e2f";

const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=Camacari,BR&units=metric&lang=en&appid=${apiKey}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=Camacari,BR&units=metric&lang=en&appid=${apiKey}`;


async function getWeather() {

    try {

        const currentResponse =
            await fetch(currentWeatherUrl);

        const forecastResponse =
            await fetch(forecastUrl);


        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Could not fetch weather data.");
        }


        const currentData =
            await currentResponse.json();

        const forecastData =
            await forecastResponse.json();


        displayCurrentWeather(currentData);

        displayForecast(forecastData);


    } catch (error) {

        console.error("Weather error:", error);

    }
}


function displayCurrentWeather(data) {

    const weatherContainer =
        document.querySelector("#current-weather");


    weatherContainer.innerHTML = `

        <h3>${data.name}</h3>

        <p>
            Temperature:
            ${data.main.temp.toFixed(1)}°C
        </p>

        <p>
            Feels like:
            ${data.main.feels_like.toFixed(1)}°C
        </p>

        <p>
            Condition:
            ${data.weather[0].description}
        </p>

        <p>
            Humidity:
            ${data.main.humidity}%
        </p>

    `;
}


function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast");


    const dailyForecast = {};


    data.list.forEach(item => {

        const date =
            item.dt_txt.split(" ")[0];


        if (!dailyForecast[date]) {

            dailyForecast[date] = item;

        }

    });


    const forecastDays =
        Object.values(dailyForecast).slice(1, 4);


    forecastContainer.innerHTML = `

        <h3>3-Day Forecast</h3>

        <div class="forecast-container">

            ${forecastDays.map(day => `

                <article class="forecast-card">

                    <h4>${formatDate(day.dt_txt)}</h4>

                    <p>
                        ${day.main.temp.toFixed(1)}°C
                    </p>

                    <p>
                        ${day.weather[0].description}
                    </p>

                </article>

            `).join("")}

        </div>

    `;

}


function formatDate(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric"
        }
    );

}


getWeather();