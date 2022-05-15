
// Serial port elements:
let port;               // the serial port
let reader;             // port reader object
let serialReadPromise;  // Promise for the listenForSerial function
let autoOpen = true;
let webserial = this;

// this event occurs every time a new serial device
// connects via USB:
function serialConnect(event) {
  console.log(event);
  checkPorts();
  if (autoOpen) openPort(event.target);
}

// this event occurs every time a new serial device
// disconnects via USB:
function serialDisconnect(event) {
  console.log(event.target);
}

async function checkPorts() {
  const ports = await navigator.serial.getPorts();
  for (p of ports) {
    let deviceInfo = p.getInfo();
    console.log("USB Vendor ID: " + deviceInfo.usbVendorId);
    console.log("USB Product ID: " + deviceInfo.usbProductId);
  }
}

async function openPort(thisPort) {
  try {
    // if no port is sent, 
    if (thisPort == null) {
      // pop up window to select port:
      port = await navigator.serial.requestPort();
    } else {
      // open the port that was sent:
      port = thisPort;
    }
    // set port settings and open it:
    await port.open({ baudRate: 9600 });
    // start the listenForSerial function:
    serialReadPromise = listenForSerial();
  } catch (err) {
    // if there's an error opening the port:
    console.error("There was an error opening the serial port:", err);
  }
}

async function closePort() {
  if (port) {
    // stop the reader, so you can close the port:
    reader.cancel();
    // wait for the listenForSerial function to stop:
    await serialReadPromise;
    // close the serial port itself:
    await port.close();
    // clear the port variable:
    port = null;
  }
}

async function sendSerial(data) {
  // if there's no port open, skip this function:
  if (!port) return;
  // if the port's writable: 
  if (port.writable) {
    // initialize the writer:
    const writer = port.writable.getWriter();
    // convert the data to be sent to an array:
    var output = new TextEncoder().encode(data);
    // send it, then release the writer:
    writer.write(output).then(writer.releaseLock());
  }
}

async function listenForSerial() {
  // while the port is open:
  while (port.readable) {
    // initialize the reader:
    reader = port.readable.getReader();
    try {
      // read incoming serial buffer:
      const { value, done } = await reader.read();
      if (value) {
        // convert the input to a text string:
        let inString = new TextDecoder().decode(value);
        // Put the string into receivedText:
        receivedText = inString;
        // generate an event for the main script
        // to read:
        const event = new CustomEvent('data', {
          detail: inString
        });
        webserial.dispatchEvent(event);
      }
      if (done) {
        break;
      }
    } catch (error) {
      // if there's an error reading the port:
      console.log(error);
    } finally {
      reader.releaseLock();
    }
  }
}