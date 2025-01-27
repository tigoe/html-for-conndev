/*
  WiFi TCP Client
  TCP Socket client for WiFiNINA and WiFi101 libraries.
  Connects to the TCP socket server, reads a sensor once
  every five seconds, and sends a message with the reading.

  You'll need to include an arduino_secrets.h file with the following info:
  #define SECRET_SSID "ssid"      // your network name
  #define SECRET_PASS "password"  // your network password

  Here's a test with netcat: 
  char serverAddress[] = "x.x.x.x";  // replace with your computer's IP
  then on your computer, run  netcat:
  $ nc -klw 2 8080 | tee log.json
  This will send the output to the command line and to a file called log.json

  created 30 Dec 2022
  updated 7 Jan 2025
  by Tom Igoe
 */

// #include <WiFi101.h>   // use this for MKR1000 board
#include <WiFiNINA.h>  // use this for Nano 33 IoT or MKR1010 boards
// #include <WiFi.h>      // use this for Nano ESP32 board
#include "arduino_secrets.h"

// Initialize the Wifi client library
WiFiClient client;

// replace with your host computer's IP address
const char server[] = "0.0.0.0";
const int portNum = 8080;
// change this to a unique name for the device:
String deviceName = "second";
// message sending interval, in ms:
int interval = 5000;
// last time a message was sent, in ms:
long lastSend = 0;

void setup() {
  //Initialize serial
  Serial.begin(9600);
  // if serial monitor's not open, wait 3 seconds:
  if (!Serial) delay(3000);
 
  // Connect to WPA/WPA2 network.
  WiFi.begin(SECRET_SSID, SECRET_PASS);

  // attempt to connect to Wifi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(SECRET_SSID);
    // wait a second for connection:
    delay(1000);
  }
  Serial.print("Connected to to SSID: ");
  Serial.println(SECRET_SSID);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  Serial.print("Signal Strength (dBm): ");
  Serial.println(WiFi.RSSI());
}

void loop() {
  // if the client's not connected, connect:
  if (!client.connected()) {
    Serial.println("connecting");
    Serial.println(server);
    Serial.println(portNum);
    client.connect(server, portNum);
    // skip the rest of the loop:
    return;
  }

  // once every interval, get a reading and send it:
  if (millis() - lastSend > interval) {
    // read sensor:
    int sensor = analogRead(A0);
    // format the message as JSON string:
    String message = "{\"device\": \"DEVICE\", \"sensor\": READING}";
    // replace READING with the reading:
    message.replace("READING", String(sensor));
    // and DEVICE with your device's name:
    message.replace("DEVICE", deviceName);
    // send the message:
    client.println(message);
    // update the timestamp:
    lastSend = millis();
  }

  // check if there is incoming data available to be received
  int messageSize = client.available();
  // if there's a string with length > 0:
  if (messageSize > 0) {
    Serial.println("Received a message:");
    Serial.println(client.readString());
  }
}
