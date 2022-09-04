/*
  Write to one characteristic

  This example creates a BLE peripheral with service that contains a
  characteristic to read an analog input.

  The circuit:
  - Arduino MKR WiFi 1010 or Arduino Uno WiFi Rev2 board, or Nano 33 IoT
  - Analog sensor connected to pin A0

*/

#include <ArduinoBLE.h>

const int ledPin = LED_BUILTIN; // set ledPin to on-board LED

// create service:
BLEService sensorService("19B10010-E8F2-537E-4F6C-D104768A1214");
// create sensor characteristic and allow remote device to get notifications:
BLEIntCharacteristic sensorCharacteristic("19B10012-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify);

int sensorValue = 0;
int sensorPin = A0;    // select the input pin for the potentiometer

void setup() {
  Serial.begin(9600);
  while (!Serial);

  pinMode(ledPin, OUTPUT); // use the LED as an output

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (true);
  }

  // set the local name peripheral advertises
  BLE.setLocalName("SensorPeripheral");
  // set the UUID for the service this peripheral advertises:
  BLE.setAdvertisedService(sensorService);

  // add the characteristic to the service
  sensorService.addCharacteristic(sensorCharacteristic);

  // add the service
  BLE.addService(sensorService);
  sensorCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();
  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  // poll for BLE events
  BLE.poll();

  if (millis() % 1000 < 2) {
    // read the value from the sensor:
    sensorValue = analogRead(sensorPin);
    Serial.println(sensorValue / 4);
    sensorCharacteristic.writeValue(sensorValue / 4);
  }
}
