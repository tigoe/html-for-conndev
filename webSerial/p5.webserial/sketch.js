
/* p5.webSerial in p5.js
  This sketch shows how to use p5.webSerial
  in p5.js

  created 20 May 2022
  by Tom Igoe
*/

const serial = new p5.WebSerial();
let portButton;
let textToSend = '';
let receivedText = '';

function setup() {
  createCanvas(800, 600);
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialRead);

  textSize(18);
}

function draw() {
  background(255);
  text('To send: ' + textToSend, 10, 50);
  text('Received: ' + receivedText, 10, 80);
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton('choose port');
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port 
// button invisible:
function openPort() {
  serial.open();
  console.log("port open")
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// read any incoming data as a string
// (assumes a newline at the end of it):
function serialRead() {
  receivedText = serial.readLine();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}