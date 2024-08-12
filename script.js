// Query Selectors
const eventContainer = document.querySelector('.event-container');
const formContainer = document.querySelector('.form-container');

//Event Selectors

const dayTitle = document.querySelector('#day_title');
const dayName = document.querySelector('#day_name');
const hourTitle = document.querySelector('#hour_title');
const hourName = document.querySelector('#hour_name');
const minuteTitle = document.querySelector('#minute_title');
const minuteName = document.querySelector('#minute_name');
const secondsTitle = document.querySelector('#seconds_title');
const secondsName = document.querySelector('#seconds_name');

//time Selectors

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//countdown timer
let countdownTimer;


//FUNCTION: STORAGE CHECK
function checkLocalStorage() {
    if (localStorage.getItem('eventTracker.event') === "",
        localStorage.getItem('eventTracker.event') === []) {
    }
}
//EVENT WINDOW LOADING