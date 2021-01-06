
# HTML for Connected Devices

Operating a digital device without a screen is a challenge. Screens are expensive components to add if you're designing a household device like a connected speaker or an air purifier, so many device designers use a connection between the device and your mobile device or personal computer to provide a screen interface. This has its own complications, most importantly:

*  How do the devices connect? 
* With multiple operating systems, how do you program the device with the screen?

Most screen-based computers have a web browser on them, making HTML and web connections an easy way to approach this problem. What follows is an introduction to just enough web development to make screen-based interfaces for many connected devices.

## HTML, CSS, JavaScript, and the DOM

A web application is typically a combination of  HTML to define the structural elements of the page (paragraphs, headings, input elements, etc.), CSS to define the styles and layout of the elements, and JavaScript to define their behavior. These three technologies (HTML, CSS, and JavaScript) comprise the Document Object Model, or DOM of a web application. The objects are the various HTML elements and CSS styles. JavaScript is the programming language used to manipulate the DOM and to communicate with other devices.

You can build a user interface using HTML, CSS and JavaScript and communications protocols to communicate changes betwen that interface and the devices it's designed to control.

There are thousands of tutorials to introduce web development, so there's no need to repeat that here. The [Mozilla Developer Network](https://developer.mozilla.org/) site is a good reference. Covered below is enough information to send and receive data from devices to a web page. 

A minimal browser-based interface for a connected device might include a few input elements to change the device's properties, and a few text fields to display those properties. For example, imagine a connected air purifier. It would need controls to turn the device on and off, to set the fan speed, and perhaps set a schedule for when it should turn and off next, and a few text fields to report the state of the purifier and perhaps the last time the filter was changed. If the purifier includes an air quality sensor, perhaps it will report the sensor's readings as well. The interface might look something like this (these elements don't actually do anything in this page):

  <style>
input {
  position: sticky;
  left: 120px;
}

span {
  position: sticky;
  left: 300px;
}
  </style>
  <div id="deviceState">
  <button id="power">Power</button><span id="onState"> on </span><br>
  Fan speed<input type="range" min=0 max=10><span id="fanSpeed">medium</span><br>
  Air quality: <span id="AQI">80%</span><br>
  Last filter Change: <span id="filter">Jan 20, 2019</span>
</div>
<br>
<div id="schedule">
  Turn on at: <input type="datetime-local" ><br>
  Turn off at: <input type="datetime-local"><br>
</div>
<br>

The HTML and CSS for this looks like this:
````
  <style>
/* style elements are here to align the controls vertically */
input {
  position: sticky;
  left: 120px;
}

span {
  position: sticky;
  left: 300px;
}
  </style>

  <div id="deviceState">
  <button id="power">Power</button><span id="onState"> on </span><br>
  Fan speed<input type="range" min=0 max=10><span id="fanSpeed">medium</span><br>
  Air quality: <span id="AQI">80%</span><br>
  Last filter Change: <span id="filter">Jan 20, 2019</span>
</div>
<br>
<div id="schedule">
  Turn on at: <input type="datetime-local" ><br>
  Turn off at: <input type="datetime-local"><br>
</div>
`````

By using JavaScript to manipulate the elements of the page, you can make the various text elements, like the spans, responsive to the values of the inputs, like the button or the slider. You can send those values to a web server using the JavaScript `fetch()` command, or you can use other communications protocols to send the values to connected devices. 

### HTML Input Elements

There are XX input elements defined in the HTML5 specification, and you can use them to gather all sorts of structured data. 

### DOM Manipulation in JavaScript

### Responsive Layout for Mobile Devices

### A Local Web Server

## Communications Protocols

### HTTP

### QR Codes

### MQTT

### WebSockets

# Browsers and Hardware Interfaces

### Web Bluetooth

### WebMIDI

### WebUSB

### WebNFC