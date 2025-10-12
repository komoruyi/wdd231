document.addEventListener('DOMContentLoaded', function() {
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


    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('name').textContent = urlParams.get('name') || 'N/A';
    document.getElementById('email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('message').textContent = urlParams.get('message') || 'N/A';
});