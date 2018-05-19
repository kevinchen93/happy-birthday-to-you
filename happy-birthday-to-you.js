/* 

------ STEPS ------
1.  Ensure that name is in correct format (only strings, also account for 		special characters).

2. Once correct name format is inputted, compare it to object key/value pairs.

2a. Play a birthday song if dates match; otherwise, a Rick Roll.

*/

const birthdayObj = {

	'Abdullah Sayeem': 513,
	'Andre Chow': 103,
	'Gurdeep Singh': 327,
	'Jimmy Feng': 711,
	'John Chen': 1202,
	'Kevin Chen': 627,
	'Kevin Cheung':	521,
	'Mohammed Rahman': 305,
	'Robert Tan': 523,
	'Roland Zhou': 903,
	'Vainius Glinskis': 805,
	'Zarif Rahat': 1107,

};

function validateInputName() {
	let text = nameInput.value.toLowerCase();
	// any combination of letters separated by a whitespace
	let nameFormat = /^[a-zA-Z]+\s+[a-zA-Z]+$/; 

	return nameFormat.test(text);
}

function confirmOnList() {
	let text = nameInput.value.toLowerCase();

	for (let name in birthdayObj) {
		name = name.toLowerCase();

		if (text === name) {
			return true;
		}
	}

	return false;
}

function getCurrentDate() {
	const today = new Date();
	const dd = today.getDate();
	const mm = today.getMonth() + 1; // January is 0!
	const yyyy = today.getFullYear();

	return `${mm}${dd}`; 
}

const nameInputContainer = document.querySelector('.name-input-container');
const nameInput = document.getElementById('name-input');
const mainContent = document.querySelector('.main-content');
const goButton = document.getElementById('go-button');

goButton.addEventListener('click', function(event) {

	// remove last child of both `<div>`s every time go button is clicked*
	if (nameInputContainer.lastChild.nodeName === 'H6') {
		nameInputContainer.lastChild.remove();
	}

	if (nameInputContainer.lastChild.nodeName === 'H1') {
		mainContent.lastChild.remove();
	}

	// STEP 1 
	// Ensure that name is in correct format (only strings)

	// variables for validation
	let isValidatedOrNot = validateInputName();
	const heading6 = document.createElement('h6');
	heading6.style.margin = '5px';

	// variables for confirmation
	let text = nameInput.value.toLowerCase();
	let onListOrNot = confirmOnList();
	let todaysDate = getCurrentDate();
	const heading1 = document.createElement('h1');
	const birthdayVideo = document.createElement('iframe');
	
	// CASE 1: User inputs empty string
	if (text === '') {
		heading6.innerHTML = `Please enter a name.`;
		nameInputContainer.appendChild(heading6);
	// CASE 2: User inputs a non-empty string but in the incorrect format
	} else if (isValidatedOrNot === false) {
		heading6.innerHTML = `Please enter your name in the correct format.`;
		nameInputContainer.appendChild(heading6);

	// STEP 2 
	// Once correct name format is inputted, compare it to object key/value pairs. 

	// CASE 1: User is a member
	} else if (onListOrNot === true) {
		for (let name in birthdayObj) {

			// CASE 1a: His or her birthday is today
			// set this to true for testing purposes
			// condition should be 
			// `if (birthdayObj[name] === getCurrentDate())
			if (true) {
				// include birthday video
				heading6.innerHTML = `Happy birthday!`;

				birthdayVideo.style.width = '450px';
				birthdayVideo.style.height= '300px';
				birthdayVideo.src = 'https://www.youtube.com/embed/_z-1fTlSDF0?autoplay=1';

				mainContent.appendChild(heading6);
				mainContent.appendChild(birthdayVideo);
			// CASE 1b: birthday is not today
			} else {
				// include heading
				heading1.innerHTML = `You are a member but today is not your birthday. . .`;
				heading1.style.cssText = 'font-size: 36px; margin-top: 125px; text-align: center';
						
				mainContent.appendChild(heading1);
			}
		}

	// CASE 2: User is not a member
	} else if (onListOrNot === false) {
		// include heading and Rick Roll

		birthdayVideo.style.width = '495px';
		birthdayVideo.style.height= '279px';
		birthdayVideo.src = 'videos/Rick_Astley_-_Never_Gonna_Give You_Up.mp4';

		heading6.innerHTML = `Sorry. You are not a member. Please click <a href='https://btb.com' style='color: #1abc9c;'>here</a> to apply for BTB Brotherhood.`;
		heading1.style.cssText = 'font-size: 30px; text-align: center';

		mainContent.appendChild(heading6);
		mainContent.appendChild(birthdayVideo);
	}
});

// *

// Entering text and pressing the go button more than once will not remove 
// what was previously added to the `<div>`s so messages will stack on top of 
// each other. To address this issue, I tried to implement code to remove the last child of each `<div>`.
