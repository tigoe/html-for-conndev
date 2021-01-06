
# HTML for Connected Devices

Operating a digital device without a screen is a challenge. Screens are expensive components to add if you're designing a household device like a connected speaker or an air purifier, so many device designers use a connection between the device and your mobile device or personal computer to provide a screen interface. This has its own complications, most importantly:

*  How do the devices connect? 
* With multiple operating systems, how do you program the device with the screen?

Most screen-based computers have a web browser on them, making HTML and web connections an easy way to approach this problem. What follows is an introduction to just enough web development to make screen-based interfaces for many connected devices.

## HTML, CSS, JavaScript, and the DOM

A web application is typically a combination of  HTML to define the structural elements of the page (paragraphs, headings, input elements, etc.), CSS to define the styles and layout of the elements, and JavaScript to define their behavior. These three technologies (HTML, CSS, and JavaScript) comprise the Document Object Model, or DOM of a web application. The objects are the various HTML elements and CSS styles. JavaScript is the programming language used to manipulate the DOM and to communicate with other devices.

You can build a user interface using HTML, CSS and JavaScript and communications protocols to communicate changes betwen that interface and the devices it's designed to control.

There are thousands of tutorials to introduce web development, so there's no need to repeat that here. The [Mozilla Developer Network](https://developer.mozilla.org/) site is a good reference. Covered below is enough information to send and receive data from devices to a web page. 

A minimal browser-based interface for a connected device might include a few input elements to change the device's properties, and a few text fields to display those properties. For example, imagine a connected air purifier. It would need controls to turn the device on and off, to set the fan speed, and perhaps set a schedule for when it should turn and off next, and a few text fields to report the state of the purifier and perhaps the last time the filter was changed. If the purifier includes an air quality sensor, perhaps it will report the sensor's readings as well. The interface might look something like [this page](purifier.html). 

By using JavaScript to manipulate the elements of the page, you can make the various text elements, like the spans, responsive to the values of the inputs, like the button or the slider. You can send those values to a web server using the JavaScript `fetch()` command, or you can use other communications protocols to send the values to connected devices. 

### HTML Input Elements

There are many input elements defined in the HTML5 specification, and you can use them to gather all sorts of structured data. You can both get and set the value of an input element in JavaScript.

Here's a [page with all of the input elements](input-types/index.html). Changing any of them will put its value in a `<span>` next to the input.

In addition to these, there are a few other forms of input that do not use the `<input>` tag, like` <textarea>`, `<select>` and `<option>`. 

Inputs are often enclosed in forms, which allow you to access all of the elements of a form in one collection. When you do this, it's good practice to give each element a name attribute, as the element names will be sent in name/va;ue pairs as part of the request when you submit the form. 

[Form elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) have many attributes, but the most important are the action, which is the server URL that will process the form information when you submit it. the method, which determines how the HTTP request is sent (GET, POST, etc), and the target, which determines which window or tab the results of the form request will be displayed in. 

You can use a form without giving it an action if you simply want a structure for collecting all the input elements' values. In the input-types example in this repository, the form is used as a convenient way to iterate over all the inputs to clear them in the `clearValues()` [function in the JavaScript](input-types/script/js). 

For more on input elements, see the [MDN Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) page. 

### DOM Manipulation in JavaScript

Every JS library has its own shortcuts for manipulating DOM elements in JavaScript, but it's not that hard to do without a library, and it's good to know. DOM elements are elements of the HTML `document`, of course, and there are various JS functions for getting them:

* `document.getElementsByTagName('input')` returns all the elements of a given tag, such as `input`
* `document.getElementById('powerInput')` returns the element with the id `powerInput`
* `document.getElementsByClassName('controls')` returns all the elements with the class name `controls`
* `document.getElementsByName('sensor')` returns all the elements with the name `sensor`

Once you've got an element, you can get or set any of its properties.

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

Then in the JavaScript, you get the element and add the listener function:

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

* define your listener functions
* add a listener function for the page load event

There's not typically a main loop, as you might be used to for C or Java; all the action happens on user-generated events. You can make some timed functions using `setInterval()` or `setTimeout()`, but these are typically less common. Here's a [plain Javascript template](template/script.js). It goes with this [HTML page](template/index.html). This [style sheet](template/styles.css) is used to set the positions of the elements. 

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