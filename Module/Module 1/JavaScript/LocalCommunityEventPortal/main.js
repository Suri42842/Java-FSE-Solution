// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = function() {
    alert("Welcome! The Community Portal is now fully loaded.");
};

// Add debug logging at the start
console.log('Script loaded');

// 2. Syntax, Data Types, and Operators
class Event {
    constructor(name, date, category, location, totalSeats, price) {
        this.id = utils.generateUniqueId();
        this.name = name;
        this.date = date;
        this.category = category;
        this.location = location;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.price = price;
        this.registrations = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.description = '';
        this.imageUrl = '';
        this.coordinates = null;
    }

    // 5. Objects and Prototypes
    checkAvailability() {
        return this.availableSeats > 0;
    }

    getEventInfo() {
        return `${this.name} - ${utils.formatDate(this.date)} (${this.availableSeats} seats available)`;
    }

    register(user) {
        if (!this.checkAvailability()) {
            throw new Error('Event is fully booked');
        }
        this.availableSeats--;
        this.registrations.push({
            userId: user.id,
            timestamp: new Date(),
            status: 'confirmed'
        });
        this.updatedAt = new Date();
        return true;
    }

    // Add new methods
    cancelRegistration(userId) {
        const registration = this.registrations.find(r => r.userId === userId);
        if (!registration) {
            throw new Error('Registration not found');
        }
        registration.status = 'cancelled';
        this.availableSeats++;
        this.updatedAt = new Date();
        return true;
    }

    getRegistrationCount() {
        return this.totalSeats - this.availableSeats;
    }

    isUpcoming() {
        return new Date(this.date) > new Date();
    }

    getFormattedPrice() {
        return utils.formatCurrency(this.price);
    }
}

// 3. Conditionals, Loops, and Error Handling
let events = [
    new Event("Summer Music Festival", "2024-06-15", "music", "Central Park", 100, 25),
    new Event("Art Exhibition", "2024-07-01", "art", "City Gallery", 150, 15),
    new Event("Food Fair", "2024-07-20", "food", "Downtown Square", 200, 20),
    new Event("Wellness Workshop", "2024-08-05", "workshop", "Community Center", 50, 35)
];

// 4. Functions, Scope, Closures, Higher-Order Functions
function addEvent(name, date, category, location, totalSeats, price) {
    try {
        const newEvent = new Event(name, date, category, location, totalSeats, price);
        events.push(newEvent);
        displayEvents();
        return true;
    } catch (error) {
        console.error("Error adding event:", error);
        return false;
    }
}

// Closure to track registrations
const registrationTracker = (function() {
    let totalRegistrations = 0;
    return {
        increment: function() {
            totalRegistrations++;
            return totalRegistrations;
        },
        getTotal: function() {
            return totalRegistrations;
        }
    };
})();

// 6. Arrays and Methods
function filterEventsByCategory(category) {
    return events.filter(event => event.category === category);
}

function formatEventCards() {
    return events.map(event => ({
        title: `${event.category.charAt(0).toUpperCase() + event.category.slice(1)}: ${event.name}`,
        details: event.getEventInfo()
    }));
}

