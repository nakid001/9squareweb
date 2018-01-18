#include <Arduino.h>
#include <driver/adc.h>
#include <WiFi.h>
#include <PubSubClient.h>
// #include "password.h"

// #include "DHT.h"

/* change it with your ssid-password */
#define LED_BUILTIN 13

const char* ssid = "KUWIN";
const char* password = "";
/* this is the IP of PC/raspberry where you installed MQTT Server 
on Wins use "ipconfig" 
on Linux use "ifconfig" to get its IP address */
const char* mqtt_server = "158.108.36.181";

/* define DHT pins */
// #define DHTPIN 14
// #define DHTTYPE DHT22
// DHT dht(DHTPIN, DHTTYPE);
float Force = 0;

/* create an instance of PubSubClient client */
WiFiClient espClient;
PubSubClient client(espClient);

/*LED GPIO pin*/
const char led = 12;

/* topics */
#define TOPIC1    "/room1/device"
#define LED_TOPIC     "/room1/" /* 1=on, 0=off */

long lastMsg = 0;
char msg[20];

void receivedCallback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received: ");
  Serial.println(topic);

  Serial.print("payload: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  /* we got '1' -> on */
  if ((char)payload[0] == '1') {
    digitalWrite(led, HIGH); 
  } else {
    /* we got '0' -> on */
    digitalWrite(led, LOW);
  }

}

void mqttconnect() {
  /* Loop until reconnected */
  while (!client.connected()) {
    Serial.print("MQTT connecting ...");
    /* client ID */
    String clientId = "ESP32Client";
    /* connect now */
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      /* subscribe topic with default QoS 0*/
      client.subscribe(LED_TOPIC);
    } else {
      Serial.print("failed, status code =");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      /* Wait 5 seconds before retrying */
      // delay(5000);
      digitalWrite(led, LOW); 
      
    }
  }
}

void setup () {
  Serial.begin(9600);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(33, INPUT);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
   
  pinMode(led, OUTPUT);

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  /* configure the MQTT server with IPaddress and port */
  client.setServer(mqtt_server, 1883);
  /* this receivedCallback function will be invoked 
  when client received subscribed topic */
  client.setCallback(receivedCallback);
  String clientMac = "";

   Serial.println(WiFi.macAddress());


  /*start DHT sensor */
  // adc1_config_width(ADC_WIDTH_12Bit);
  // adc1_config_channel_atten(33, ADC_ATTEN_0db);
}

void loop () {
  /* if client was disconnected then try to reconnect again */
  // if (!client.connected()) {
  //   mqttconnect();
  // }
  /* this function will listen for incomming 
  subscribed topic-process-invoke receivedCallback */
  client.loop();
  /* we measure Force every 3 secs
  we count until 3 secs reached to avoid blocking program if using delay()*/
  long now = millis();
  // int value = adc1_get_voltage(33);
  // Serial.print("Force = ");
  // Serial.println(value);
  // String(value).toCharArray(msg, String(value).length()+1);  
  // client.publish(TOPIC1, msg);
  int buttonState = digitalRead(33);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    Serial.print("HIGH");
  } else {
    // turn LED off:
    Serial.print("LOW");
  }

  // if (now - lastMsg > 3000) {
  //   lastMsg = now;
  //   /* read DHT11/DHT22 sensor and convert to string */
  //   // Force = dht.readForce();
  //   if (!isnan(Force)) {
  //   }
  //   // client.publish(TOPIC1,"PARUT IS CONNECTED");    
  // }

  delay(250);
}