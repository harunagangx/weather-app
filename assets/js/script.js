// apiKey: 18012765bab67d1425039bac7a2efb76

// ================ INNITAL ================

const temp_index = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    condition = document.getElementById("condition"),
    rain = document.getElementById("rain"),
    mainIcon = document.getElementById("icon"),
    currentLocation = document.getElementById("location"),
    pressure_index = document.querySelector(".pressure-index"),
    sunrise_index = document.querySelector(".sunrise"),
    sunset_index = document.querySelector(".sunset"),
    wind = document.querySelector(".wind-speed"),
    feels_like_index = document.querySelector(".feels-like"),
    humidity_index = document.querySelector(".humidity-index"),
    humidity_status = document.querySelector(".humidity-status"),
    visibility_index = document.querySelector(".visibility-index"),
    visibility_status = document.querySelector(".visibility-status"),
    hourly_btn = document.querySelector(".hourly"),
    weekly_btn = document.querySelector(".weekly"),
    weather_card = document.querySelector("#weather-card");

// func to get date and time
function getDateTime() {
    let now = new Date();

    let hh = now.getHours(),
        mm = now.getMinutes(),
        ampm

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    if (hh >= 12)
    {
        ampm = "PM";
    }
    else
    {
        ampm = "AM";
    }

    if (hh == 12) {hh = 12}

    if (hh < 10) { hh = `0${hh}`}
    
    if (mm < 10) { mm = `0${mm}`}

    let dayString = days[now.getDay()];
    return `${dayString}, ${hh}:${mm} ${ampm}`;
}

date.innerHTML = getDateTime();
setInterval(() => {
  date.innerHTML = getDateTime();
}, 1000); 



let weather = {
    apiKey: "18012765bab67d1425039bac7a2efb76",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name, visibility} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity, feels_like, pressure} = data.main;
        const {speed} = data.wind;
        const {country, sunrise, sunset} = data.sys;
        const {timezone} = data.timezone;

        mainIcon.src = `./assets/icons/${icon}.svg`
        temp_index.innerHTML = Math.round(temp);
        condition.innerHTML = description;
        sunrise_index.innerHTML = moment.unix(sunrise).format('H:mm');
        sunset_index.innerHTML = moment.unix(sunset).format('H:mm') + " PM";
        wind.innerHTML = speed;
        feels_like_index.innerHTML = Math.round(feels_like);
        humidity_index.innerHTML = humidity;
        visibility_index.innerHTML = visibility / 1000;
        pressure_index.innerHTML = pressure;
        currentLocation.innerHTML = `${name}, ${country}`;

        updateHumidityStatus(humidity);
        updateVisibiltyStatus(visibility);

        console.log(name, country, icon, temp, condition, sunrise, sunset, speed, feels_like, humidity, visibility, pressure, timezone);
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-input").value);
    }
}

document.querySelector(".search-bar button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if (e.key == "Enter")
    {
        weather.search();
    }
})

function updateHumidityStatus(humidity) {
    if (humidity <= 30)
    {
        humidity_status.innerHTML = "Low";
    }
    else if (humidity <= 60)
    {
        humidity_status.innerHTML = "Moderate";
    }
    else {
        humidity_status.innerHTML = "High";
    }
}

function updateVisibiltyStatus(visibility) {
    if (visibility <= 0.03) 
    {
      visibility_status.innerText = "Dense Fog";
    } 
    else if (visibility <= 0.16) {
      visibility_status.innerText = "Moderate Fog";
    }
    else if (visibility <= 0.35) {
      visibility_status.innerText = "Light Fog";
    } 
    else if (visibility <= 1.13) {
      visibility_status.innerText = "Very Light Fog";
    } 
    else if (visibility <= 2.16) {
      visibility_status.innerText = "Light Mist";
    } 
    else if (visibility <= 5.4) {
      visibility_status.innerText = "Very Light Mist";
    } 
    else if (visibility <= 10.8) {
      visibility_status.innerText = "Clear Air";
    } 
    else {
      visibility_status.innerText = "Very Clear Air";
    }
}
weather.fetchWeather("Ha Noi");















