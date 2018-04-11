#include <Arduino.h>
#include <driver/adc.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Thread.h>
#include <ThreadController.h>
#include <pthread.h>
#include <CircularBuffer.h>

// Update these with values suitable for your network.
// const char* ssid = "GrowthChamberAIS";
// const char* password = "0123456789012";
const char* ssid = "MTN-MobileWiFi-E5573";
const char* password = "ET4F92MN";

CircularBuffer<int> myBuffer(64);


ThreadController controll = ThreadController();
ThreadController controll2 = ThreadController();

//My Thread
Thread Thread1 = Thread();
//His Thread
Thread Thread2 = Thread();

ThreadController groupOfThreads = ThreadController();

portMUX_TYPE mux = portMUX_INITIALIZER_UNLOCKED;

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
int count = 0;

int buttonState1L = 0;
int buttonState1R = 0;
int buttonState2L = 0;
int buttonState2R = 0;
int buttonState3L = 0;
int buttonState3R = 0;
    
int buttonState4L = 0;
int buttonState4R = 0;
int buttonState5L = 0;
int buttonState5R = 0;
int buttonState6L = 0;
int buttonState6R = 0;
    
int buttonState7L = 0;
int buttonState7R = 0;
int buttonState8L = 0;
int buttonState8R = 0;
int buttonState9L = 0;
int buttonState9R = 0;
////////////////////////////////////
uint8_t myPin_mask1L = 0;
volatile uint32_t *myPin_port1L =0;
uint8_t myPin_mask1R = 0;
volatile uint32_t *myPin_port1R =0;
uint8_t myPin_mask2L = 0;
volatile uint32_t *myPin_port2L =0;
uint8_t myPin_mask2R = 0;
volatile uint32_t *myPin_port2R =0;
uint8_t myPin_mask3L = 0;
volatile uint32_t *myPin_port3L =0;
uint8_t myPin_mask3R = 0;
volatile uint32_t *myPin_port3R =0;
// uint8_t myPin_mask4 = 0;
// volatile uint32_t *myPin_port4 =0;
// uint8_t myPin_mask5 = 0;
// volatile uint32_t *myPin_port5 =0;
// uint8_t myPin_mask6 = 0;
// volatile uint32_t *myPin_port6 =0;
// uint8_t myPin_mask7 = 0;
// volatile uint32_t *myPin_port7 =0;
// uint8_t myPin_mask8 = 0;
// volatile uint32_t *myPin_port8 =0;
// uint8_t myPin_mask9 = 0;
// volatile uint32_t *myPin_port9 =0;


// Config MQTT Server
#define mqtt_server "192.168.8.100"
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

  void sendPress(){

    if (buttonState1L != LastState1L || buttonState1R != LastState1R) {
      if (buttonState1L == HIGH && buttonState1R == HIGH) {
        // turn LED on:
        Serial.println("1HIGH");
      } else if ((buttonState1L == LOW || buttonState1R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "1");
        Serial.println("1LOW");
        count += 1;
        Serial.println(count);
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
        count += 1;
        Serial.println(count);
      }
      LastState2L = buttonState2L;
      LastState2R = buttonState2R;
    }
    if (buttonState3L != LastState3L || buttonState3R != LastState3R) {
      if (buttonState3L == HIGH && buttonState3R == HIGH) {
        // turn LED on:
        Serial.println("3HIGH");
      } else if ((buttonState3L == LOW || buttonState3R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "3");
        Serial.println("3LOW");
        count += 1;
        Serial.println(count);
      }
      LastState3L = buttonState3L;
      LastState3R = buttonState3R;
    }
    if (buttonState4L != LastState4L || buttonState4R != LastState4R) {
      if (buttonState4L == HIGH && buttonState4R == HIGH) {
        // turn LED on:
        Serial.println("4HIGH");
      } else if ((buttonState4L == LOW || buttonState4R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "4");
        Serial.println("4LOW");
        count += 1;
        Serial.println(count);
      }
      LastState4L = buttonState4L;
      LastState4R = buttonState4R;
    }
    if (buttonState5L != LastState5L || buttonState5R != LastState5R) {
      if (buttonState5L == HIGH && buttonState5R == HIGH) {
        // turn LED on:
        Serial.println("5HIGH");
      } else if ((buttonState5L == LOW || buttonState5R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "5");
        Serial.println("5LOW");
        count += 1;
        Serial.println(count);
      }
      LastState5L = buttonState5L;
      LastState5R = buttonState5R;
    }
    if (buttonState6L != LastState6L || buttonState6R != LastState6R) {
      if (buttonState6L == HIGH && buttonState6R == HIGH) {
        // turn LED on:
        Serial.println("6HIGH");
      } else if ((buttonState6L == LOW || buttonState6R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "6");
        Serial.println("6LOW");
        count += 1;
        Serial.println(count);
      }
      LastState6L = buttonState6L;
      LastState6R = buttonState6R;
    }
    if (buttonState7L != LastState7L || buttonState7R != LastState7R) {
      if (buttonState7L == HIGH && buttonState7R == HIGH) {
        // turn LED on:
        Serial.println("7HIGH");
      } else if ((buttonState7L == LOW || buttonState7R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "7"); 
        Serial.println("7LOW");
        count += 1;
        Serial.println(count);
      }
      LastState7L = buttonState7L;
      LastState7R = buttonState7R;
    }
    if (buttonState8L != LastState8L || buttonState8R != LastState8R) {
      if (buttonState8L == HIGH && buttonState8R == HIGH) {
        // turn LED on:
        Serial.println("8HIGH");
      } else if ((buttonState8L == LOW || buttonState8R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "8");
        Serial.println("8LOW");
        count += 1;
        Serial.println(count);
      }
      LastState8L = buttonState8L;
      LastState8R = buttonState8R;
    }
    if (buttonState9L != LastState9L || buttonState9R != LastState9R) {
      if (buttonState9L == HIGH && buttonState9R == HIGH) {
        // turn LED on:
        Serial.println("9HIGH");
        count += 1;
        Serial.println(count);
      } else if ((buttonState9L == LOW || buttonState9R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "9");
        Serial.println("9LOW");
      }
      LastState9L = buttonState9L;
      LastState9R = buttonState9R;
    }
}
void subPress1() {
      client.publish(TOPIC1, 1 + "");
      Serial.printf("1");
    }
