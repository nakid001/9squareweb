#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
const char* ssid = "Songpon";
const char* password = "0818059521";

// Config MQTT Server
#define mqtt_server "192.168.1.40"
#define mqtt_port 1883
#define mqtt_user "admin"
#define mqtt_password "password"

#define LED_PIN 2

WiFiClient espClient;
PubSubClient client(espClient);
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String msg = "";
  int i=0;
  while (i<length) msg += (char)payload[i++];
  if (msg == "GET") {
    client.publish("/ESP/LED", (digitalRead(LED_PIN) ? "LEDON" : "LEDOFF"));
    Serial.println("Send !");
    return;
  }
  digitalWrite(LED_PIN, (msg == "LEDON" ? HIGH : LOW));
  Serial.println(msg);
}
void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(16, INPUT);
  pinMode(5, INPUT);  
  Serial.begin(9600);
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  client.setServer("192.168.1.41", 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      client.subscribe("/ESP/LED");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
      return;
    }
  }
    int buttonState1 = digitalRead(16);
    int buttonState2 = digitalRead(5);

    // check if the pushbutton is pressed.
    // if it is, the buttonState is HIGH:
    if (buttonState1 == HIGH) {
      // turn LED on:
      Serial.println("1HIGH");
    } else {
      // turn LED off:
      Serial.println("1LOW");
      digitalWrite(LED_PIN, LOW); 

    }
    if (buttonState2 == HIGH) {
      // turn LED on:
      Serial.println("2HIGH");
    } else {
      // turn LED off:
      Serial.println("2LOW");
      digitalWrite(LED_PIN, LOW); 

    }
    delay(100);
  client.loop();
}

