 // where your data is at:
  let dataSource = 'https://';
  // Create a new FileReader
  let reader = new FileReader();
  // set up an event listener for when the FileReader is read:
  reader.addEventListener("load", handleResponse);
  let incomingData = new Array();

  function setup() {
    // load the data source variable into the dataURL text field:
    document.getElementById('dataURL').value = dataSource;
    fetchData();
  }

  function loop() {
    fetchData();
    updateCount();
  }

  function fetchData() {
    // clear the result div:
    document.getElementById('count').innerHTML = "Loading data...";
    // get the URL from the dataURL field:
    let currentSource = document.getElementById('dataURL').value;

    // parameters for the HTTP/S call
    let params = {
      mode: 'cors', // if you need to turn off CORS, use no-cors
      headers: {    // any HTTP headers you want can go here
        'accept': '*/*',
        'connection': 'keep-alive'
      }
    }
    // make the HTTP/S call:
    fetch(currentSource, params)
      .then(response => response.blob())  // convert response to blob
      .then(data => getResponse(data))    // get the body of the response
      .catch(error => getResponse(error));// if there is an error
  }

  // function to call when you've got something to display:
  function getResponse(data) {
    // clear the array:
    incomingData = new Array();
    // load the FileReader:
    reader.readAsText(data);
  }

  function showData() {
    // clear the result div:
    document.getElementById('result').innerHTML = "Loading data...<br>";

    for (var i in incomingData) {
      processReading(incomingData[i]);
    }
  }

  // this is called when you call reader.readAsText:
  function handleResponse() {
    let input = reader.result;
    // Split into lines 
    const lines = input.split('\n');
    // Process lines
    for (var line of lines) {
      // make sure it's not an empty line:
      if (line) {
        let currentReading = JSON.parse(line);
        // if you want to add a conditional to check that the data 
        // is relevant, here's where to do it. For example, add to the incomingData only if the location is "home":
        if (currentReading.location == "home") {
          incomingData.push(currentReading);
        };
      }
    }
  }


  function processReading(thisReading) {
    // print it to the result div:
    for (var item in thisReading) {
      document.getElementById('result').innerHTML += item + ":" + thisReading[item] + "<br>";
    }
    // add a separator for each reading:
    document.getElementById('result').innerHTML += "<br>";
  }

  function updateCount() {
    document.getElementById('count').innerHTML = " Data count: " + incomingData.length;
  }

  // This is a listener for the page to load.
  // This is the command that actually starts the script:
  window.addEventListener('DOMContentLoaded', setup);
  // run the loop function every ten seconds:
  setInterval(loop, 10000);