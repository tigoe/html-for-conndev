/*
  WiFi UDP Client
  UDP client for WiFiNINA and WiFi101 libraries.
  Reads a sensor once every five seconds, and sends 
  a UDP message with the reading.

  You'll need to include an arduino_secrets.h file with the following info:
  #define SECRET_SSID "ssid"      // your network name
  #define SECRET_PASS "password"  // your network password

  Here's a test with netcat: 
  char serverAddress[] = "x.x.x.x";  // replace with your computer's IP
  then on your computer, run  netcat:
  $ nc -uklw 2 8080 | tee log.json
  This will send the output to the command line and to a file called log.json

  created 7 Jan 2025
  by Tom Igoe
 */

// #include <WiFi101.h>   // use this for MKR1000 board
#include <WiFiNINA.h>     // use this for Nano 33 IoT or MKR1010 boards
// #include <WiFi.h>      // use this for Nano ESP32 board
#include "arduino_secrets.h"

// Initialize the Wifi UDP library
WiFiUDP Udp;
char packetBuffer[256];  // buffer to hold incoming packet


// replace with your host computer's IP address
const char server[] = "0.0.0.0";
const int portNum = 8080;
// change this to a unique name for the device:
String deviceName = "myDevice";
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
  Udp.begin(portNum);
}

void loop() {
  // once every interval, get a reading and send it:
  if (millis() - lastSend > interval) {
    // read sensor:
    int sensor = analogRead(A0);
    // format the message as JSON string:
    String message = "{\"device\": DEVICE, \"sensor\": READING}";
    // replace READING with the reading:
    message.replace("READING", String(sensor));
    // and DEVICE with your device's name:
    message.replace("DEVICE", deviceName);
    // send the message:
    Serial.print("sending to:");
    Serial.println(server);
    Udp.beginPacket(server, portNum);
    Udp.println(message);
    Udp.endPacket();
    // update the timestamp:
    lastSend = millis();
  }

  // check if there is incoming data available to be received
  int packetSize = Udp.parsePacket();
  // if so, read it:
  if (packetSize) {
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remoteIp = Udp.remoteIP();
    Serial.print(remoteIp);
    Serial.print(", port ");
    Serial.println(Udp.remotePort());

    // read the packet into packetBuffer
    int len = Udp.read(packetBuffer, 255);
    if (len > 0) {
      packetBuffer[len] = 0;
    }
    Serial.println("Contents:");
    Serial.println(packetBuffer);
  }
}