// 7. DOM Manipulation
function displayEvents(filteredEvents = events) {
    console.log('Displaying events:', filteredEvents);
    const eventsList = document.querySelector('.events-list');
    if (!eventsList) {
        console.error('Events list container not found');
        return;
    }

    console.log('Found events list container');
    eventsList.innerHTML = '';
    const currentDate = new Date();

    filteredEvents.forEach(event => {
        const eventDate = new Date(event.date);
        console.log('Processing event:', event.name, 'Date:', eventDate);
        if (eventDate >= currentDate) {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
            console.log('Added event card for:', event.name);
        }
    });

    // Add jQuery fade effect
    $('.event-card').hide().fadeIn(1000);
    console.log('Finished displaying events');
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <h4>${event.name}</h4>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
        <p><strong>Available Seats:</strong> <span class="seats">${event.availableSeats}/${event.totalSeats}</span></p>
        <p><strong>Price:</strong> $${event.price} per person</p>
        <button onclick="registerForEvent('${event.name}')" class="register-btn" ${!event.checkAvailability() ? 'disabled' : ''}>
            ${event.checkAvailability() ? 'Register Now' : 'Fully Booked'}
        </button>
    `;
    return card;
}

// 8. Event Handling
function registerForEvent(eventName) {
    try {
        const event = events.find(e => e.name === eventName);
        if (!event) throw new Error("Event not found");
        if (!event.checkAvailability()) throw new Error("Event is full");

        // Decrease available seats
        event.availableSeats--;
        registrationTracker.increment();

        // Update the display
        displayEvents();

        // Show registration form
        const registrationForm = document.getElementById('registration');
        if (registrationForm) {
            registrationForm.scrollIntoView({ behavior: 'smooth' });
            
            // Set the event type in the form
            const eventTypeSelect = document.getElementById('eventType');
            if (eventTypeSelect) {
                eventTypeSelect.value = event.category;
                updateFee({ value: event.category });
            }
        }

        // Show success message
        alert(`Successfully registered for ${eventName}!\nRemaining seats: ${event.availableSeats}`);
    } catch (error) {
        alert(error.message);
    }
}

// 9. Async JS, Promises, Async/Await
async function fetchEvents() {
    try {
        const response = await fetch('https://api.example.com/events');
        const data = await response.json();
        events = data.map(event => new Event(
            event.name,
            event.date,
            event.category,
            event.location,
            event.totalSeats,
            event.price
        ));
        displayEvents();
    } catch (error) {
        console.error("Error fetching events:", error);
        // Fallback to local events
        displayEvents();
    }
}

// 10. Modern JavaScript Features
const { name, date, ...eventDetails } = events[0]; // Destructuring example

function updateEventList(...newEvents) {
    events = [...events, ...newEvents]; // Spread operator
    displayEvents();
}

// 11. Working with Forms
function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        validateForm(formData);
        submitRegistration(formData);
    } catch (error) {
        showError(error.message);
    }
}

function validateForm(formData) {
    const email = formData.get('email');
    const name = formData.get('name');
    
    if (!email || !email.includes('@')) {
        throw new Error("Please enter a valid email");
    }
    if (!name || name.length < 2) {
        throw new Error("Please enter a valid name");
    }
}

// 12. AJAX & Fetch API
async function submitRegistration(formData) {
    try {
        const response = await fetch('https://api.example.com/register', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error("Registration failed");
        
        const result = await response.json();
        showSuccess("Registration successful!");
    } catch (error) {
        showError(error.message);
    }
}

// 13. Debugging and Testing
function debugRegistration(formData) {
    console.log("Form Data:", Object.fromEntries(formData));
    console.log("Current Events:", events);
    console.log("Total Registrations:", registrationTracker.getTotal());
}

// 14. jQuery and JS Frameworks
$(document).ready(function() {
    // Fade in events
    $('.event-card').hide().fadeIn(1000);
    
    // Handle registration button clicks
    $('#registerBtn').click(function() {
        $(this).fadeOut(200).fadeIn(200);
    });
    
    // Quick search functionality
    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.event-card').each(function() {
            const eventName = $(this).find('h4').text().toLowerCase();
            $(this).toggle(eventName.includes(searchTerm));
        });
    });
});

// Add filter events function
function filterEvents(type) {
    const filteredEvents = type === 'all' 
        ? events 
        : events.filter(event => event.category === type);
    displayEvents(filteredEvents);
}

// Update the initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portal...');
    console.log('Events array:', events);
    displayEvents();
    
    // Add event listeners for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        console.log('Search input found');
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            const filteredEvents = events.filter(event => 
                event.name.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm)
            );
            console.log('Filtered events:', filteredEvents);
            displayEvents(filteredEvents);
        });
    } else {
        console.error('Search input not found');
    }
});

// Initialize events data
const eventsData = [
    {
        name: "Summer Music Festival",
        date: "June 15, 2024",
        time: "2:00 PM - 10:00 PM",
        location: "Central Park",
        seats: { available: 45, total: 100 },
        price: 25,
        description: "Join us for a day of live music featuring local bands and artists.",
        type: "music"
    },
    {
        name: "Community Art Exhibition",
        date: "July 1-5, 2024",
        time: "10:00 AM - 6:00 PM",
        location: "City Gallery",
        seats: { available: 78, total: 150 },
        price: 15,
        description: "Showcasing works from local artists and community members.",
        type: "art"
    },
    {
        name: "Food & Culture Fair",
        date: "July 20, 2024",
        time: "11:00 AM - 8:00 PM",
        location: "Downtown Square",
        seats: { available: 120, total: 200 },
        price: 20,
        description: "Experience diverse cuisines and cultural performances.",
        type: "food"
    },
    {
        name: "Wellness Workshop",
        date: "August 5, 2024",
        time: "9:00 AM - 12:00 PM",
        location: "Community Center",
        seats: { available: 25, total: 50 },
        price: 35,
        description: "Learn about health, wellness, and mindfulness practices.",
        type: "workshop"
    }
];

// Function to create event cards
function createEventCardData(event) {
    return `
        <div class="event-card">
            <h4>${event.name}</h4>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Available Seats:</strong> <span class="seats">${event.seats.available}/${event.seats.total}</span></p>
            <p><strong>Price:</strong> $${event.price} per person</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <button onclick="registerEvent('${event.name}')" class="register-btn" ${event.seats.available === 0 ? 'disabled' : ''}>
                ${event.seats.available === 0 ? 'Fully Booked' : 'Register Now'}
            </button>
        </div>
    `;
}

// Function to load events
function loadEventsData() {
    const eventsList = document.querySelector('.events-list');
    if (eventsList) {
        eventsList.innerHTML = eventsData.map(event => createEventCardData(event)).join('');
        console.log('Events loaded successfully');
    } else {
        console.error('Events list container not found');
    }
}

// Function to register for an event
function registerEvent(eventName) {
    const event = eventsData.find(e => e.name === eventName);
    if (event && event.seats.available > 0) {
        // Decrease available seats
        event.seats.available--;
        
        // Update the display
        loadEventsData();
        
        // Scroll to registration form
        document.getElementById('registration').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Set the event type in the registration form
        const eventTypeSelect = document.getElementById('eventType');
        if (eventTypeSelect) {
            eventTypeSelect.value = event.type;
            updateFee({ value: event.type });
        }
        
        // Show confirmation
        alert(`Successfully registered for: ${eventName}\nRemaining seats: ${event.seats.available}`);
    } else {
        alert('Sorry, this event is fully booked!');
    }
}

// Function to filter events
function filterEventsData(type) {
    const filteredEvents = type === 'all' 
        ? eventsData 
        : eventsData.filter(event => event.type === type);
    
    const eventsList = document.querySelector('.events-list');
    if (eventsList) {
        eventsList.innerHTML = filteredEvents.map(event => createEventCardData(event)).join('');
    }
}

// Function to handle search
function handleSearchData() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEvents = eventsData.filter(event => 
            event.name.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.type.toLowerCase().includes(searchTerm)
        );
        
        const eventsList = document.querySelector('.events-list');
        if (eventsList) {
            eventsList.innerHTML = filteredEvents.map(event => createEventCardData(event)).join('');
        }
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing events...');
    loadEventsData();
    
    // Add search input listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', handleSearchData);
    }
});

// Keep existing functions
function updateFee(select) {
    const fees = {
        'music': '$25',
        'art': '$15',
        'food': '$20',
        'workshop': '$35'
    };
    const output = document.getElementById('feeOutput');
    if (select.value) {
        output.textContent = `Event Fee: ${fees[select.value]}`;
        localStorage.setItem('preferredEventType', select.value);
    } else {
        output.textContent = '';
    }
}

// Event Management System
const eventSystem = {
    events: [],
    cart: [],
    filters: {
        category: 'all',
        search: '',
        priceRange: null
    },
    notifications: {
        queue: [],
        isProcessing: false
    },
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
    }
};

// Event Categories with Icons
const categories = {
    music: { icon: 'bi-music-note-beamed', label: 'Music Events' },
    art: { icon: 'bi-palette', label: 'Art Events' },
    food: { icon: 'bi-cup-hot', label: 'Food Events' },
    workshop: { icon: 'bi-tools', label: 'Workshops' },
    sports: { icon: 'bi-trophy', label: 'Sports Events' }
};

// Debug Configuration
const DEBUG = {
    enabled: true,
    logLevel: 'info',
    showTimestamps: true,
    logLevels: ['debug', 'info', 'warn', 'error']
};

// Utility Functions
const utils = {
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    getNotificationIcon: (type) => {
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-exclamation-circle-fill',
            info: 'bi-info-circle-fill',
            warning: 'bi-exclamation-triangle-fill'
        };
        return icons[type] || icons.info;
    },

    debugLog: (message, data = null, level = 'info') => {
        if (!DEBUG.enabled) return;
        if (DEBUG.logLevels.indexOf(level) < DEBUG.logLevels.indexOf(DEBUG.logLevel)) return;

        const timestamp = DEBUG.showTimestamps ? `[${new Date().toISOString()}] ` : '';
        const prefix = `[${level.toUpperCase()}] ${timestamp}`;

        if (data) {
            console.log(`${prefix}${message}:`, data);
        } else {
            console.log(`${prefix}${message}`);
        }
    },

    generateUniqueId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone: (phone) => {
        const re = /^\d{10}$/;
        return re.test(phone);
    },

    // Add new utility functions
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },

    saveToLocalStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            utils.debugLog('Error saving to localStorage:', error, 'error');
            return false;
        }
    },

    loadFromLocalStorage: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            utils.debugLog('Error loading from localStorage:', error, 'error');
            return null;
        }
    }
};

// Notification System
class NotificationSystem {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
        this.settings = {
            position: 'top-right',
            duration: 3000,
            sound: true
        };
    }

    show(message, type = 'info', duration = this.settings.duration) {
        const notification = {
            id: utils.generateUniqueId(),
            message,
            type,
            duration
        };

        this.queue.push(notification);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const notification = this.queue.shift();

        const notificationElement = document.createElement('div');
        notificationElement.className = `alert alert-${notification.type} notification fade-in ${this.settings.position}`;
        notificationElement.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi ${utils.getNotificationIcon(notification.type)} me-2"></i>
                <span>${notification.message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(notificationElement);

        if (this.settings.sound) {
            this.playNotificationSound(type);
        }

        await new Promise(resolve => setTimeout(resolve, notification.duration));
        notificationElement.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));
        notificationElement.remove();

        this.isProcessing = false;
        this.processQueue();
    }

    playNotificationSound(type) {
        const audio = new Audio(`/sounds/${type}.mp3`);
        audio.play().catch(() => {
            utils.debugLog('Could not play notification sound', null, 'warn');
        });
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }
}

// Event Manager
class EventManager {
    constructor() {
        this.events = [];
        this.notificationSystem = new NotificationSystem();
        this.loadEvents();
    }

    async loadEvents() {
        try {
            // Try to load from localStorage first
            const savedEvents = utils.loadFromLocalStorage('events');
            if (savedEvents) {
                this.events = savedEvents.map(event => Object.assign(new Event(), event));
                this.updateEventDisplay();
                return;
            }

            // If no saved events, load from API
            const response = await fetch('https://api.example.com/events');
            const data = await response.json();
            this.events = data.map(event => new Event(
                event.name,
                event.date,
                event.category,
                event.location,
                event.totalSeats,
                event.price
            ));
            this.updateEventDisplay();
        } catch (error) {
            utils.debugLog('Error loading events:', error, 'error');
            // Load default events if API fails
            this.loadDefaultEvents();
        }
    }

    loadDefaultEvents() {
        const defaultEvents = [
            new Event("Summer Music Festival", "2024-06-15", "music", "Central Park", 100, 25),
            new Event("Art Exhibition", "2024-07-01", "art", "City Gallery", 150, 15),
            new Event("Food Fair", "2024-07-20", "food", "Downtown Square", 200, 20),
            new Event("Wellness Workshop", "2024-08-05", "workshop", "Community Center", 50, 35)
        ];
        this.events = defaultEvents;
        this.updateEventDisplay();
    }

    addEvent(event) {
        this.events.push(event);
        utils.saveToLocalStorage('events', this.events);
        this.notificationSystem.show('New event added successfully', 'success');
        this.updateEventDisplay();
    }

    filterEvents(criteria) {
        return this.events.filter(event => {
            const matchesCategory = criteria.category === 'all' || event.category === criteria.category;
            const matchesSearch = event.name.toLowerCase().includes(criteria.search.toLowerCase()) ||
                                event.description?.toLowerCase().includes(criteria.search.toLowerCase());
            const matchesPrice = !criteria.priceRange || 
                               (event.price >= criteria.priceRange.min && 
                                event.price <= criteria.priceRange.max);
            const matchesDate = !criteria.dateRange ||
                               (new Date(event.date) >= criteria.dateRange.start &&
                                new Date(event.date) <= criteria.dateRange.end);
            return matchesCategory && matchesSearch && matchesPrice && matchesDate;
        });
    }

    updateEventDisplay(filteredEvents = this.events) {
        const eventsList = document.querySelector('.events-list');
        if (!eventsList) return;

        if (!filteredEvents.length) {
            eventsList.innerHTML = '<div class="alert alert-info">No events found matching your criteria.</div>';
            return;
        }

        eventsList.innerHTML = filteredEvents.map(event => this.createEventCard(event)).join('');
        this.initializeEventCardInteractions();
    }

    createEventCard(event) {
        return `
            <div class="event-card fade-in" data-event-id="${event.id}">
                <div class="event-image">
                    <img src="${event.imageUrl || 'default-event.jpg'}" alt="${event.name}">
                    <div class="event-category">
                        <i class="bi ${categories[event.category]?.icon}"></i>
                        ${categories[event.category]?.label || event.category}
                    </div>
                </div>
                <div class="event-details">
                    <h4>${event.name}</h4>
                    <p><i class="bi bi-calendar"></i> ${utils.formatDate(event.date)}</p>
                    <p><i class="bi bi-geo-alt"></i> ${event.location}</p>
                    <p><i class="bi bi-people"></i> <span class="seats">${event.availableSeats}/${event.totalSeats}</span> seats available</p>
                    <p><i class="bi bi-tag"></i> ${event.getFormattedPrice()}</p>
                </div>
                <div class="button-group">
                    <button onclick="eventManager.showEventDetails('${event.id}')" class="register-btn" title="View Details">
                        <i class="bi bi-info-circle"></i>
                    </button>
                    <button onclick="eventManager.registerForEvent('${event.id}')" 
                            class="register-btn" 
                            ${!event.checkAvailability() ? 'disabled' : ''} 
                            title="${event.checkAvailability() ? 'Register' : 'Fully Booked'}">
                        <i class="bi bi-person-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }

    initializeEventCardInteractions() {
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    }

    async registerForEvent(eventId) {
        try {
            const event = this.events.find(e => e.id === eventId);
            if (!event) throw new Error('Event not found');
            if (!event.checkAvailability()) throw new Error('Event is fully booked');

            // Show loading state
            const button = document.querySelector(`[data-event-id="${eventId}"] .register-btn`);
            const originalContent = button.innerHTML;
            button.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
            button.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Register user
            const user = { id: utils.generateUniqueId() }; // In real app, get from auth system
            event.register(user);

            // Update display and storage
            this.updateEventDisplay();
            utils.saveToLocalStorage('events', this.events);
            this.notificationSystem.show('Successfully registered for event!', 'success');

        } catch (error) {
            this.notificationSystem.show(error.message, 'error');
            utils.debugLog('Registration error:', error, 'error');
        }
    }

    showEventDetails(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        const modalContent = document.querySelector('#eventModal .modal-body');
        
        modalContent.innerHTML = `
            <div class="event-details-modal">
                <div class="event-header">
                    <h3>${event.name}</h3>
                    <span class="event-category">
                        <i class="bi ${categories[event.category]?.icon}"></i>
                        ${categories[event.category]?.label || event.category}
                    </span>
                </div>
                <div class="event-info">
                    <p><i class="bi bi-calendar"></i> <strong>Date:</strong> ${utils.formatDate(event.date)}</p>
                    <p><i class="bi bi-geo-alt"></i> <strong>Location:</strong> ${event.location}</p>
                    <p><i class="bi bi-people"></i> <strong>Available Seats:</strong> ${event.availableSeats}/${event.totalSeats}</p>
                    <p><i class="bi bi-tag"></i> <strong>Price:</strong> ${event.getFormattedPrice()}</p>
                    <p><i class="bi bi-info-circle"></i> <strong>Description:</strong> ${event.description || 'No description available'}</p>
                </div>
                <div class="event-actions">
                    <button onclick="eventManager.registerForEvent('${event.id}')" 
                            class="btn btn-primary" 
                            ${!event.checkAvailability() ? 'disabled' : ''}>
                        ${event.checkAvailability() ? 'Register Now' : 'Fully Booked'}
                    </button>
                    <button onclick="eventManager.shareEvent('${event.id}')" class="btn btn-outline-primary">
                        <i class="bi bi-share"></i> Share
                    </button>
                </div>
            </div>
        `;

        modal.show();
    }

    async shareEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: event.name,
                    text: `Join me at ${event.name} on ${utils.formatDate(event.date)}!`,
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const shareUrl = `${window.location.origin}/events/${eventId}`;
                await navigator.clipboard.writeText(shareUrl);
                this.notificationSystem.show('Event link copied to clipboard!', 'success');
            }
        } catch (error) {
            utils.debugLog('Error sharing event:', error, 'error');
            this.notificationSystem.show('Could not share event', 'error');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    utils.debugLog('Initializing application...', null, 'info');
    
    // Create event manager instance
    window.eventManager = new EventManager();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load user preferences
    loadUserPreferences();
});

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', utils.debounce(handleSearch, 300));
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterEvents(category);
        });
    });

    // Form submissions
    const registrationForm = document.querySelector('#registration form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    const feedbackForm = document.querySelector('#feedback form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }

    // Add new event listeners
    document.addEventListener('keydown', handleKeyboardShortcuts);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
}

