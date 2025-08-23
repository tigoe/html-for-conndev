/*
  Template for using chart.js.

  This page shows a line chart in chart.js, generated from two
  arrays, one for the X axis and the other for the Y axis. The data
  updates every time loop() is called, adding a new point at the end,
  and deleting the oldest point. 

  This demonstrates a line chart, but the basic framework could work 
  for other types of chart by changing the context and config variables. 

  This could be combined with many different data gathering 
  examples, APIs, etc.

  created 23 Aug 2025
  by Tom Igoe
*/

// arrays for the X and Y axes of the chart:
let xAxis = new Array();
let yAxis = new Array();

// variable for the chart data. There is only one dataset:
const chartData = {
  labels: xAxis,
  datasets: [
    {
      label: 'Data',
      data: yAxis,
      borderColor: '#ff0000',
      backgroundColor: '#990000',
    }
  ]
};

// chart config:
const config = {
  type: 'line',
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Some Information'
      }
    }
  },
};
// make a canvas and get the context:
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function setup() {
  // instantiate the chart:
  chart = new Chart(
    context,   // context for the chart
    config // config from the global variables
  );
}

function loop() {
  // process the current data:
  processData();
  // update the chart once the data's processed:
  chart.update();
}


function processData() {
  // make up a data point. In an actual application, you might be 
  // getting JSON from an external source, perhaps through Fetch or MQTT:

  let dataPoint = {
    timeStamp: new Date().toLocaleString(), // timestamp
    reading: Math.random() * 10    // random number between 1 and 10
  }
  // add the data to the arrays:
  xAxis.push(dataPoint.timeStamp);
  yAxis.push(dataPoint.reading);

  // if the arrays are longer than 10 elements,
  // delete the oldest reading:
  if (xAxis.length > 10) {
    xAxis.shift();
    yAxis.shift();
  }
}


// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);
// run the loop function every three seconds:
setInterval(loop, 3000);