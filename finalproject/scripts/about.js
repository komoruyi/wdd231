document.addEventListener('DOMContentLoaded', () => {


    const currentYearElements = document.querySelector('#currentYear');
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

    // Hamburger Menu Functionality
    const navIcon = document.querySelector("#ham-btn");
    const navBar = document.querySelector('.navigation');

    navIcon.addEventListener("click", () => {
        navIcon.classList.toggle("show");
        navBar.classList.toggle('show'); 
    });

    })