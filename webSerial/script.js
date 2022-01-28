/*
WebSerial example
Reads from a webSerial serial port, and writes to it. 

created 28 Jan 2022
by Tom Igoe

*/

// Serial port elements:
let port;
let reader;
let writer;
let keepReading = true;
let serialReadPromise;

// the DOM elements that might be changed by various functions:
let portButton;
let readingsSpan;
let timeSpan;

function setup() {
  // get the DOM elements and assign any listeners needed:
  // user text input:
  const textInput = document.getElementById("txt");
  textInput.addEventListener("keyup", readTextInput);
  // user range input:
  const slider = document.getElementById("dim");
  slider.addEventListener("change", readRangeInput);
  // port open/close button:
  portButton = document.getElementById("portButton");
  portButton.addEventListener("click", openClosePort);
  // span for incoming serial messages
  readingsSpan = document.getElementById("readings");
  // span for incoming serial messages
  timeSpan = document.getElementById("seconds");

}

async function openClosePort() {
  if ("serial" in navigator) {
    // if the port exists, it's likely open. CloÍse it:
    if (port) {
      keepReading = false;
      // stop the reader if it's doing something, so you can close:
      reader.cancel();
      // close the serial reader function
      await serialReadPromise;
      // close the serial port itself:
      await port.close();
      // change the button label:
      portButton.innerHTML = "open port";
      // clear the port variable:
      port = null;
    } else {
      // if the port is null, try to open it:
      try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        // start the serial reader function:
        keepReading = true;

        serialReadPromise = listenForSerial();
        // change the button label:
        portButton.innerHTML = "Close port";
      } catch (err) {
        console.error("There was an error opening the serial port:", err);
      }
    }
  }
}

function readTextInput(event) {
  // this function is triggered with every keystroke in the input field.
  // so listen for the enter key (keyCode = 13) and skip the rest of
  // the function if you get any other key:
  if (event.keyCode != 13) {
    return;
  }
  // if you do get an enter key, send the value of the field
  // out the serial port:
  sendData(event.target.value);
}

function readRangeInput(event) {
  // send the controller's value out the serial port:
  sendData(event.target.value);
}

async function sendData(data) {
  // if the port's open and readable:
  if (port) {
    if (port.readable) {
      writer = port.writable.getWriter();
      // convert the data to be sent to an array:
      var output = new TextEncoder().encode(data);
      writer.write(output).then(writer.releaseLock());
    }
  }
}

async function listenForSerial() {
  let result;
  while (port.readable && keepReading) {
    reader = port.readable.getReader();
    try {
      const { value, done } = await reader.read();
      // convert the result to a text string:
      let inString = new TextDecoder().decode(value);
      // Put the string in a span:
      readingsSpan.innerHTML = inString;
      // if it's not JSON, you can skip to the catch below.
      // if it's JSON, parse it:
      let jsonInput = JSON.parse(inString);
      // if you've got a valid object with
      // the property you want:
      if (jsonInput.secs) {
        timeSpan.innerHTML = jsonInput.secs;
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Allow the serial port to be closed later.
      reader.releaseLock();
    }
  }
}

// run the setup function when all the page is loaded:
document.addEventListener("DOMContentLoaded", setup);