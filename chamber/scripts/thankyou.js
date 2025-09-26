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

    document.getElementById('displayFName').textContent = urlParams.get('fname') || 'N/A';
    document.getElementById('displayLName').textContent = urlParams.get('lname') || 'N/A';
    document.getElementById('displayEmail').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('displayPhone').textContent = urlParams.get('phone') || 'N/A';
    document.getElementById('displayBizName').textContent = urlParams.get('bizName') || 'N/A';
    document.getElementById('displayTimestamp').textContent = new Date(urlParams.get('timestamp')).toLocaleString() || 'N/A';
});