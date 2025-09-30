document.addEventListener('DOMContentLoaded', () => {

    // 1. **Immediate & Quick Operations:**
    //    These are fast and needed as soon as the DOM is ready.
    const currentYearElements = document.querySelector('#currentYear');
    const modifiedYearElements = document.querySelector('#lastModified');

    let today = new Date();
    let modified = new Date(document.lastModified);


    currentYearElements.textContent = today.getFullYear(); 

    modifiedYearElements.innerHTML = `Last Modified ${new Intl.DateTimeFormat('en-UK', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    }).format(modified)}`;



    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('.navigation');
    let header = document.querySelector("header");

    navIcon.addEventListener("click", () => {
        navIcon.classList.toggle("show");
        navBar.classList.toggle('show');
    });

    window.addEventListener('scroll', () => {
    if (window.innerWidth >= 608) { // Only for large screens
        if (window.scrollY > 50) {
            header.classList.add('fixed');
        } else {
            navBar.classList.remove('fixed');
        }
    } else {
        navBar.classList.remove('fixed'); // Remove fixed on small screens
    }
});


  let url = "places.json";



    async function placeFetch() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); 
            displayPlaces(data);
        } catch (error) {
            console.error('Error fetching place data:', error);
        }
    }



    
    function displayPlaces(placesData) { // Renamed 'place' to 'placesData' for clarity
        const placesGrid = document.querySelector('.places');
        if (!placesGrid) {
            console.warn("Element with class 'places' not found. Cannot display places.");
            return;
        }
        placesGrid.innerHTML = ''; // Clear existing content

        // Use a DocumentFragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();

        placesData.forEach(place => {
            const card = document.createElement('div');
            // Add a class to the card if needed, e.g., 'place-card'
            card.classList.add('place-card');
            card.innerHTML = `
                <img src="${place.photo}" alt="${place.name}" loading = "lazy">
                <h3>${place.name}</h3>
                <address class="address">${place.address}</address>
                <p>${place.description}</p>
                <button>Learn more</button>`
            fragment.appendChild(card);
        });
        placesGrid.appendChild(fragment);
    }



    setTimeout(() => {
        placeFetch(); 
        let visitCount = localStorage.getItem('visitCount');
        let lastVisitTimestamp = parseInt(localStorage.getItem('lastVisitTimestamp'), 10);
        let now = Date.now();
        const MS_PER_DAY = 24 * 60 * 60 * 1000;

        if (!lastVisitTimestamp) {
            visitCount = 1;
           let par = document.createElement("p");
           

           par.textContent = "Welcome! Let us know if you have any questions.";
           par.className = 'my-new-paragraph';
           par.classList.add("my-new-paragraph");
           header.insertAdjacentElement('afterend', par);
        } else {
            const daysAgo = Math.floor((now - lastVisitTimestamp) / MS_PER_DAY);
            if (daysAgo < 1) {
                let par = document.createElement("p");

                par.textContent = "Back so soon! Awesome!";
                par.className = 'my-new-paragraph';
                par.classList.add("my-new-paragraph");
                header.insertAdjacentElement('afterend', par);
            } else {
                let par = document.createElement("p");

                par.textContent = `You last visited ${daysAgo} day(s) ago.`;
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