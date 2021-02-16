
function fetchJSON() {
  // make the HTTP/HTTPS call:
  fetch('/json')
    .then(response => response.json())  // convert response to JSON
    .then(data => getResponse(JSON.stringify(data)))   // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

function fetchText() {
  // make the HTTP/S call:
  fetch('/text')
    .then(response => response.text())  // convert response to text
    .then(data => getResponse(data))    // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

function postJson(value) {
  // parameters for the HTTP/S call
  let postData = {'temperature': value};
  let params = {
    method: 'POST', // HTTP method
    headers: {      // any HTTP headers you want can go here
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(postData)
  }
  // make the HTTP/S call:
  fetch('/data', params)
    .then(response => response.json())  // convert response to text
    .then(data => getResponse(JSON.stringify(data)))    // get the body of the response
    .catch(error => getResponse(error));// if there is an error
}

// function to call when you've got something to display:
function getResponse(data) {
  document.getElementById('result').innerHTML = data;
}