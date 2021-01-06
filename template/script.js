/*
Template Script 
Defines a setup function to initialize element event listners,
and the event listeners themselves. Finally, it sets a listener for
the  document to load in the window, which calls setup().

created 6 Jan 2021 
by Tom Igoe
*/

// this function is called when the page is loaded. 
// element event listeners are  added here:
function setup(event) {
  console.log('page is loaded');

  // add listeners for the power button and the fan speed:
  let powerButton = document.getElementById('power');
  powerButton.addEventListener('click', turnOnOff);

  let fanSlider = document.getElementById('fanSpeed');
  fanSlider.addEventListener('change', setFanSpeed);

// set an interval function to run once a second:
 setInterval(setTime, 1000); 
}

function turnOnOff(event) {
  // get the event target:
  let thisButton = event.target;
  // change its value, depending on its current value:
  if (thisButton.value == 'on') {
    thisButton.value = 'off';
  } else {
    thisButton.value = 'on';
  }
  //get the span associated with it and change its text:
  let thisSpan = document.getElementById(thisButton.id + 'Val');
  thisSpan.innerHTML = "Power is " + thisButton.value;
}


function setFanSpeed(event) {
    // get the event target:
  let thisSlider = event.target;
    //get the span associated with it and change its text:
  let thisSpan = document.getElementById(thisSlider.id + 'Val');
  thisSpan.innerHTML = thisSlider.value;
}

function setTime() {
  // get current date and time as a string:
  let now = new Date().toTimeString();
  // get the time span element and put the time in it:
  let timeSpan = document.getElementById('time');
  timeSpan.innerHTML = now;
}

// add a listener for the page to load:
window.addEventListener('load', setup);