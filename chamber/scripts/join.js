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

     // --- Modal functionality ---
    const modalButtons = document.querySelectorAll('.modal-open'); // Buttons that open modals
    const closeButtons = document.querySelectorAll('.close-button'); // Buttons inside modals to close them
    const modals = document.querySelectorAll('.modal'); // The modal overlay elements
    let modalContent = document.querySelectorAll('.modal-content');
    // Function to open a specific modal
    

    for(let i = 0; i < modalContent.length; i++){
    modalButtons[i].addEventListener('click', () =>{
        modalContent[i].style.display = 'block';
        closeButtons[i].style.display = 'block';
        modalButtons[i].style.visibility = 'hidden';
  })
  
};


for(let i = 0; i < modalContent.length; i++){
    closeButtons[i].addEventListener('click', () =>{
        modalContent[i].style.display = 'none';
        closeButtons[i].style.display = 'none';
        modalButtons[i].style.visibility = 'visible';
  })
  
};

for(let i = 0; i < modalContent.length; i++){
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modalContent[i].style.display = 'none';
            closeButtons[i].style.display = 'none';
            modalButtons[i].style.visibility = 'visible';
        }
  })
  
};

})