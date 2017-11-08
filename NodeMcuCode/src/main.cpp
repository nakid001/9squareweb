#include <Arduino.h>
#include <driver/adc.h>

void setup () {
  Serial.begin(9600);
  Serial.print("Force = " );
  adc1_config_width(ADC_WIDTH_12Bit);
  adc1_config_channel_atten(ADC1_CHANNEL_5, ADC_ATTEN_0db);
}

void loop () {
  int value = adc1_get_voltage(ADC1_CHANNEL_5);
  Serial.print("Force = ");
  Serial.println(value);
  delay(500);
}