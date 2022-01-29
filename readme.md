
# HTML for Connected Devices
Operating a digital device without a screen is a challenge. Screens are expensive components to add if you're designing a household device like a connected speaker or an air purifier, so many device designers use a connection between the device and your mobile device or personal computer to provide a screen interface. This has its own complications, most importantly:

* How do the devices connect? 
* With multiple operating systems, how do you program the device with the screen?

Most screen-based computers have a web browser on them, making HTML and web connections an easy way to approach this problem. What follows is an introduction to just enough web development to make screen-based interfaces for many connected devices, and a collection of techniques for quick development of those interfaces.

## HTML, CSS, JavaScript, and the DOM

A web application is typically a combination of  HTML to define the structural elements of the page (paragraphs, headings, input elements, etc.), Cascading Style Sheets (CSS) to define the styles and layout of the elements, and JavaScript to define their behavior. These three technologies (HTML, CSS, and JavaScript) comprise the **Document Object Model**, or **DOM** of a web application. The objects are the various HTML elements and CSS styles. JavaScript is the programming language used to manipulate the DOM and to communicate with other devices.

You can build a user interface using HTML, CSS and JavaScript and communications protocols to communicate changes betwen that interface and the devices it's designed to control.

There are thousands of tutorials to introduce web development, so there's no need to repeat that here. The [Mozilla Developer Network](https://developer.mozilla.org/) site is a good reference. This site is heavily indepbted to (and heaviy linked to pages on) MDN. Covered below is enough information to send and receive data from devices to a web page. 

A minimal browser-based interface for a connected device might include a few input elements to change the device's properties, and a few text fields to display those properties. For example, imagine a connected air purifier. It would need controls to turn the device on and off, to set the fan speed, and perhaps set a schedule for when it should turn and off next, and a few text fields to report the state of the purifier and perhaps the last time the filter was changed. If the purifier includes an air quality sensor, perhaps it will report the sensor's readings as well. The interface might look something like [this page](purifier.html). 

By using JavaScript to manipulate the elements of the page, you can make the various text elements, like the spans, responsive to the values of the inputs, like the button or the slider. You can send those values to a web server using the JavaScript `fetch()` command, or you can use other communications protocols to send the values to connected devices. 

### HTML Input Elements

There are many input elements defined in the HTML5 specification, and you can use them to gather all sorts of structured data. You can both get and set the value of an input element in JavaScript.

Here's a [page with all of the input elements](input-types/index.html). Changing any of them will put its value in a `<span>` next to the input.

In addition to these, there are a few other forms of input that do not use the `<input>` tag, like` <textarea>`, `<select>` and `<option>`. 

Inputs are often enclosed in forms, which allow you to access all of the elements of a form in one collection. When you do this, it's good practice to give each element a name attribute, as the element names will be sent in name/va;ue pairs as part of the request when you submit the form. 

[Form elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) have many attributes, but the most important are the action, which is the server URL that will process the form information when you submit it. the method, which determines how the HTTP request is sent (GET, POST, etc), and the target, which determines which window or tab the results of the form request will be displayed in. 

You can use a form without giving it an action if you simply want a structure for collecting all the input elements' values. In the input-types example in this repository, the form is used as a convenient way to iterate over all the inputs to clear them in the `clearValues()` [function in the JavaScript](input-types/script.js). 

For more on input elements, see the [MDN Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) page. 

### DOM Events

