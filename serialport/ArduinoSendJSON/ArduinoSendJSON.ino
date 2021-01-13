#include <Arduino_JSON.h>

// set the input pins:
const int buttonPin = 2;

// variables to hold previous button and knob states:
int lastButtonState = HIGH;
int lastKnobState = 0;
// threshold of change for the knob (range 0-100):
int threshold = 3;

// if the inputs have changed:
bool inputsChanged = false;
// a JSON object to hold the data to send:
JSONVar outgoing;

void setup() {
  // initialize serial and set input pin modes:
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);

  // initialize values in JSON object:
  outgoing["knob"] = 0;
  outgoing["button"] = 0;
}

void loop() {
  // read inputs, map if needed:
  int knobState = analogRead(A0);
  knobState = map(knobState, 0, 1023, 0, 100);
  int buttonState = digitalRead(buttonPin);

  // if knob has changed:
  if (abs(knobState - lastKnobState) > threshold) {
    outgoing["knob"] = knobState;
    // save knob state for comparison next time:
    lastKnobState = knobState;
    // set change flag so serial will send:
    inputsChanged = true;
  }

  if (buttonState != lastButtonState) {
    outgoing["button"] = buttonState;
    // save button state for comparison next time:

    lastButtonState = buttonState;
    // set change flag so serial will send:
    inputsChanged = true;
  }

  // if either sensor has changed, send it:
  if (inputsChanged) {
    Serial.println(outgoing);
    // clear the change flag:
    inputsChanged = false;
  }
}
