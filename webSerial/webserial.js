// TODO: multiple ports

// need self = this because connect/disconnect
// functions are outside the main class:
let self;

class WebSerialPort {
  constructor() {
    // if webserial doesn't exist, return false:
    if (!navigator.serial) {
      alert("WebSerial is not enabled in this browser");
      return false;
    }
    this.autoOpen = true;
    self = this;

    this.port;
    this.reader;
    this.serialReadPromise;
    // add an incoming data event:
    this.incoming = {
      data: null
    }
    // incoming serial data event:
    this.dataEvent = new CustomEvent('data', {
      detail: this.incoming,
      // you want this event to bubble up so that
      // you can assign a data event handler using 
      // this.on('data', event) as well
      bubbles: true
    });

    this.on = (message, handler) => {
      if (message == 'connect') {
        navigator.serial.addEventListener("connect", serialConnect);
       } else if (message == 'disconnect') {
        navigator.serial.addEventListener("disconnect", serialDisconnect);
      }
      parent.addEventListener(message, handler);
    };
  }

  async openPort(thisPort) {
    try {
      // if no port is sent, 
      if (thisPort == null) {
        // pop up window to select port:
        this.port = await navigator.serial.requestPort();
      } else {
        this.port = thisPort;
      }
      // set port settings and open it:
      await this.port.open({ baudRate: 9600 });
      // start the listenForSerial function:
      this.serialReadPromise = this.listenForSerial();

    } catch (err) {
      // if there's an error opening the port:
      console.error("There was an error opening the serial port:", err);
    }
  }

  async closePort() {
    console.log(this)
    if (this.port) {
      // stop the reader, so you can close the port:
      this.reader.cancel();
      // wait for the listenForSerial function to stop:
      await this.serialReadPromise;
      // close the serial port itself:
      await this.port.close();
      // clear the port variable:
      this.port = null;
    }
  }

  async sendSerial(data) {
    // if there's no port open, skip this function:
    if (!this.port) return;
    // if the port's writable: 
    if (this.port.writable) {
      // initialize the writer:
      const writer = this.port.writable.getWriter();
      // convert the data to be sent to an array:
      var output = new TextEncoder().encode(data);
      // send it, then release the writer:
      writer.write(output).then(writer.releaseLock());
    }
  }

  async listenForSerial() {
    if (!this.port) return;
    // while the port is open:
    while (this.port.readable) {
      // initialize the reader:
      this.reader = this.port.readable.getReader();
      try {
        // read incoming serial buffer:
        const { value, done } = await this.reader.read();
        if (value) {
          // convert the input to a text string:
          this.incoming.data = new TextDecoder().decode(value);

          // fire the event:
          parent.dispatchEvent(this.dataEvent);
        }
        if (done) {
          break;
        }
      } catch (error) {
        // if there's an error reading the port:
        console.log(error);
      } finally {
        this.reader.releaseLock();
      }
    }
  }
}

// this event occurs every time a new serial device
// connects via USB:
function serialConnect(event) {
  console.log(event.target);
  // TODO: make this selectable
  if (self.autoOpen) {
    self.openPort(event.target);
  }
}

// this event occurs every time a new serial device
// disconnects via USB:
function serialDisconnect(event) {
  console.log(event.target);
}