There are a number of [events associated with the DOM](https://developer.mozilla.org/en-US/docs/Web/Events) and DOM elements. You can use these to take action when an element changes its value, loses or gains focus, and so forth. There are also mouse and keyboard events that typically apply to the whole document. 

There are two common ways to capture an element's event. You can either add a call to a JavaScript function directly in the HTML, or you can add an event listener in a separate script. 

Adding the call directly is a quick way to test an idea. For example, here's how you would add an `onchange` event to a text input element:

````
<input type="text" onchange="getValue(this)" id="text">
````

In this case, whenever the input has a change (for example,adding or losing a character), the `getValue()` function is called,and the element itself is passed to the function, so you can get its properties. You can see this approach in action in the [input-types example](input-types/index.html).

You can also add an event listener in your JavaScript. In the HTML, you only define the element and its properties:

````
<input type="text" id="text">

````

Then in JavaScript, you get the element and add the listener function:

````
let in = document.getElementById('text');

in.addEventListener('change', getValue);

function getValue(event) {
  // the element itself is the target of the event,
  // which is passed to this listener function:
  let textValue = event.target.value;
}
````

Adding event listeners takes more typing, but it lets you keep your elements' behaviors (defined in JavaScript) separate from their properties (defined in HTML) and their styles (defined in CSS).

### Client-Side JavaScript Structure

A typical client-side JavaScript is structured like this:

* define functions to listen for DOM events
* add a listener function for the page load event

There's not typically a main loop, as you might be used to for C or Java; all the action happens on user-generated events. You can make some timed functions using `setInterval()` or `setTimeout()`, but these are typically less common.

Here's a [plain Javascript template](template/script.js). It goes with this [HTML page](template/index.html). This [style sheet](template/styles.css) is used to set the positions of the elements. 


### DOM Manipulation in JavaScript

Every JS library has its own shortcuts for manipulating DOM elements in JavaScript, but it's not that hard to do without a library. DOM elements are sub-elements (sometimes called children) of the HTML `document` element, and there are various JS functions for getting them:

* `document.getElementsByTagName('input')` returns all the elements of a given tag, such as `input`
* `document.getElementById('powerInput')` returns the element with the id `powerInput`
* `document.getElementsByClassName('controls')` returns all the elements with the class name `controls`
* `document.getElementsByName('sensor')` returns all the elements with the name `sensor`

Once you've got an element, you can get or set any of its properties.

## Positioning and Layout with CSS

As you saw in the [input elements example](input-types/index.html) and the [air purifier example](purifier.html) page, the elements of a page need to be laid out in a readable way. The HTML document defines what elements will be in a page, but it doesn define their positions. Without some instructions, elments follow each other one after another. The CSS page for each of those examples defines the elements positions. 

The purifier example combines the CSS and HTML in one page. The input types example follows a more typical pattern, separating the HTML, CSS, and JS into three documents and including the CSS and JS in the head of the HTML. 

Both examples are made up of a few elements: 
* divisions, or `<div>` elements, defining larger groups of text or controls
* text labels, sometimes on their own, and sometimes in `<label>` elements
* input elements
* `<span>` elements to display the input elements' values

Planning out the page in terms of different element types simplifies layout. In the CSS for each example, the input and span elements are positioned in their own columns, and the labels are not positioned, assuming they will automatically position at the beginning of each line. You can see this in the CSS for the purifier example:

````
input {
  position: sticky;
  left: 120px;
}

span {
  position: sticky;
  left: 300px;
}
````
This is a very minimal layout. They get more complicated, and CSS offers a number of ways to manage layout. For a thorough introduction, see MDN's  [Learning CSS layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout) tutorial. The pages on [normal flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow), [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox), [grids](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids), [floats](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats), and [positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning) provide a good foundation. 

### Responsive Layout for Mobile Devices

Different devices determine the way that a page is displayed. Text which looks great on a laptop or desktop computer might look a little small on a tablet, and far too small to read on a phone. The HTML and CSS specifications give you some ways to control this dynamically. You can make media queries in CSS, and you can use the viewport meta tag as defined in HTML to control layout. MDN's pages on [media queries](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries) and [the viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) cover these two topics in greater details. Here's the summary: 

#### The Viewport
Any browser's viewport is the area where the content is visible. It changes when you resize a window, and of course it changes depending on the size of your device's screen. Apple introduced the `<viewport>` tag in Safari, and other browswers have adopted it as a way to get the size of the viewable area. It's still not an official HTML specification, but works in most mobile browsers as of this writing. It goes in the head of the HTML document and looks like this:

````
  <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86">
````
The width of the viewport is determined by the device or current window's width; the initial scale sets the zoom. You change the scale by pinching and zooming, as limited by the minimum and maximum scales. 

You can read viewport as a JSON object by calling `window.visualViewport`. There are also events associated with it, the most common of which is the resize event. Here's a JS snippet to print the viewport out and to add an event listener: 

````
console.log(window.visualViewport);

visualViewport.addEventListener('resize', function() {
  console.log('window is now ' + window.visualViewport.width + 'x' + window.visualViewport.height);
});
````

### CSS Media Queries

CSS media queries let you apply different CSS styles depending on the state of the viewport or device. There are four categories of media styles: screen, print, speech, and all. Using these, you can set different rules for a screen reader, for example, using the speech category, or for a mobile screen using the screen category and the width and height of the viewport. The tricky part is that mobile devices will often set a virtual viewport that's larger than the viewable area by default, and then shrink it to fit. That makes for timy text.  The `<viewport>` meta tag adjusts for this. You can adjust for the resize that many mobile devices impose by setting the initial scale and minimum-scale values. Here's a typical example from [MDN's page on the viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag):

````
<meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86">
`````

You can combine this with responsive calculation in the CSS, like so:

````
@media screen and (max-width: 600px) {
  body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      /* calculate the font size based on the view width:  */
      font-size: calc(18px + 6 * ((100vw) / 320));
  }
}
````

This example assumes that it should only apply the changes to windows with a max width of 600 pixels. Under those conditions, it calculates a font size that's based on the viewport width. You can see this in action in the [responsive-layout example](responsive-layout/). 

You can also make adjustments based on other conditions, like the orientation of the screen (portrait or landscape), whether the device has a pointer that can hover over an element, and other media features of the OS. For more on this, see [MDN's page on media query features](https://developer.mozilla.org/en-US/docs/Web/CSS/@media). 

## A Local Web Server

When you're developing web interfaces, it's often useful to have a local web server to serve the files, rather than just opening them from your computer's filesystem. For example, you might want to open the file on a mobile phone or tablet. A quick solution for this that's installed by default on MAcOS, Windows 10, and Linux is Python's SimpleHTTPServer script. You can start it from the command line (MacOS Terminal; Windows Powershell) by changing directories to the directory where your HTML files are and typing:

````
python -m SimpleHTTPServer
````
You'll get a response like this:

````
Serving HTTP on 0.0.0.0 port 8000 ...
````

Then you can open a browser and enter `http://localhost:8000` or your computer's IP address followed by `:8000` to see your files. To stop the server, type control-C.

You'll often need to know your computer's IP address as well. You can get this from your system's control panel, or on the command line using the ifconfig on MAcOS or Linux, and ipcommand on Windows. Look for the IP address of your WiFi interface. On MacOS, it's called `en0`; on Windows 10, `Wireless LAN Adapter Wi-Fi`; on Linux, usually `wlan0`. If your computer's IP address is something like 192.168.1.10, you'd enter `http://192.168.1.10:8000` in the browser's address bar to get your files. 

## Communications Protocols

To connect your web interface to other devices, there are a number of protocols you can choose from. The easiest ones are the web-based protocols that the browser and DOM technologies use all the time. HTTP (the Hypertext Transaport Protocol) and HTTPS allow you to make requests to web servers. WebSockets are an extension of HTTP that allow you to maintain a persistent connection to a web server, if the server supports WebSockets. MQTT (Message Queueing Telemetry Transfer) is a lighter weight protocol designed for communication with devices. QR codes are an easy way to transfer text-based information, including URLs, from one computer to another. All of these can be implemented in a browser, using only HTML and JavaScript. 

What follows are examples and links to how to use these four protocols in a web application. 

### HTTP
HTTP is the first protocol of the Web and the DOM. Every time you go to a website, you use HTTP. Every `<a href="">` tag, every `<img src=">` tag, and many others enable HTML to make HTTP requests. The `<form>` tag enables HTTP requests using all of HTTP's request methods, GET, POST, PUT, DELETE, and PATCH. If you're curious to try different request methods and get to know what they look like, [HTTPBin](https://httpbin.org/) is a useful online tool for testing different kinds of HTTP requests. [Curl](https://curl.se/) is a command line tool for making HTTP requests of all kinds. 

You can also make HTTP requests in JavaScript using `fetch()`, detailed in the [fetch example](fetch/) in this repository. Fetch allows you to bring new content into a page without reloading the page. It's a good way to get the latest values from a connected device, either directly if the device has an HTTP interface, or indirectly, through an HTTP server. 

A typical fetch request looks like this:

````
  // make the HTTP/HTTPS call:
  fetch('http://my.device.address/sensor')
    .then(response => response.json())  // convert response to JSON
    .then(data => getResponse(data))   // get the body of the response
    .catch(error => getResponse(error));// if there is an error

  function getResponse(result) {
    // do something with the resulting data:
     console.log(result);
  }
````

HTTP requests are stateless, meaning that the client makes a request, the server sends a response, and the connection is closed. This is great for many network transactions, because it's discrete and you don't maintain the connection. If you want more information, you just make the request again. However, HTTP doesn't afford a way for the server to push information to the client. All requests originate with the client. If you want information updated repeatedly, it's up to the client to make the repeated request. You can either ask the user to click a link a button again, or use a combination of `fetch()` and `setInterval()` in JavaScript, like so:

````
function makeRequest() {
  // add the fetch() request shown above here
}

// make a request every ten seconds:
setInterval(makeRequest, 10000);
````

You can also use an HTML META tag to refresh the entire page periodically. This tag typically goes in the HTML document's head, and it looks like this:

````
<meta http-equiv="refresh" content="10">
````

The `content` parameter sets the page to refresh every ten seconds.

If you need a communication pattern in which either client or server can send a message to each other at any time, consider either WebSockets or MQTT.

### WebSockets

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are an extension of the HTTP specification designed to support a full-duplex, encrypted connection between client and server. They're good for cases where you need for the server to be able to send updates to the client, or when you need multiple clients to communicate with each other in a chatroom-style duplex communication. 

Unlike regular HTTP requests, every WebSocket connection has a session state that must be maintained by server and client. If either side loses the connection, a new session must be started by the client. This makes them a bit more fragile than HTTP request-based communication, because if the client loses a network connection, the server may not know immediately, and continue to send messages across the abandoned session connection.

In order to use WebSockets, your server must support WebSocket connections. 

The W3C WebSocket API is a part of the core JavaScript API, available in all browsers. There is a [WebSocket client example](websocket/) in this repository that connects to [Lob's](https//echo.websocket.events) test WebSocket server. There is another popular API, socket.io, which implements WebSockets slightly differently than the W3C standard. The socket.io API is mostly, but not totally, compatible with the standard.

### MQTT
Message Queueing Telemetry Transfer, or [MQTT](https://mqtt.org/), is a lightweight network protocol for communication between devices. It's designed to support equipment that may not always be online, like automated devices built with microcontrollers. It offers the two-way communication possibilities of WebSockets without the need to maintain session state. 

MQTT server programs are called brokers. A broker keeps track of messages from clients, and allows any client to query the last message sent by another client.  Messages are organized into topics. Typically, a topic represents a device, with each sub-topic representing its characteristics.  For example, a weather station might have the main topic "station" with subtopics "temperature", "humidity", "air quality", and so forth. The weather station itself would send messages to each of the subtopics, and a web client might subscribe to those topics to graph them onscreen over time. 

Clients  either publish new messages to topics, or subscribe to topics, and the broker notifies them when new messages arrive.  For this reason,  MQTT is known as a Publish & Subscribe, or PubSub system. 

See my [mqtt-examples repository](https://tigoe.github.io/mqtt-examples/) for more explanation and examples of MQTT in action. 

### QR Codes
[QR Codes](https://www.qrcode.com/en/) are a useful way to transfer text information from one computer to another via  browser and camera. QR codes can be generated from an arbitrary text string in a browser using JavaScript. You can use them to transfer URLs, phone numbers, text messages, addresses, or any other textual information. Generally, mobile device QR code readers are context sensitive, and can pick the right app to open a text string of a given format (like a URL). There are countless sites online to generate QR codes, along with multiple libraries in many programming languages. Kazuhiko Arase has a useful JavaScript library available at [this link](https://github.com/kazuhikoarase/qrcode-generator). It's also hosted at this CDN:
  https://unpkg.com/qrcode-generator@1.4.4/qrcode.js in case you want to add the CDN link in the head of your HTML document. 

  There is a [QR Code generator example](qr-code/) in this repository. The [Responsive Layout example](responsive-layout/) also contains a dynamically generated QR code in it. 

# Browsers and Hardware Interfaces
Browsers have historically been limited from accessing the hardware of a computer. In the early days of the web and browsers, the thinking was that, since anything could be downloaded from the web, malicious code could be inserted into a computer from the browser, so the browser should be limited in terms of the hardware that it can affect. As a result, interfaces like serial and parallel ports, USB, Bluetooth, NFC, and so forth have generally been off-limits to the browser. 

As the web has become ubiquitous, developers have seen the value of using it as a generalized hardware interface, and browser plugins to access hardware have developed. These still post security risks. However, many companies and developers see these risks as manageable, if rigorous standards are set for how browsers access hardware. 

Google/Alphabet has done considerable work on setting standards for browser interfaces to hardware. They have developed APIs for [WebBluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API), [WebMIDI](https://www.w3.org/TR/webmidi/), [WebUSB](https://developer.mozilla.org/en-US/docs/Web/API/USB), and are working on [WebNFC](https://w3c.github.io/web-nfc/). All of these are available in the Chrome browser, and some are available to other browsers as well. 

MDn maintins a list of all [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and their current states. 

### Geolocation
If the device that your browser is on has geolocation capability, it can be accessed via the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API). Here is a [geolocation example](geolocation/).

### Sensors
The W3C defines a number of different sensor APIs to access the various sensors available on mobile devices. the Sensor APIs only work when served via HTTPS, so you might want to test on a platform-as-a-service like [glitch.com](http://www.glitch.com).  The sensors are not available on all devices, so you need to check to see whether they're available and accessible first. The sensors in the API are:
* Accelerometer
* AmbientLightSensor
* Gyroscope
* LinearAccelerationSensor
* Magnetometer
* OrientationSensor

Here's an example that runs all the sensors: [sensor tests](sensor-tests) (also hosted on [Glitch](https://glitch.com/edit/#!/sensor-tests))

Useful links:
* [Sensor](https://developer.mozilla.org/en-US/docs/Web/API/Sensor)
* [Sensor APIs Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs)

### Web Bluetooth
The Web Bluetooth API makes it possible to connect to Bluetooth devices through some browsers.Yining Shi and Jingwen Zhu's [p5.ble library](https://itpnyu.github.io/p5ble-website/) simplifies the Web Bluetooth API, and is developed to work with [p5.js](https://p5js.org/), but can be used on its own as well. In the links below are some adaptations of the p5.ble examples to work without p5.js. 

Unfortunately Web Bluetooth does not work on every browser, particularly on mobile platforms. However, these examples have been tested successfully on Chrome on MacOS and Windows; Chrome on Android, and [WebBLE](https://apps.apple.com/us/app/webble/id1193531073) on iOS. Supposedly they should work on Opera and Edge as well.

Useful links:
* [WebBluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
* [p5.BLE.js](https://itpnyu.github.io/p5ble-website/) - a p5.js API for Bluetooth LE
* p5.ble [ButtonLED example](bluetooth-p5ble/ButtonLED/index.html)
* p5.ble [Read One Characteristic example](bluetooth-p5ble/ReadOneCharacteristic/index.html)

### WebMIDI
Useful links:
* [WebMIDI](https://www.w3.org/TR/webmidi/)
* [p5.js WebMIDI examples](https://github.com/tigoe/SoundExamples/tree/master/WebMidi_Examples)


### WebUSB
Useful links:
* [WebUSB](https://developer.mozilla.org/en-US/docs/Web/API/USB)
* [WebUSB GitHub Pages](https://wicg.github.io/webusb/)
* [WebUSB for Arduino](https://github.com/webusb/arduino)

### WebNFC
Useful links:
* [WebNFC](https://w3c.github.io/web-nfc/)