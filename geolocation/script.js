/*
Geolocation script. Gets your location, puts it in a header

created 7 Jan 2021 
by Tom Igoe
*/

let header;

// this function is called when the page is loaded. 
// element event listeners are  added here:
function setup(event) {
  header = document.getElementById('location');
  if (navigator.geolocation) {
    header.innerHTML = 'Looking for you...';
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    header.innerHTML = 'Your browser does not support geolocation.';
  }
}

function showError(error) {
  header.innerHTML = error.message;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  header.innerHTML = "You are at: " + latitude + ", " + longitude;
}

// add a listener for the page to load:
window.addEventListener('load', setup);