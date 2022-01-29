/* webSerial in p5.js
  This sketch shows how to combine the webSerial API
  and p5.js

  created 28 Jan 2022
  by Tom Igoe
*/

// Serial port elements:
let port;               // the serial port
let reader;             // port reader object
let writer;             // port writer object
let keepReading = true; // keeps the listenForSerial loop going
let serialReadPromise;  // Promise for the listenForSerial function

// the DOM elements that might be changed by various functions:
let portButton;   // the open/close port button
let textToSend = '';
let receivedText = '';
let timeText = '';

function setup() {
  createCanvas(400, 300);
  // port open/close button:
  portButton = createButton('open port');
  portButton.position(10, 10);
  portButton.mousePressed(openClosePort);
  textSize(18);
}

function draw() {
  background(255);
  text('To send: ' + textToSend, 10, 50);
  text('Received: ' + receivedText, 10, 80);
  text('Seconds: ' + timeText, 10, 110);
}


async function openClosePort() {
  // if the browser supports serial:
  if ("serial" in navigator) {
    // if the port exists, it's likely open. Close it:
    if (port) {
      // set keepReading false to stop the listenForSerial loop:
      keepReading = false;
      // stop the reader, so you can close the port:
      reader.cancel();
      // wait for the listenForSerial function to stop:
      await serialReadPromise;
      // close the serial port itself:
      await port.close();
      // change the button label:
      portButton.html("open port");
      // clear the port variable:
      port = null;
    } else {
      // if the port is null, try to open it:
      try {
        // pop up window to select port:
        port = await navigator.serial.requestPort();
        // set port settings and open it:
        await port.open({ baudRate: 9600 });
        // enable the listenForSerial loop:
        keepReading = true;
        // start the listenForSerial function:
        serialReadPromise = listenForSerial();
        // change the button label:
        portButton.html("Close port");
      } catch (err) {
        // if there's an error opening the port:
        console.error("There was an error opening the serial port:", err);
      }
    }
  }
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
  sendData(textToSend);
  textToSend = '';
}

function mouseReleased() {
  // send the mouseX out the serial port:
  textToSend = mouseX;
  sendData(mouseX);
}

async function sendData(data) {
  // if the port's open and readable:
  if (port) {
    if (port.readable) {
      // initialize the writer:
      writer = port.writable.getWriter();
      // convert the data to be sent to an array:
      var output = new TextEncoder().encode(data);
      // send it, then release the writer:
      writer.write(output).then(writer.releaseLock());
    }
  }
}

async function listenForSerial() {
  // while the port is open and keepReading is true:
  while (port.readable && keepReading) {
    // initialize the reader:
    reader = port.readable.getReader();
    try {
      // read incoming serial buffer:
      const { value, done } = await reader.read();
      // convert the input to a text string:
      let inString = new TextDecoder().decode(value);
      // Put the string into receivedText:
      receivedText = inString;
      // if it's not JSON, you can skip to the catch below.
      // if it's JSON, parse it:
      let jsonInput = JSON.parse(inString);
      // if you've got a valid object with the property you want:
      if (jsonInput.secs) {
        // put it in timeText:
        timeText = jsonInput.secs;
      }
    } catch (error) {
      // if there's an error reading the port:
      console.log(error);
    } finally {
      // once the read is done, release the reader.
      // this enables other functions to run port.close():
      reader.releaseLock();
    }
  }
}