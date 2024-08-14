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

// Function to convert a date to local time based on the PC's timezone
function toLocalTime(date) {
    return new Date(date.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
}

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
    if (!storedEvent) {
        showForm();
    } else {
        const event = JSON.parse(storedEvent);
        showEvent(event.title, event.date);
    }
}

// FUNCTION: SAVE EVENT TO LOCAL STORAGE
function saveEventToLocalStorage(title, date) {
    const event = { title, date };
    localStorage.setItem('eventTracker.event', JSON.stringify(event));
}

// FUNCTION: DELETE EVENT FROM LOCAL STORAGE
function deleteEventFromLocalStorage() {
    localStorage.removeItem('eventTracker.event');
}

// FUNCTION: START COUNTDOWN TIMER considering local timezone
function startCountdownTimer(title, date) {
    const eventTitle = document.querySelector('.event_title');
    eventTitle.textContent = title;

    const localEventDate = toLocalTime(new Date(date));

    updateCountdown(localEventDate.getTime());  // Immediately update the countdown
    countdownTimer = setInterval(() => {
        updateCountdown(localEventDate.getTime());
    }, 1000);
}

// FUNCTION: UPDATE COUNTDOWN considering local timezone
function updateCountdown(date) {
    const currentTime = new Date().getTime();
    const countdownTime = date - currentTime;

    // Time math
    const newDay = Math.floor(countdownTime / day);
    const newHour = Math.floor((countdownTime % day) / hour);
    const newMinute = Math.floor((countdownTime % hour) / minute);
    const newSecond = Math.floor((countdownTime % minute) / second);

    // Update Event
    dayTitle.textContent = newDay;
    hourTitle.textContent = newHour;
    minuteTitle.textContent = newMinute;
    secondTitle.textContent = newSecond;

    // Update names
    dayName.textContent = `day${newDay === 1 ? '' : 's'}`;
    hourName.textContent = `hour${newHour === 1 ? '' : 's'}`;
    minuteName.textContent = `minute${newMinute === 1 ? '' : 's'}`;
    secondName.textContent = `second${newSecond === 1 ? '' : 's'}`;

    // If the countdown is finished
    if (countdownTime <= 0) {
        clearInterval(countdownTimer);
        document.querySelector('.event_countdown').textContent = "Event has started!";

    }
}

// FUNCTION: SHOW FORM
function showForm() {
    removeHiddenClass(formContainer);
    addHiddenClass(eventContainer);
    deleteEventFromLocalStorage();
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

    const date = new Date(eventInput).getTime();

    if (isNaN(date)) {
        return alert('Invalid date. Please enter a valid date.');
    }

    showEvent(title, date);

    // Reset form
    form.reset();
});

// EVENT: DELETE BUTTON
const eventBtn = document.querySelector('.event-btn');
eventBtn.addEventListener('click', showForm);

// EVENT: WINDOW LOAD
window.addEventListener('DOMContentLoaded', checkLocalStorage);
