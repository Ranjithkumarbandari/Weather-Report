let StoredCity = JSON.parse(localStorage.getItem('City Name')) || [];

function displayWeather() {
    let city = document.getElementById("city").value.trim();

    const parent = document.getElementById("parent");
    const container = document.getElementById('container');
    container.innerHTML = '';
    
    // Clear the parent div to show only one weather report at a time
    parent.innerHTML = '<input type="text" id="city" placeholder="Enter the City"><button onclick="displayWeather()">Search</button>';
    
    const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
    let url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="weather-info">
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Feels like: ${data.main.feels_like}°C</p>
                    <p>Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                </div>`;
            parent.appendChild(div);
            addToLocal(city);
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred while fetching weather data.");
        });
}

function addToLocal(city) {
    if (!StoredCity.includes(city)) {
        StoredCity.push(city);
        localStorage.setItem('City Name', JSON.stringify(StoredCity));
    }
    StoredCities();
    document.getElementById('city').value = '';
}

function StoredCities() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    StoredCity.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${item}</span>
            <button onclick="removeItem(${index})">Remove</button>
            <button onclick="fetchWeather('${item}')">Show Weather</button>
            <button onclick="editItem(${index})">Edit</button>
        `;
        container.appendChild(div);
    });
}

function fetchWeather(city) {
    document.getElementById("city").value = city;
    displayWeather();
}

function removeItem(index) {
    StoredCity.splice(index, 1);
    localStorage.setItem('City Name', JSON.stringify(StoredCity));
    StoredCities();
}

function editItem(index) {
    const newCity = prompt("Enter the new city name:", StoredCity[index]);
    if (newCity && newCity.trim() !== '') {
        StoredCity[index] = newCity.trim();
        localStorage.setItem('City Name', JSON.stringify(StoredCity));
        StoredCities();
    }
}