import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//
const refs = {
  inpurEl: document.querySelector('#datetime-picker'),
  startEl: document.querySelector('button[data-start]'),
};

//
//
// refs.inpurEl.addEventListener('input');
refs.startEl.addEventListener('click', onStartClick);
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
flatpickr(refs.inpurEl, options);
//
//

function selectedDate(userTime) {
  let intervalId = setInterval(() => {
    const currentTime = userTime - Date.now();
    // console.log(currentTime);

    const { days, hours, minutes, seconds } = convertMs(currentTime);

    console.log(`${days}:${hours}:${minutes}:${seconds}`);
  }, 1000);
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
