/* webSerial in p5.js
  This sketch shows how to combine the webSerial API
  and p5.js

  created 28 Jan 2022
  by Tom Igoe
*/

// the DOM elements that might be changed by various functions:
let portButton;   // the open/close port button
let textToSend = '';
let receivedText = '';
let timeText = '';

async function setup() {
  createCanvas(400, 300);
  if ("serial" in navigator) {
    // set up event listeners for serial device connect and disconnect:
    navigator.serial.addEventListener("connect", serialConnect);
    navigator.serial.addEventListener("disconnect", serialDisconnect);
    webserial.addEventListener('data', serialRead);
    // port open/close button:
    portButton = createButton('open port');
    portButton.position(10, 10);
    portButton.mousePressed(openClosePort);
  }
  textSize(18);
}

function draw() {
  background(255);
  text('To send: ' + textToSend, 10, 50);
  text('Received: ' + receivedText, 10, 80);
}

function serialRead(event) {
  receivedText = event.detail;
}

function keyReleased() {
  // this function is triggered with every keystroke in the input field.
  // listen for the enter key (keyCode = 13) 
  // add to the textToSend and skip the rest of
  // the function if you get any other key:
  if (keyCode != 13) {
    textToSend += key;
    return;
  }
  // if you do get an enter keyCode, send
  // texToSend out the serial port:
  sendSerial(textToSend);
  textToSend = '';
}

function mouseReleased() {
  // send the mouseX out the serial port:
  textToSend = mouseX;
  sendSerial(mouseX);
}

async function openClosePort() {
  // label for the button will change depending on what you do:
  let buttonLabel = "Open port";
  // if port is open, close it; if closed, open it:
  if (port) {
    await closePort();
  } else {
    await openPort();
    buttonLabel = "Close port";
  }
  // change button label:
  portButton.html(buttonLabel);
}