// Load user preferences
function loadUserPreferences() {
    const preferences = utils.loadFromLocalStorage('userPreferences');
    if (preferences) {
        eventSystem.preferences = { ...eventSystem.preferences, ...preferences };
        applyUserPreferences();
    }
}

// Apply user preferences
function applyUserPreferences() {
    // Apply theme
    document.body.classList.toggle('dark-theme', eventSystem.preferences.theme === 'dark');
    
    // Apply language
    document.documentElement.lang = eventSystem.preferences.language;
    
    // Apply notification settings
    eventManager.notificationSystem.updateSettings({
        sound: eventSystem.preferences.notifications
    });
}

// Event Handlers
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEvents = eventManager.filterEvents({
        ...eventSystem.filters,
        search: searchTerm
    });
    eventManager.updateEventDisplay(filteredEvents);
}

function filterEvents(category) {
    const filteredEvents = eventManager.filterEvents({
        ...eventSystem.filters,
        category
    });
    eventManager.updateEventDisplay(filteredEvents);
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + F to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
}

function handleOnlineStatus() {
    const isOnline = navigator.onLine;
    eventManager.notificationSystem.show(
        isOnline ? 'You are back online!' : 'You are offline. Some features may be limited.',
        isOnline ? 'success' : 'warning'
    );
}

