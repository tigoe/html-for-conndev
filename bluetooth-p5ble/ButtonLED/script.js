/*
p5.ble without p5.js

Uses the p5.ble library to make Bluetooth connections to a plain JavaScript page. This is an adaptation of the p5.ble Getting Started script at https://itpnyu.github.io/p5ble-website/docs/getstarted.html

This script works with the ArduinoBLE library example called ButtonLED: 
https://github.com/arduino-libraries/ArduinoBLE/tree/master/examples/Peripheral/ButtonLED

Library documentaton:
https://www.arduino.cc/en/Reference/ArduinoBLE

created 20 Feb 2021
updated 25 Feb 2021 
by Tom Igoe
*/

// advertised service UUID of the  to search for:
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
// characteristic that you plan to read:
let myCharacteristic;
// instance of p5.ble:
let myBLE;
// DOM elements to interact with:
let connectButton;
let textDiv;

// this function is called when the page is loaded. 
// event listener functions are initialized here:
function setup(event) {
  console.log('page is loaded');
  // Create a p5ble instance:
  myBLE = new p5ble();
  // put the DOM elements into global variables:
  connectButton = document.getElementById('connect');
  connectButton.addEventListener('click', connectToBle);
  textDiv = document.getElementById('messages');
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
 // if there's an error, 
 // notify the user and quit the function:
  if (error) {
    textDiv.innerHTML = 'error: ' + error;
    return;
  }
  // if no error, update the page:
  textDiv.innerHTML = 'characteristics: ' + characteristics;
  // read the second characteristic 
  // (the buttonCharacteristic in the Arduino example):
  myCharacteristic = characteristics[1];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristic, gotValue);
}

// This function will be called once you have a value:
function gotValue(error, value) {
  if (error) console.log('error: ', error);
  textDiv.innerHTML = 'value: ' + value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristic, gotValue);
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);