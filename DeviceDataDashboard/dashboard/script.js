/*
  Data fetch script. Uses Fetch to get a text file
  every five seconds, and fill its contents into 
  a div on the HTML page. 

  Based on my fetch example (https://tigoe.github.io/html-for-conndev/fetch/). 

  created 30 Dec 2022
  by Tom Igoe
*/

// this function is called once on page load (see below):
function setup() {
  // set an interval to run fetchText() every 5 seconds:
  setInterval(fetchText, 5000);
}

// make an HTTP call to get a text file:
function fetchText() {
  // parameters for the HTTP/S call
  let params = {
    mode: 'cors', // if you need to turn off CORS, use no-cors
    headers: {    // any HTTP headers you want can go here
      'accept': 'application/text'
    }
  }
  // make the HTTP/S call:
  fetch('log.json', params)
    .then(response => response.text())  // convert response to text
    .then(data => getResponse(data))    // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

// function to call when you've got something to display:
function getResponse(data) {
  document.getElementById('result').innerHTML = data;
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);
