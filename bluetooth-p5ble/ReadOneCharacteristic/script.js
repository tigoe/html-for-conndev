/*
p5.ble without p5.js - read one characteristic

Uses the p5.ble library to make Bluetooth connections to a plain JavaScript page. This is an adaptation of the p5.ble Read One characteristic script at https://itpnyu.github.io/p5ble-website/docs/read-one-char-callback

This script works with this ArduinoBLE example: 
https://github.com/tigoe/html-for-conndev/tree/main/bluetooth-p5ble/ReadOneCharacteristic/SensorCharacteristic/
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
  // Create a 'Connect' button
  const connectButton = document.getElementById('connect');
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
    console.log(error);
    textDiv.innerHTML = 'error: ' + error;
    return;
  }

  console.log('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristic, gotValue);
}

// A function that will be called once got values
function gotValue(error, value) {
  // if there's an error, 
  // notify the user and quit the function:
  if (error) {
    textDiv.innerHTML = 'error: ' + error;
    return;
  }

  // if you have a valid value, use it to set the 
  // document properties:
  if (value || value === 0) {
    // set document background color:
    let myColor = 'rgb('+ value + ',255,255)';
    document.body.style.backgroundColor = myColor;
    // Write value on the canvas
    textDiv.innerHTML = value;
  }
  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristic, gotValue);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.read(myCharacteristic, 'string', gotValue);
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);