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
