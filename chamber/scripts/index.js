// index.js
// Handles dynamic content for the Accra Chamber of Commerce Home Page

document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Last modified
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Hamburger menu for mobile
    const hamBtn = document.getElementById('ham-btn');
    const navMenu = document.getElementById('mainNav');
    if (hamBtn && navMenu) {
        hamBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamBtn.classList.toggle('open');
        });
    }

    // --- Local Weather for Accra, Ghana ---
    const tempSpan = document.getElementById('current-temp');
    const descSpan = document.getElementById('weather-desc');
    const forecastContainer = document.getElementById('forecast-container');
    const apiKey = "e0d48528c2a3e712d4a4d8013b44f4dd"; // <-- Replace with your OpenWeatherMap API key

    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Accra,GH&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (tempSpan) tempSpan.textContent = Math.round(data.main.temp);
            if (descSpan) descSpan.textContent = data.weather[0].description;
        })
        .catch(() => {
            if (tempSpan) tempSpan.textContent = "N/A";
            if (descSpan) descSpan.textContent = "Weather unavailable";
        });

    // Fetch 3-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Accra,GH&units=metric&cnt=24&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            // Group forecast by day
            const days = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
                if (!days[day]) days[day] = [];
                days[day].push(item);
            });
            // Get next 3 days
            const forecastDays = Object.keys(days).slice(0, 3);
            let forecastHTML = "<ul>";
            forecastDays.forEach(day => {
                const dayItems = days[day];
                const temps = dayItems.map(i => i.main.temp);
                const avgTemp = Math.round(temps.reduce((a,b)=>a+b,0)/temps.length);
                const desc = dayItems[0].weather[0].description;
                forecastHTML += `<li><strong>${day}:</strong> ${avgTemp}°C, ${desc}</li>`;
            });
            forecastHTML += "</ul>";
            if (forecastContainer) forecastContainer.innerHTML += forecastHTML;
        })
        .catch(() => {
            if (forecastContainer) forecastContainer.innerHTML += "<p>Forecast unavailable.</p>";
        });

    // Spotlights Section: Example content
    const spotlightGrid = document.getElementById('spotlight-grid');
    if (spotlightGrid) {
        spotlightGrid.innerHTML = `
            <div class="spotlight-card">
                <h4>Sunrise Bakery</h4>
                <p>Award-winning bread and pastries. Proud Chamber member since 2018.</p>
            </div>
            <div class="spotlight-card">
                <h4>TechNova Solutions</h4>
                <p>Leading IT firm supporting local business growth.</p>
            </div>
            <div class="spotlight-card">
                <h4>GreenScape Gardens</h4>
                <p>Specialists in landscaping and urban greenery.</p>
            </div>
        `;
    }
});