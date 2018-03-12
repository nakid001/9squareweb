#include <Arduino.h>
#include <driver/adc.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
const char* ssid = "GrowthChamberAIS";
const char* password = "37632981";
int LastState1L = 0;
int LastState1R = 0;
int LastState2L = 0;
int LastState2R = 0;
int LastState3L = 0;
int LastState3R = 0;
int LastState4L = 0;
int LastState4R = 0;
int LastState5L = 0;
int LastState5R = 0;
int LastState6L = 0;
int LastState6R = 0;
int LastState7L = 0;
int LastState7R = 0;
int LastState8L = 0;
int LastState8R = 0;
int LastState9L = 0;
int LastState9R = 0;

// Config MQTT Server
#define mqtt_server "192.338.0.100"
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
  pinMode(36, INPUT);
  pinMode(39, INPUT);  
  pinMode(34, INPUT);
  pinMode(35, INPUT);  
  pinMode(32, INPUT);
  pinMode(33, INPUT); 

  pinMode(25, INPUT);
  pinMode(26, INPUT);
  pinMode(27, INPUT);
  pinMode(14, INPUT);
  pinMode(12, INPUT);
  pinMode(19, INPUT);

  pinMode(18, INPUT);
  pinMode(5, INPUT);
  pinMode(17, INPUT);
  pinMode(16, INPUT);
  pinMode(4, INPUT);
  pinMode(2, INPUT);
                                                                                                                                 
  Serial.begin(9600);
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  // while (WiFi.status() != WL_CONNECTED) {
  //   delay(500);
  //   Serial.print(".");
  // }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  // if (!client.connected()) {
  //   Serial.print("Attempting MQTT connection...");
  //   if (client.connect("ESP8346Client")) {
  //     Serial.println("connected");
  //     client.subscribe("/ESP/LED");
  //   } else {
  //     Serial.print("failed, rc=");
  //     Serial.print(client.state());
  //     Serial.println(" try again in 5 seconds");
  //     delay(5000);
  //     return;
  //   }
  // }
    int buttonState1L = digitalRead(36);
    int buttonState1R = digitalRead(39);
    int buttonState2L = digitalRead(34);
    int buttonState2R = digitalRead(35);
    int buttonState3L = digitalRead(32);
    int buttonState3R = digitalRead(33);

    int buttonState4L = digitalRead(25);
    int buttonState4R = digitalRead(26);
    int buttonState5L = digitalRead(27);
    int buttonState5R = digitalRead(14);
    int buttonState6L = digitalRead(12);
    int buttonState6R = digitalRead(19);

    int buttonState7L = digitalRead(18);
    int buttonState7R = digitalRead(5);
    int buttonState8L = digitalRead(17);
    int buttonState8R = digitalRead(16);
    int buttonState9L = digitalRead(4);
    int buttonState9R = digitalRead(2);
    
    if (buttonState1L != LastState1L || buttonState1R != LastState1R){
      if (buttonState1L == HIGH && buttonState1R == HIGH) {
        // turn LED on:
        Serial.println("1HIGH");
      } else if ((buttonState1L == LOW || buttonState1R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "1");
        Serial.println("1LOW");
      }
      LastState1L = buttonState1L;
      LastState1R = buttonState1R;
    }
    if (buttonState2L != LastState2L || buttonState2R != LastState2R) {
      if (buttonState2L == HIGH && buttonState2R == HIGH) {
        // turn LED on:
        Serial.println("2HIGH");
      } else if ((buttonState2L == LOW || buttonState2R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "2");
        Serial.println("2LOW");
      }
      LastState2L = buttonState2L;
      LastState2R = buttonState2R;
    }
    if (buttonState3L != LastState3L || buttonState3R != LastState3R){
      if (buttonState3L == HIGH && buttonState3R == HIGH) {
        // turn LED on:
        Serial.println("3HIGH");
      } else if ((buttonState3L == LOW || buttonState3R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "3");
        Serial.println("3LOW");
      }
      LastState3L = buttonState3L;
      LastState3R = buttonState3R;
    }
    if (buttonState4L != LastState4L || buttonState4R != LastState4R){
      if (buttonState4L == HIGH && buttonState4R == HIGH) {
        // turn LED on:
        Serial.println("4HIGH");
      } else if ((buttonState4L == LOW || buttonState4R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "4");
        Serial.println("4LOW");
      }
      LastState4L = buttonState4L;
      LastState4R = buttonState4R;
    }
    if (buttonState5L != LastState5L || buttonState5R != LastState5R){
      if (buttonState5L == HIGH && buttonState5R == HIGH) {
        // turn LED on:
        Serial.println("5HIGH");
      } else if ((buttonState5L == LOW || buttonState5R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "5");
        Serial.println("5LOW");
      }
      LastState5L = buttonState5L;
      LastState5R = buttonState5R;
    }
    if (buttonState6L != LastState6L || buttonState6R != LastState6R){
      if (buttonState6L == HIGH && buttonState6R == HIGH) {
        // turn LED on:
        Serial.println("6HIGH");
      } else if ((buttonState6L == LOW || buttonState6R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "6");
        Serial.println("6LOW");
      }
      LastState6L = buttonState6L;
      LastState6R = buttonState6R;
    }
    if (buttonState7L != LastState7L || buttonState7R != LastState7R){
      if (buttonState7L == HIGH && buttonState7R == HIGH) {
        // turn LED on:
        Serial.println("7HIGH");
      } else if ((buttonState7L == LOW || buttonState7R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "7");
        Serial.println("7LOW");
      }
      LastState7L = buttonState7L;
      LastState7R = buttonState7R;
    }
    if (buttonState8L != LastState8L || buttonState8R != LastState8R){
      if (buttonState8L == HIGH && buttonState8R == HIGH) {
        // turn LED on:
        Serial.println("8HIGH");
      } else if ((buttonState8L == LOW || buttonState8R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "8");
        Serial.println("8LOW");
      }
      LastState8L = buttonState8L;
      LastState8R = buttonState8R;
    }
    if (buttonState9L != LastState9L || buttonState9R != LastState9R){
      if (buttonState9L == HIGH && buttonState9R == HIGH) {
        // turn LED on:
        Serial.println("9HIGH");
      } else if ((buttonState9L == LOW || buttonState9R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "9");
        Serial.println("9LOW");
      }
      LastState9L = buttonState9L;
      LastState9R = buttonState9R;
    }
    delay(200);
  client.loop();
}