void subPress2() {
      client.publish(TOPIC1, 2 + "");
      Serial.printf("2");
    }
void subPress3() {
      client.publish(TOPIC1, 3 + "");
      Serial.printf("3");
    }
void pushPressAll() {
  char Temp[20];
  int readPin  = myBuffer.read();
  Serial.println(readPin);
  itoa(readPin, Temp,10);
  client.publish(TOPIC1, Temp);
}

// void getPress1() {
//   Serial.printf("1");
//   myBuffer.write(1); // 1 = all
//   Serial.printf("1");
//   subPress1();
// }
// void getPress2() {
//   myBuffer.write(2); // 1 = all
//   subPress2();
// }
// void getPress3() {
//   myBuffer.write(3); // 1 = all
//   subPress3();
// }
// void getPressAll() {
//   myBuffer.write(1); // 1 = all
//   pushPressAll();
// }
void checkPress() {
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

  uint8_t pinValue1L = (*myPin_port1L & myPin_mask1L) != 0;  uint8_t pinValue1R = (*myPin_port1R & myPin_mask1R) != 0;

  uint8_t pinValue2L = (*myPin_port2L & myPin_mask2L) != 0;  uint8_t pinValue2R = (*myPin_port2R & myPin_mask2R) != 0;


  uint8_t pinValue3L = (*myPin_port3L & myPin_mask3L) != 0;  uint8_t pinValue3R = (*myPin_port3R & myPin_mask3R) != 0;

  // uint8_t pinValue4L = (*myPin_port4L & myPin_mask4L) != 0;  uint8_t pinValue4 = (*myPin_port4R & myPin_mask4R) != 0;

  // uint8_t pinValue5L = (*myPin_port5L & myPin_mask5L) != 0;  uint8_t pinValue5 = (*myPin_port5R & myPin_mask5R) != 0;

  // uint8_t pinValue6L = (*myPin_port6L & myPin_mask6L) != 0;  uint8_t pinValue6 = (*myPin_port6R & myPin_mask6R) != 0;

  // uint8_t pinValue7L = (*myPin_port7L & myPin_mask7L) != 0;  uint8_t pinValue7 = (*myPin_port7R & myPin_mask7R) != 0;

  // uint8_t pinValue8L = (*myPin_port8L & myPin_mask8L) != 0;  uint8_t pinValue8 = (*myPin_port8R & myPin_mask8R) != 0;

  // uint8_t pinValue9L = (*myPin_port9L & myPin_mask9L) != 0;  uint8_t pinValue9 = (*myPin_port9R & myPin_mask9R) != 0;


  if (pinValue1L != LastState1L || pinValue1R != LastState1R){
      if (pinValue1L == HIGH && pinValue1R == HIGH) {
        // turn LED on:
        Serial.println("1HIGH");
      } else if ((pinValue1L == LOW || pinValue1R == LOW)){
        // turn LED off:
        myBuffer.write(1); // 1 = all
        count += 1;
        Serial.println(count);
        controll2.run();

      }
      LastState1L = pinValue1L;
      LastState1R = pinValue1R;

    }
    if (pinValue2L != LastState2L || pinValue2R != LastState2R) {
      if (pinValue2L == HIGH && pinValue2R == HIGH) {
        // turn LED on:
        Serial.println("2HIGH");
      } else if ((pinValue2L == LOW || pinValue2R == LOW)){
        // turn LED off:
        myBuffer.write(2); // 1 = all
        count += 1;
        Serial.println(count);
        controll2.run();
      }
      LastState2L = pinValue2L;
      LastState2R = pinValue2R;
    }
    if (pinValue3L != LastState3L || pinValue3R != LastState3R){
      if (pinValue3L == HIGH && pinValue3R == HIGH) {
        // turn LED on:
        Serial.println("3HIGH");
      } else if ((pinValue3L == LOW || pinValue3R == LOW)){
        // turn LED off:
        myBuffer.write(3); // 1 = all
        count += 1;
        Serial.println(count);
        controll2.run();
      }
      LastState3L = pinValue3L;
      LastState3R = pinValue3R;
    }
    if (buttonState4L != LastState4L || buttonState4R != LastState4R){
      if (buttonState4L == HIGH && buttonState4R == HIGH) {
        // turn LED on:
        Serial.println("4HIGH");
      } else if ((buttonState4L == LOW || buttonState4R == LOW)){
        // turn LED off:
        client.publish(TOPIC1, "4");
        Serial.println("4LOW");
        count += 1;
        Serial.println(count);
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
        count += 1;
        Serial.println(count);
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
        count += 1;
        Serial.println(count);
      }
      LastState6L = buttonState6L;
      LastState6R = buttonState6R;
    }
}

