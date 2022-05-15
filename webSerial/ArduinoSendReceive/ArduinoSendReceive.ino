long lastSecond = 0;

void setup() {
  Serial.begin(9600);
  // set a parsing timeout of 10ms
  // (used by Serial.readString, parseInt, etc):
  Serial.setTimeout(10);
  // wait 3 secs if no remote serial connection is open:
  if (!Serial) delay(3000);
  Serial.println("Hello");
}

void loop() {
  // echo back whatever you receive:
  if (Serial.available()) {
    String incoming = Serial.readString();
    Serial.println(incoming);
  }

// send the seconds as a JSON string
// every 10 seconds:
  if (millis() - lastSecond > 10000) {
    Serial.print("{\"secs\": ");
    Serial.print(millis() / 1000);
    Serial.println("}");
    lastSecond = millis();
  }
}
