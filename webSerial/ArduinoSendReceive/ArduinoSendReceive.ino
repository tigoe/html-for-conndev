long lastSecond = 0;

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(10);
}

void loop() {
  if (Serial.available()) {
    String incoming = Serial.readString();
    Serial.println(incoming);
  }

  if (millis() - lastSecond > 1000) {
    Serial.print("Seconds: ");
    Serial.println(millis() / 1000);
    lastSecond = millis();
  }
}
