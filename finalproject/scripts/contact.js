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

    const modalButtons = document.querySelector('.modal-open'); // Buttons that open modals
    const closeButtons = document.querySelector('.close-button'); // Buttons inside modals to close them
    let modalContent = document.querySelector('.modal-content');
    // Function to open a specific modal
    


    modalButtons.addEventListener('click', () =>{
        modalContent.style.display = 'block';
        closeButtons.style.display = 'block';
        modalButtons.style.visibility = 'hidden';
  })


closeButtons.addEventListener('click', () =>{
        modalContent.style.display = 'none';
        closeButtons.style.display = 'none';
        modalButtons.style.visibility = 'visible';
  })

document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modalContent.style.display = 'none';
            closeButtons.style.display = 'none';
            modalButtons.style.visibility = 'visible';
        }
  })

})