async function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        // Validate form data
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        if (!utils.validateEmail(email)) {
            throw new Error('Please enter a valid email address');
        }
        
        if (phone && !utils.validatePhone(phone)) {
            throw new Error('Please enter a valid 10-digit phone number');
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Process registration
        const registrationData = Object.fromEntries(formData);
        utils.debugLog('Registration data:', registrationData, 'info');

        // Save registration to localStorage
        const registrations = utils.loadFromLocalStorage('registrations') || [];
        registrations.push({
            ...registrationData,
            id: utils.generateUniqueId(),
            timestamp: new Date().toISOString()
        });
        utils.saveToLocalStorage('registrations', registrations);

        // Show success message
        eventManager.notificationSystem.show('Registration successful! We\'ll contact you soon.', 'success');
        form.reset();

    } catch (error) {
        eventManager.notificationSystem.show(error.message, 'error');
        utils.debugLog('Registration error:', error, 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleFeedbackSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        // Validate form data
        const email = formData.get('feedbackEmail');
        if (!utils.validateEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Process feedback
        const feedbackData = Object.fromEntries(formData);
        utils.debugLog('Feedback data:', feedbackData, 'info');

        // Save feedback to localStorage
        const feedbacks = utils.loadFromLocalStorage('feedbacks') || [];
        feedbacks.push({
            ...feedbackData,
            id: utils.generateUniqueId(),
            timestamp: new Date().toISOString()
        });
        utils.saveToLocalStorage('feedbacks', feedbacks);

        // Show success message
        eventManager.notificationSystem.show('Thank you for your feedback!', 'success');
        form.reset();
        document.getElementById('feedbackCharCount').textContent = '0/500 characters';

    } catch (error) {
        eventManager.notificationSystem.show(error.message, 'error');
        utils.debugLog('Feedback error:', error, 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Export functions for use in HTML
window.eventSystem = eventSystem;
window.filterEvents = filterEvents;
window.handleRegistration = handleRegistration;
window.handleFeedbackSubmit = handleFeedbackSubmit;
window.countFeedbackCharacters = countFeedbackCharacters;
window.findNearbyEvents = findNearbyEvents;