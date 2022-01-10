import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//
const parent = document.querySelector('.timer');
const refs = {
  // parent: document.querySelector('.timer'),

  inpurEl: parent.querySelector('#datetime-picker'),
  startEl: parent.querySelector('button[data-start]'),
  spanDay: parent.querySelector('.value[data-days]'),
  spanHours: parent.querySelector('.value[data-hours]'),
  spanMinutes: parent.querySelector('.value[data-minutes]'),
  spanSeconds: parent.querySelector('.value[data-seconds]'),
};
console.log(refs.span);

//
//
// refs.inpurEl.addEventListener('input');
// refs.startEl.addEventListener('click', onStartClick);
//
//

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    const startTime = Date.now();
    const userTime = selectedDates[0].getTime();
    if (startTime > userTime) {
      alert('Please choose a date in the future');
      return;
    }
    selectedDate(userTime);
  },
};
flatpickr('#datetime-picker', options);
//
//

function selectedDate(userTime) {
  let intervalId = setInterval(() => {
    const currentTime = userTime - Date.now();
    // console.log(currentTime);

    const time = convertMs(currentTime);

    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.spanDay.innerHTML = days;
  refs.spanHours.innerHTML = hours;
  refs.spanMinutes.innerHTML = minutes;
  refs.spanSeconds.innerHTML = seconds;
}
function onStartClick() {
  console.log('okkk');
}
onStartClick();

//
//
//
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//
