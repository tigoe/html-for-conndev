// server.js
const express = require("express");
const server = express();
const bodyParser = require("body-parser");

// JSON data to serve as a response, and to modify when
// you get a POST request:
var myData = {
  date: new Date(),
  temperature: 17
};
// serve all the static files in the public folder:
server.use(express.static("public"));
// use the body parser middleware:
server.use(bodyParser.json());

// handler for GET /json request:
function getJson(request, response) {
  response.json(myData);
}

// handler for GET /text request:
function getText(request, response) {
  let textString = "The time is " +
      new Date().toLocaleString() +
      " and the temperature is " +
      myData.temperature;
  response.send(textString);
}

// handler for POST /data request:
function postData(request, response) {
  console.log("got a post request");
  console.log(request.body);
// if there is a temperature value in the body of the request:
  if (request.body.temperature) {
    // update the temperature value in myData:
    myData.temperature = request.body.temperature;
  }
  // if there is a date value in the body of the request:
  if (request.body.date) {
    // update the date value in myData:
    myData.date = request.body.date;
  }
  // respond with updated myValue:
  response.json(myData);
}
// server routes:
server.get("/json", getJson);
server.get("/text", getText);
server.post("/data", postData);

// listen for requests:
const listener = server.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