void setup() {
  myPin_mask1L = digitalPinToBitMask(36);
  myPin_port1L = portInputRegister(digitalPinToPort(36));
  myPin_mask1R = digitalPinToBitMask(39);
  myPin_port1R = portInputRegister(digitalPinToPort(39));
  myPin_mask2L = digitalPinToBitMask(34);
  myPin_port2L = portInputRegister(digitalPinToPort(34));
  myPin_mask2R = digitalPinToBitMask(35);
  myPin_port2R = portInputRegister(digitalPinToPort(35));
  myPin_mask3L = digitalPinToBitMask(32);
  myPin_port3L = portInputRegister(digitalPinToPort(32));
  myPin_mask3R = digitalPinToBitMask(33);
  myPin_port3R = portInputRegister(digitalPinToPort(33));
  // myPin_mask4 = digitalPinToBitMask(25);
  // myPin_port4 = portInputRegister(digitalPinToPort(25));
  // myPin_mask4 = digitalPinToBitMask(25);
  // myPin_port4 = portInputRegister(digitalPinToPort(25));
  // myPin_mask5 = digitalPinToBitMask(25);
  // myPin_port5 = portInputRegister(digitalPinToPort(25));
  // myPin_mask5 = digitalPinToBitMask(25);
  // myPin_port5 = portInputRegister(digitalPinToPort(25));
  // myPin_mask6 = digitalPinToBitMask(26);
  // myPin_port6 = portInputRegister(digitalPinToPort(26));
  // myPin_mask6 = digitalPinToBitMask(26);
  // myPin_port6 = portInputRegister(digitalPinToPort(26));
  // myPin_mask7 = digitalPinToBitMask(27);
  // myPin_port7 = portInputRegister(digitalPinToPort(27));
  // myPin_mask7 = digitalPinToBitMask(27);
  // myPin_port7 = portInputRegister(digitalPinToPort(27));
  // myPin_mask8 = digitalPinToBitMask(14);
  // myPin_port8 = portInputRegister(digitalPinToPort(14));
  // myPin_mask8 = digitalPinToBitMask(14);
  // myPin_port8 = portInputRegister(digitalPinToPort(14));
  // myPin_mask9 = digitalPinToBitMask(12);
  // myPin_port9 = portInputRegister(digitalPinToPort(12));
  // myPin_mask9 = digitalPinToBitMask(12);
  // myPin_port9 = portInputRegister(digitalPinToPort(12));




	// Configure Thread1
	Thread1.onRun(checkPress);

	// Configure Thread2
	Thread2.onRun(pushPressAll);

	// Adds Thread1 to the controll
	// Adds Thread1 to the controll

	// Adds Thread2 and blinkLedThread to groupOfThreads

	// Add groupOfThreads to controll
	controll.add(&Thread1);
  controll2.add(&Thread2);
  // controll.add(&Thread2);
  
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
    if (client.connect("ESP8346Client")) {
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
    delay(50);
  controll.run();
  client.loop();
}
