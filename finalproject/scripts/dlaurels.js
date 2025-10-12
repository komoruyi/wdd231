document.addEventListener('DOMContentLoaded', () => {
    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('#nav-bar');

    navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("show");
    navBar.classList.toggle('show'); 
})


window.addEventListener('scroll', () => {
    if (window.innerWidth >= 608) { // Only for large screens
        if (window.scrollY > 0) {
            navBar.classList.add('fixed');
        } else {
            navBar.classList.remove('fixed');
        }
    } else {
        navBar.classList.remove('fixed'); // Remove fixed on small screens
    }
});

const currentYearElements = document.querySelector('#currentyear');
const modifiedYearElements = document.querySelector('#lastModified');

let today = new Date();
let modified = new Date(document.lastModified);

currentYearElements.innerHTML = `${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}
).format(today)}`;


modifiedYearElements.innerHTML = `Last Modified ${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}
).format(modified)}`;


const url = "apartments.json";

async function apartmentFetch() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); 
            displayApartment(data);
        } catch (error) {
            console.error('Error fetching apartment data:', error);
        }
    }



    
    function displayApartment(apartmentData) { // Renamed 'place' to 'placesData' for clarity
        const apartmentGrid = document.querySelector('#add-property');
        if (!apartmentGrid) {
            console.warn("Element with class 'places' not found. Cannot display places.");
            return;
        }
        apartmentGrid.innerHTML = ''; // Clear existing content

        // Use a DocumentFragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();

        apartmentData.forEach(apartment => {
            const card = document.createElement('div');
            // Add a class to the card if needed, e.g., 'place-card'
            card.classList.add('post-property');
            card.innerHTML = `
                <img src="${apartment.image_url}" alt="${apartment.name}" loading = "lazy">
                <h2>${apartment.type}</h2>
                <p>${apartment.details}</p>
                <p>${apartment.price}</p>
                <button>Learn more</button>`
            fragment.appendChild(card);
        });
        apartmentGrid.appendChild(fragment);
    }





    const slideWrapper = document.querySelector('.carousel-slide-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 3000; // Time in milliseconds (5 seconds)

    // Function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Function to update the carousel's position
    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        slideWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    // Auto-play interval
    let autoPlay = setInterval(nextSlide, intervalTime);

    // Stop auto-play on hover
    slideWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    slideWrapper.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, intervalTime);
    });

    // Manual navigation buttons
    nextBtn.addEventListener('click', () => {
        clearInterval(autoPlay); // Stop animation when user interacts
        nextSlide();
        autoPlay = setInterval(nextSlide, intervalTime); // Restart after interaction
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoPlay); // Stop animation when user interacts
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        autoPlay = setInterval(nextSlide, intervalTime); // Restart after interaction
    });

    // Optional: Add event listener for window resize to recalculate slideWidth
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    function openTab(evt, tabName) {
  // Declare all variables
  var i, tabContent, tabButtons;

  // Get all elements with class="tab-content" and hide them
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tab-button" and remove the "active" class
  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

const OPENWEATHER_API_KEY_STRING = '5071297ee1335c91dacb2564bdc298cf'; // Your actual API key
        const WEATHER_LAT = 5.55; 
        const WEATHER_LON = 5.77;
        // Fetch Weather Data
        async function fetchWeatherData() {
            // Construct correct URLs for current weathher and forecast
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${OPENWEATHER_API_KEY_STRING}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${OPENWEATHER_API_KEY_STRING}`;

            try {
                // Current Weather
                const currentWeatherResponse = await fetch(currentWeatherUrl);
                if (!currentWeatherResponse.ok) throw new Error(`HTTP error! status: ${currentWeatherResponse.status} from current weather`);
                const currentWeatherData = await currentWeatherResponse.json();
                document.getElementById('current-temp').textContent = currentWeatherData.main.temp.toFixed(0);
                document.getElementById('weather-desc').textContent = currentWeatherData.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                // 3-Day Forecast
                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) throw new Error(`HTTP error! status: ${forecastResponse.status} from forecast`);
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData); // Pass forecastData to displayForecast

            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('current-temp').textContent = 'N/A';
                document.getElementById('weather-desc').textContent = 'Failed to load weather';
                document.getElementById('forecast-container').innerHTML = '<p>Failed to load forecast.</p>';
            }
        }

        function displayForecast(data) {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '<h3>4-Day Forecast:</h3>'; // Clear previous content

            const dailyForecasts = {}; // To store one forecast per day

            // Iterate through the 3-hour forecast data from data.list
            // Check if data.list exists and is an array
            if (data && Array.isArray(data.list)) {
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000);
                    const day = date.toDateString(); // Get date string to group by day

                    // Only take the first forecast for each day to represent the daily temp
                    if (!dailyForecasts[day]) {
                        dailyForecasts[day] = {
                            temp: item.main.temp,
                            description: item.weather[0].description,
                            icon: item.weather[0].icon
                        };
                    }
                });
            } else {
                console.warn('Forecast data list is missing or not an array:', data);
                forecastContainer.innerHTML += '<p>No forecast data available.</p>';
                return; // Exit if no valid list
            }

            const forecastDays = Object.keys(dailyForecasts).slice(0, 4); // Get the next 3 days

            forecastDays.forEach(day => {
                const forecast = dailyForecasts[day];
                const dayElement = document.createElement('div');
                dayElement.classList.add('forecast-day');

                const dateObj = new Date(day);
                dayElement.innerHTML = `
                    <p><strong>${dateObj.toLocaleDateString('en-US', { weekday: 'short' })}</strong></p>
                    <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}">
                    <p>${forecast.temp.toFixed(0)}°C</p>
                    <p class="description">${forecast.description}</p>
                `;
                forecastContainer.appendChild(dayElement);
            });
        }


        setTimeout(() => {
        fetchWeatherData();
       apartmentFetch(); 
        let visitCount = localStorage.getItem('visitCount');
        let header = document.querySelector("header");
        let lastVisitTimestamp = parseInt(localStorage.getItem('lastVisitTimestamp'), 10);
        let now = Date.now();
        const MS_PER_DAY = 24 * 60 * 60 * 1000;

        if (!lastVisitTimestamp) {
            visitCount = 1;
           let par = document.createElement("p");
           

           par.textContent = "Welcome! Explore our exclusive properties.";
           par.className = 'my-new-paragraph';
           par.classList.add("my-new-paragraph");
           header.insertAdjacentElement('afterend', par);
        } else {
            const daysAgo = Math.floor((now - lastVisitTimestamp) / MS_PER_DAY);
            if (daysAgo < 1) {
                let par = document.createElement("p");

                par.textContent = "Good to have you back again!";
                par.className = 'my-new-paragraph';
                par.classList.add("my-new-paragraph");
                header.insertAdjacentElement('afterend', par);
            } else {
                let par = document.createElement("p");

                par.textContent = `You last visited ${daysAgo} day(s) ago. Good to have you back!`;
                par.className = 'my-new-paragraph';
                par.classList.add("my-new-paragraph");
                header.insertAdjacentElement('afterend', par);
            }
            visitCount = parseInt(visitCount || 0) + 1; 
        }

        localStorage.setItem('visitCount', visitCount);
        localStorage.setItem('lastVisitTimestamp', now); 

    }, 0);
});