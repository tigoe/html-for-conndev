
function fetchJSON() {
  // parameters for the HTTP/S call
  let params = {
    mode: 'cors', // if you need to turn off CORS, use no-cors
    headers: {    // any HTTP headers you want can go here
      'accept': 'application/json',
      'connection': 'keep-alive'
    }
  }
  // make the HTTP/HTTPS call:
  fetch('https://dweet.io/get/dweets/for/my-thing-name')
    .then(response => response.json())  // convert response to JSON
    .then(data => getResponse(JSON.stringify(data)))   // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

function fetchText() {
  // parameters for the HTTP/S call
  let params = {
    mode: 'cors', // if you need to turn off CORS, use no-cors
    headers: {    // any HTTP headers you want can go here
      'accept': 'application/text',
      'connection': 'keep-alive'
    }
  }
  // make the HTTP/S call:
  fetch('https://httpbin.org/encoding/utf8', params)
    .then(response => response.text())  // convert response to text
    .then(data => getResponse(data))    // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

// function to call when you've got something to display:
function getResponse(data) {
  document.getElementById('result').innerHTML = data;
}