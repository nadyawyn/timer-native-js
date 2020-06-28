//Count number of milliseconds corresponding to the DEADLINE
//and deduce the number of milliseconds corresponding to the CURRENT date.
//Defining rest number of seconds, min, hours and total number of days

function getTimeRemaining(endTime) {
	let t = Date.parse(endTime) - Date.parse(new Date()),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60),
		hours = Math.floor((t / (1000 * 60 * 60)) % 24),
		days = Math.floor((t / (1000 * 60 * 60)) / 24);

	//Return the function data as an array:
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function setClock(id, endtime) {

	//Get all the necessary HTML elements we will need to change:
	let timer = document.getElementById(id),
		seconds = timer.querySelector('.seconds'),
		minutes = timer.querySelector('.minutes'),
		hours = timer.querySelector('.hours'),
		days = timer.querySelector('.days'),
		daysDivider = timer.querySelector('.days-divider'),
		daysDividerWrapper = timer.querySelector('.divider-wrapper');
	//Set the interval our timer will update with:
	timeInterval = setInterval(updateClock, 1000);


	function updateClock() {
		let t = getTimeRemaining(endtime);

		//If our seconds, minutes and hours value is only 1 digit, add "0" to make it look better:
		if (t.seconds < 10) {
			seconds.textContent = '0' + t.seconds;
		} else {
			seconds.textContent = t.seconds;
		}
		if (t.minutes < 10) {
			minutes.textContent = '0' + t.minutes;
		} else {
			minutes.textContent = t.minutes;
		}
		if (t.hours < 10) {
			hours.textContent = '0' + t.hours;
		} else {
			hours.textContent = t.hours;
		}

		//Check if we have any DAYS left, if so, add the divider span with "days," or "day,"
		if (t.days > 0) {
			days.textContent = t.days;
			daysDivider.textContent = 'days,';
			if (t.days == 1) {
				daysDivider.textContent = 'day,';
			}
		} else {
			days.classList.add('hidden');
			daysDivider.classList.add('hidden');
			daysDividerWrapper.classList.add('hidden');
		}

		//If the deadline has already passed, make all the spans display "00"
		if (t.total <= 0) {
			seconds.textContent = '00';
			minutes.textContent = '00';
			hours.textContent = '00';

			clearInterval(timeInterval);
		}

	}
}

//Set 2 values here: 1) html ID of your timer block 2) your deadline date
let blockid = 'timer',
	deadline = '2020-07-01';

//Launch the function!
setClock(blockid, deadline);
