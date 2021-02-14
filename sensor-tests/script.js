/*
  Get sensor readings 
  Gets the device's sensors. Also makes a QR code of the URL, to make
  it easy to open the page on a mobile device.
  Uses 
  https://github.com/kazuhikoarase/qrcode-generator
  as the QR Code generator library. It's hosted at this CDN:
  https://unpkg.com/qrcode-generator@1.4.4/qrcode.js

  and makes it the source of an image tag in the page. 
  Uses a responsive CSS to adjust the size of the type as well.

  created 14 Feb 2021 
  by Tom Igoe
*/

// get the network connection intefface (depends on device):
let connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

// variables for the sensors:
let accel, gyro, light, compass;

function setup() {
  // get the network type and effective network type and display them:
  var netSpan = document.getElementById("networkType");
  netSpan.innerHTML =
    "Network type: " +
    connection.type +
    "<br>Effective connection: " +
    connection.effectiveType;

  // get the error div so you can show errors:
  var errorDiv = document.getElementById("error");

  // get the accelerometer and start it:
  try {
    accel = new Accelerometer({ frequency: 60 });
    accel.addEventListener("reading", accelReading);
    accel.start();
  } catch (error) {
    errorDiv.innerHTML += error + "<br>";
  }
  // get the gyroscope and start it:
  try {
    gyro = new Gyroscope({ frequency: 60 });
    gyro.addEventListener("reading", gyroReading);
    gyro.start();
  } catch (error) {
    errorDiv.innerHTML += error + "<br>";
  }

  // get the ambient light sensor and start it:
  try {
    light = new AmbientLightSensor({ frequency: 60 });
    light.addEventListener("reading", lightReading);
    light.start();
  } catch (error) {
    errorDiv.innerHTML += error + "<br>";
  }
  // get the magnetometer and start it:
  try {
    compass = new Magnetometer({ frequency: 60 });
    compass.addEventListener("reading", compassReading);
    compass.start();
  } catch (error) {
    errorDiv.innerHTML += error + "<br>";
  }
  // make a QR code of the URL:
  getQrCode();
}

function accelReading() {
  var accelDiv = document.getElementById("accel");
  accelDiv.innerHTML =
    "Accel X " +
    accel.x.toPrecision(2) +
    " m/s<sup>2</sup><br>Accel Y " +
    accel.y.toPrecision(2) +
    " m/s<sup>2</sup><br>Accel Z " +
    accel.z.toPrecision(2) +
    " m/s<sup>2</sup>";
}

// TODO: get units
function gyroReading() {
  var gyroDiv = document.getElementById("gyro");
  gyroDiv.innerHTML =
    "gyro X " +
    gyro.x.toPrecision(2) +
    "<br>gyro Y " +
    gyro.y.toPrecision(2) +
    "<br>gyro Z " +
    gyro.z.toPrecision(2);
}

function lightReading() {
  var lightDiv = document.getElementById("light");
  lightDiv.innerHTML = "illuminance: " + light.illuminance + " lux";
}

// TODO: get units
function compassReading() {
  var compassDiv = document.getElementById("compass");
  compassDiv.innerHTML =
    "magnetometer X " +
    compass.x.toPrecision(2) +
    "<br>magnetometer Y " +
    compass.y.toPrecision(2) +
    "<br>magenetometer Z " +
    compass.z.toPrecision(2);
}

// add a QR code of the URL when the page loads
function getQrCode() {
  // make the QR code:
  let qr = qrcode(0, "L");
  qr.addData(document.URL);
  qr.make();
  // create an image from it:
  let qrImg = qr.createImgTag(2, 8, "qr code of " + document.URL);
  // get the image and label:
  let label = document.getElementById("qr");
  label.innerHTML = qrImg + "<br>" + document.URL;
}

// on page load, call the QR code function:
document.addEventListener("DOMContentLoaded", setup);
