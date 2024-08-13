// Query Selectors
const eventContainer = document.querySelector('.event-container');
const formContainer = document.querySelector('.form-container');

// Event Selectors
const dayTitle = document.querySelector('#day_title');
const dayName = document.querySelector('#day_name');
const hourTitle = document.querySelector('#hour_title');
const hourName = document.querySelector('#hour_name');
const minuteTitle = document.querySelector('#minute_title');
const minuteName = document.querySelector('#minute_name');
const secondTitle = document.querySelector('#second_title');
const secondName = document.querySelector('#second_name');

// Time Constants
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Countdown Timer Variable
let countdownTimer;

// FUNCTION: ADD HIDDEN CLASS
function addHiddenClass(element) {
    element.classList.add('hidden');
}

// FUNCTION: REMOVE HIDDEN CLASS
function removeHiddenClass(element) {
    element.classList.remove('hidden');
}

// FUNCTION: STORAGE CHECK
function checkLocalStorage() {
    const storedEvent = localStorage.getItem('eventTracker.event');
    if (storedEvent === "" || storedEvent === null) {
        showForm();
    } else {
        const event = JSON.parse(storedEvent);
        showEvent(event.title, event.date);
    }
}

//FUNCTION: saveEventToLocalStorage
function saveEventToLocalStorage(title, date) {
    const event = {
        title,
        date,
    };
    localStorage.setItem('eventTracker.event', JSON.stringify(event));
}


//FUNCTION: deleteEventFromLocalStorage

function deleteEventFormLocalStorage() {
    localStorage.setItem('eventTracker.event', '[]');
}


//FUNCTION: START  COUNTDOWN-TIMER
function startCountdownTimer(title, date) {
    const eventTitle = document.querySelector('.event_title');
    eventTitle.textContent = title;
    updateCountdown(date);
}

//FUNCTION: updateCountdown

function updateCountdown(date) {
    const currentTime = new Date().getTime();
    const countdownTime = date - currentTime;



    // Time math
    const newDay = Math.floor(countdownTime / day);
    const newHour = Math.floor((countdownTime % day) / hour);
    const newMinute = Math.floor((countdownTime % hour / minute);
    const newSecond = Math.floor((countdownTime % minute) / second);

}
// FUNCTION: SHOW FORM
function showForm() {
    removeHiddenClass(formContainer);
    addHiddenClass(eventContainer);
    deleteEventFormLocalStorage();
    const title = document.querySelector('#title');
    title.focus();
}

// FUNCTION: SHOW EVENT
function showEvent(title, date) {
    saveEventToLocalStorage(title, date);
    startCountdownTimer(title, date);
    removeHiddenClass(eventContainer);
    addHiddenClass(formContainer);
}

// FUNCTION: SAVE EVENT TO LOCAL STORAGE
function saveEventToLocalStorage(title, date) {
    const event = { title, date };
    localStorage.setItem('eventTracker.event', JSON.stringify(event));
}

// FUNCTION: START COUNTDOWN TIMER
function startCountdownTimer(title, date) {
    const eventDate = new Date(date).getTime();

    countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Calculate Time
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Update UI
        dayTitle.textContent = days;
        hourTitle.textContent = hours;
        minuteTitle.textContent = minutes;
        secondTitle.textContent = seconds;

        // If event date is reached, stop countdown
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.event_countdown').textContent = "Event has started!";
        }
    }, 1000);
}

// EVENT: SUBMIT FORM
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const eventInput = document.querySelector('#event').value;

    // VALIDATOR
    if (title === '' || eventInput === '') {
        return alert('Please enter a title and a date');
    }

    showEvent(title.value, date);
    title.value = '';
    eventInput.value = '';

});

//EVENT: DELATE BTN
const eventBtn = document.querySelector('.event-btn').addEventListener('click',
    showForm
)

//EVENT: WINDOW LOAD
window.addEventListener('DOMContentLoaded', checkLocalStorage);
