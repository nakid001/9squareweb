#include <Arduino.h>
#include "password.h"
#include <WiFi.h>

const char* ssid = "songpon";
const char* password =  mypassword;
#define LED_BUILTIN 13

void printWifiData() {
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  Serial.print(mac[5], HEX);
  Serial.print(":");
  Serial.print(mac[4], HEX);
  Serial.print(":");
  Serial.print(mac[3], HEX);
  Serial.print(":");
  Serial.print(mac[2], HEX);
  Serial.print(":");
  Serial.print(mac[1], HEX);
  Serial.print(":");
  Serial.println(mac[0], HEX);

  // print your subnet mask:
  IPAddress subnet = WiFi.subnetMask();
  Serial.print("NetMask: ");
  Serial.println(subnet);

  // print your gateway address:
  IPAddress gateway = WiFi.gatewayIP();
  Serial.print("Gateway: ");
  Serial.println(gateway);
  Serial.println("Parut can CONNECTED :D");
  
}
void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("nooooooooooooooooooooooooooooo");
  }
  printWifiData();
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
 // turn the LED on (HIGH is the voltage level)
 digitalWrite(LED_BUILTIN, HIGH);
 // wait for a second
 delay(1000);
 // turn the LED off by making the voltage LOW
 digitalWrite(LED_BUILTIN, LOW);  // wait for a second
 delay(100);
}