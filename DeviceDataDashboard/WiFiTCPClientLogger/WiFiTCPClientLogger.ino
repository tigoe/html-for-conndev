/*
  WiFi TCP Client
  TCP Socket client for ArduinoHttpClient library
  Connects to the TCP socket server, reads a sensor once
  every five seconds, and sends a message with the reading.
  Uses the following libraries:
  http://librarymanager/All#WiFiNINA.h  for Nano 33 IoT, MKR1010
  or
  http://librarymanager/All#WiFi101.h  for MKR1000

  Here's a test with netcat: 
  char serverAddress[] = "x.x.x.x";  // replace with your computer's IP
  then on your computer, run  netcat:
  $ nc -l 8080 tee log.json
  This will send the output to the command line and to a file called log.txt

  created 30 Dec 2022
  by Tom Igoe
 */

// #include <WiFi101.h>      // use this for MKR1000 board
#include <WiFiNINA.h>  // use this for Nano 33 IoT or MKR1010 boards
#include "arduino_secrets.h"

// Initialize the Wifi client library
WiFiClient client;

const char server[] = "192.168.1.165";
// message sending interval, in ms:
int interval = 5000;
// last time a message was sent, in ms:
long lastSend = 0;

void setup() {
  //Initialize serial
  Serial.begin(9600);
  // if serial monitor's not open, wait 3 seconds:
  if (!Serial) delay(3000);

  // attempt to connect to Wifi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(SECRET_SSID);
    // Connect to WPA/WPA2 network.
    WiFi.begin(SECRET_SSID, SECRET_PASS);

    // wait 3 seconds for connection:
    delay(3000);
  }
}

void loop() {
  // if the client's not connected, connect:
  if (!client.connected()) {
    Serial.println("connecting");
    client.connect(server, 8080);
    return;
  }
  // once every interval, get a reading and send it:
  if (millis() - lastSend > interval) {
    // read sensor:
    int sensor = analogRead(A0);
    // format the message as JSON string:
    String message = "{\"sensor\": READING}";
    // replace READING with the reading:
    message.replace("READING", String(sensor));
    // send the message:
    client.println(message);
    // update the timestamp:
    lastSend = millis();
  }

  // check there is incoming data available to be received
  int messageSize = client.available();
  // if there's a string with length > 0:
  if (messageSize > 0) {
    Serial.println("Received a message:");
    Serial.println(client.readString());
  }
}
