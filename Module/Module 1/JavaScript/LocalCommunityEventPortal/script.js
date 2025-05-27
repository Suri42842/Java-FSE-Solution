// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
    alert("Welcome to the Community Portal! The page is fully loaded.");
});

// 2. Syntax, Data Types, and Operators
const eventName = "Community Festival";
const eventDate = "2024-04-15";
let availableSeats = 100;

function updateEventInfo() {
    const eventInfo = `Event: ${eventName} on ${eventDate} - ${availableSeats} seats available`;
    document.getElementById('eventInfo').textContent = eventInfo;
}

// 3. Conditionals, Loops, and Error Handling
class Event {
    constructor(name, date, seats, category) {
        this.name = name;
        this.date = new Date(date);
        this.seats = seats;
        this.category = category;
    }

    isUpcoming() {
        return this.date > new Date();
    }

    hasAvailableSeats() {
        return this.seats > 0;
    }
}

const events = [
    new Event("Community Festival", "2024-04-15", 100, "Festival"),
    new Event("Art Show", "2024-03-20", 50, "Art"),
    new Event("Music Concert", "2024-05-01", 200, "Music"),
    new Event("Food Fair", "2024-04-10", 150, "Food"),
    new Event("Yoga Workshop", "2024-03-25", 30, "Health")
];

function displayEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    events.forEach(event => {
        if (event.isUpcoming() && event.hasAvailableSeats()) {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
        }
    });
}

// 4. Functions, Scope, Closures, Higher-Order Functions
function createEventTracker() {
    let totalRegistrations = 0;
    
    return {
        addRegistration: () => {
            totalRegistrations++;
            return totalRegistrations;
        },
        getTotalRegistrations: () => totalRegistrations
    };
}

const registrationTracker = createEventTracker();

function filterEventsByCategory(category, callback) {
    const filteredEvents = events.filter(event => event.category === category);
    callback(filteredEvents);
}

// 5. Objects and Prototypes
Event.prototype.checkAvailability = function() {
    return this.seats > 0 ? `Available seats: ${this.seats}` : "Event is full";
};

// 6. Arrays and Methods
function addNewEvent(event) {
    events.push(event);
    displayEvents();
}

function getMusicEvents() {
    return events.filter(event => event.category === "Music");
}

function formatEventCards() {
    return events.map(event => ({
        title: `${event.name} - ${event.category}`,
        date: event.date.toLocaleDateString(),
        seats: event.seats
    }));
}

// 7. DOM Manipulation
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date.toLocaleDateString()}</p>
        <p>${event.checkAvailability()}</p>
        <button onclick="registerForEvent('${event.name}')">Register</button>
    `;
    return card;
}

// 8. Event Handling
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    filterEventsByCategory(e.target.value, (filteredEvents) => {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';
        filteredEvents.forEach(event => {
            eventsList.appendChild(createEventCard(event));
        });
    });
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.name.toLowerCase().includes(searchTerm)
        );
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';
        filteredEvents.forEach(event => {
            eventsList.appendChild(createEventCard(event));
        });
    }
});

// 9. Async JS, Promises, Async/Await
async function fetchEvents() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

// 10. Modern JavaScript Features
const { name, date, seats } = events[0];
const eventDetails = { ...events[0] };

// 11. Working with Forms
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        event: formData.get('event')
    };

    try {
        await registerUser(userData);
        showNotification('Registration successful!', 'success');
    } catch (error) {
        showNotification('Registration failed. Please try again.', 'error');
    }
});

// 12. AJAX & Fetch API
async function registerUser(userData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// 13. Debugging and Testing
function debugRegistration(formData) {
    console.log('Form submission started');
    console.log('Form data:', Object.fromEntries(formData));
    console.log('Available seats:', availableSeats);
}

// 14. jQuery and JS Frameworks
// Note: jQuery would need to be included in the HTML file
if (typeof $ !== 'undefined') {
    $(document).ready(() => {
        $('#registerBtn').click(() => {
            $('.event-card').fadeIn();
        });
        
        $('.event-card').hover(
            function() { $(this).fadeIn(); },
            function() { $(this).fadeOut(); }
        );
    });
}

// Utility Functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function registerForEvent(eventName) {
    const event = events.find(e => e.name === eventName);
    if (event && event.seats > 0) {
        event.seats--;
        registrationTracker.addRegistration();
        displayEvents();
        showNotification(`Successfully registered for ${eventName}!`, 'success');
    } else {
        showNotification('Sorry, this event is full!', 'error');
    }
}

// Location-based functionality
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Display coordinates
                const locationOutput = document.getElementById('locationOutput');
                locationOutput.innerHTML = `
                    <p>Your location:</p>
                    <p>Latitude: ${latitude}</p>
                    <p>Longitude: ${longitude}</p>
                `;

                // Find nearby events (mock data for demonstration)
                const nearbyEvents = findNearbyEvents(latitude, longitude);
                displayNearbyEvents(nearbyEvents);
            },
            // Error callback
            (error) => {
                let errorMessage = "Error getting location: ";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += "Location permission denied.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += "Location information unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage += "Location request timed out.";
                        break;
                    default:
                        errorMessage += "An unknown error occurred.";
                        break;
                }
                showNotification(errorMessage, 'error');
            }
        );
    } else {
        showNotification("Geolocation is not supported by your browser.", 'error');
    }
}

function findNearbyEvents(latitude, longitude) {
    // Mock data for nearby events
    // In a real application, this would use the coordinates to find actual nearby events
    return [
        {
            name: "Community Festival",
            distance: "0.5 km",
            date: "2024-04-15",
            location: "Central Park"
        },
        {
            name: "Art Exhibition",
            distance: "1.2 km",
            date: "2024-03-20",
            location: "City Gallery"
        },
        {
            name: "Food Fair",
            distance: "0.8 km",
            date: "2024-04-10",
            location: "Downtown Square"
        }
    ];
}

function displayNearbyEvents(nearbyEvents) {
    const nearbyEventsList = document.getElementById('nearbyEventsList');
    nearbyEventsList.innerHTML = '';

    nearbyEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>Distance: ${event.distance}</p>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <button onclick="registerForEvent('${event.name}')">Register</button>
        `;
        nearbyEventsList.appendChild(eventElement);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    updateEventInfo();
}); 