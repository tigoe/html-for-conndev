/*
Audio In Analyzer  
Takes audio in from the microphone and does a 
fast fourier transform on it. 

For getting media input see: 
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
For the Web Audio API see: 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

created 3 Jun 2024
by Tom Igoe
*/

let audioCtx;     // web audio API instance
let analyzer;     // audio analyzer instance
let bufferLength; // audio sample buffer

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#081640');

  console.log(navigator.mediaDevices.enumerateDevices());
  // call async function to access mic input:
  navigator.mediaDevices
    // only get the audio, don't need video:
    .getUserMedia({ audio: true })
    // when you get it, make a stream:
    .then((stream) => {
      // create an analyzer for the stream:
      createAnalyzer(stream);
    })
    // report any errors:
    .catch((err) => {
      console.log(err);
    });
}

function draw() {
  // if the analyzer's initialized,
  if (analyzer) {
    // graph it:
    graphTimeData();
  }
}
// this function gets access to the mic 
// (that's what you pass in through the constraints):
async function getUserMedia(constraints) {
  // clear the stream:
  let stream = null;
  try {
    // try to access the stream:
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    // if you fail, report the error:
    console.log(err);
  }
}

// this function creates an audio analyzer
// to determine the dominant frequency of the 
// audio stream, using a fast Fourier transform:
function createAnalyzer(stream) {
  // create the audio context (this has to come after
  // the user gives permission to access the mic):
  audioCtx = new AudioContext();
  // create the audio analyzer:
  analyzer = audioCtx.createAnalyser();
  // set the bin size for the FFT, and make a buffer
  // to match that size:
  analyzer.fftSize = 2048;
  bufferLength = analyzer.frequencyBinCount;
  // make a source, and connect it to the analyzer:
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
}


function graphFrequencyData() {
  // create an array for the data:
  let dataArray = new Uint8Array(bufferLength);
  // get the data in the time domain:
  analyzer.getByteTimeDomainData(dataArray);

  // set up x position, previous x and y positions:
  let x = 0;
  // let lastX, lastY = 0;
  // set up width of each sample, based on screen width:
  let sliceWidth = width / bufferLength;

  // set the background color and line color:
  background('#081640');
  stroke('#A8D9A7');
  // loop over the samples in the data and graph them:
  for (let i = 0; i < bufferLength; i++) {
    // the samples are a single byte each. So the max.
    // value for them is 255. Half that is 128, the max.
    // height that we'll draw each sample as:
    let v = dataArray[i] / 128.0;
    // now map that to the height of the canvas:
    let y = v * (height / 2);

    // with the first data point, draw a dot:
    if (i === 0) {
      circle(x, y, 1);
    } else {
      line(lastX, lastY, x, y);
    }
    // save the points for the next iteration:
    lastX = x;
    lastY = y;
    // advance the x position:
    x += sliceWidth;
  }
}

function graphTimeData() {
  // create an array for the data:
  let dataArray = new Uint8Array(bufferLength);
  // get the data in the time domain:
  analyzer.getByteTimeDomainData(dataArray);

  // set up x position, previous x and y positions:
  let x = 0;
  // let lastX, lastY = 0;
  // set up width of each sample, based on screen width:
  let sliceWidth = width / bufferLength;

  // set the background color and line color:
  background('#081640');
  stroke('#A8D9A7');
  // loop over the samples in the data and graph them:
  for (let i = 0; i < bufferLength; i++) {
    // the samples are a single byte each. So the max.
    // value for them is 255. Half that is 128, the max.
    // height that we'll draw each sample as:
    let v = dataArray[i] / 128.0;
    // now map that to the height of the canvas:
    let y = v * (height / 2);

    // with the first data point, draw a dot:
    if (i === 0) {
      circle(x, y, 1);
    } else {
      line(lastX, lastY, x, y);
    }
    // save the points for the next iteration:
    lastX = x;
    lastY = y;
    // advance the x position:
    x += sliceWidth;
  }
}