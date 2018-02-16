#include <Arduino.h>
#include <driver/adc.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
const char* ssid = "GrowthChamberAIS";
const char* password = "37617981";

// Config MQTT Server
#define mqtt_server "192.168.0.100"
#define mqtt_port 1883
#define mqtt_user "admin"
#define mqtt_password "password"
#define TOPIC1 "/dev/1"
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
  Serial.println(msg);
}
void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(33, INPUT);
  pinMode(25, INPUT);  
  pinMode(26, INPUT);
  pinMode(27, INPUT);  
  pinMode(17, INPUT);
  pinMode(16, INPUT);  
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
  
  client.setServer(mqtt_server, 1883);
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
    int buttonState1L = digitalRead(33);
    int buttonState1R = digitalRead(25);
    int buttonState2L = digitalRead(26);
    int buttonState2R = digitalRead(27);
    int buttonState3L = digitalRead(17);
    int buttonState3R = digitalRead(16);

    // check if the pushbutton is pressed.
    // if it is, the buttonState is HIGH:
    if (buttonState1L == HIGH && buttonState1R == HIGH) {
      // turn LED on:
      Serial.println("1HIGH");
    } else if ((buttonState1L == LOW || buttonState1R == LOW)){
      // turn LED off:
      client.publish(TOPIC1, "1");
      Serial.println("1LOW");
      digitalWrite(LED_PIN, LOW); 

    }
    if (buttonState2L == HIGH && buttonState2R == HIGH) {
      // turn LED on:
      Serial.println("2HIGH");
    } else if ((buttonState2L == LOW || buttonState2R == LOW)){
      // turn LED off:
      client.publish(TOPIC1, "2");
      Serial.println("2LOW");
      digitalWrite(LED_PIN, LOW); 

    }
    if (buttonState3L == HIGH && buttonState3R == HIGH) {
      // turn LED on:
      Serial.println("3HIGH");
    } else if ((buttonState3L == LOW || buttonState3R == LOW)){
      // turn LED off:
      client.publish(TOPIC1, "3");
      Serial.println("3LOW");
      digitalWrite(LED_PIN, LOW); 

    }
    delay(200);
  client.loop();
}
