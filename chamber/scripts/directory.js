window.addEventListener('pagehide', function(event) {
    if (event.persisted) {
        console.log('Page is being put into bfcache!');
        // Perform lightweight cleanup here, if any
    } else {
        console.log('Page is truly being unloaded.');
        // Perform more aggressive cleanup here (e.g., sending analytics)
    }
});

const members = ("../members.json")

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

const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

document.addEventListener('DOMContentLoaded', function() {
    // ... (Your existing Last Modified, Current Year, Mobile Navigation Toggle code) ...

    const memberDisplay = document.getElementById('member-display');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    let membersData = []; // This will hold the array of member objects once fetched

    // Function to create and populate a single member card/list item element
    function createMemberElement(member) {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member-card'); // Base class for styling

        // Create individual elements for THIS specific member
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const pAddress = document.createElement('p');
        const pPhone = document.createElement('p');
        const aWebsite = document.createElement('a');
        const pMembership = document.createElement('p');
        const pDescription = document.createElement('p'); // For the 'other information'

        // Populate elements with data from the current 'member' object
        img.src = `${member.image}`; // Make sure member.image matches your JSON
        img.alt = `${member.name} Logo`;
        img.loading = 'lazy';
        img.onerror = function() { this.onerror=null;this.src='https://placehold.co/100x100/cccccc/333333?text=Logo'; };

        h3.textContent = member.name;

        pAddress.textContent = `Address: ${member.address}`;
        pAddress.classList.add('address'); // Add class for potential styling

        pPhone.textContent = `Phone: ${member.phone}`;
        pPhone.classList.add('phone'); // Add class for potential styling

        aWebsite.href = member.website;
        aWebsite.textContent = member.website.replace(/(^\w+:|^)\/\//, ''); // Display cleaner URL text
        aWebsite.target = '_blank'; // Open in new tab
        aWebsite.classList.add('link'); // Add class for potential styling

        // Determine membership level text
        let membershipText = '';
        switch (member.membershipLevel) {
            case 1: membershipText = 'Basic Member'; break;
            case 2: membershipText = 'Silver Member'; break;
            case 3: membershipText = 'Gold Member'; break;
            default: membershipText = 'Member';
        }
        pMembership.textContent = `Membership: ${membershipText}`;
        pMembership.classList.add('membership-level'); // Add class for potential styling

        if (member.description) { // Only add if description exists
            pDescription.textContent = member.description;
            pDescription.classList.add('description');
        }


        // Append the created elements to the member's card (memberDiv)
        memberDiv.appendChild(img);
        memberDiv.appendChild(h3);
        memberDiv.appendChild(pMembership); // Place membership level
        memberDiv.appendChild(pAddress);
        memberDiv.appendChild(pPhone);
        memberDiv.appendChild(aWebsite);
        if (member.description) {
            memberDiv.appendChild(pDescription); // Append description if it exists
        }


        return memberDiv; // Return the fully constructed card
    }

    // Function to display ALL members based on the current view (grid or list)
    const displayMembers = (membersArray) => {
        memberDisplay.innerHTML = ''; // Clear the container before adding new cards

        membersArray.forEach((member) => {
            const memberElement = createMemberElement(member); // Create a card for THIS member
            memberDisplay.appendChild(memberElement); // Add THIS card to the main display area
        });
    };

    // Fetch member data
    async function fetchMembers() {
        try {
            // Correct path assuming 'data' folder
            const response = await fetch('members.json'); // Changed path to 'data/members.json'

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse JSON. membersData will directly be the array from members.json
            membersData = await response.json();

            // console.table(membersData); // Use this to check the structure if it errors again
            displayMembers(membersData); // Pass the array directly
        } catch (error) {
            console.error('Error fetching member data:', error);
            memberDisplay.innerHTML = '<p>Failed to load member directory. Please try again later.</p>';
        }
    }

    // Event Listeners for View Toggle
    if (gridViewBtn && listViewBtn && memberDisplay) {
        gridViewBtn.addEventListener('click', () => {
            memberDisplay.classList.remove('list-view');
            memberDisplay.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            displayMembers(membersData); // Re-display to apply new CSS classes
        });

        listViewBtn.addEventListener('click', () => {
            memberDisplay.classList.remove('grid-view');
            memberDisplay.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            displayMembers(membersData); // Re-display to apply new CSS classes
        });
    }

    // Initial fetch and display of members when the page loads
    fetchMembers();
});