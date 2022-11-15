---
sidebar_position: 2
---

# MCU

## ESP32

| MCU                  | Status       | Example boards     |
| :------------------- | :----------: | :----------------- |
| ESP32-WROOM-32       | ✅            | `ESP32-DevKitC V4` |
| ESP32-WROVER         | ✅            | `ESP32-DevKitC V4` |
| ESP32-C3             | ❌            |                    |
| ESP32-S3             | ❌            |                    |

## ESP8266

Unfortunately, OpenHaptics cannot be used with ESP8266 MCUs, since it uses Bluetooth LE, which ESP8266 does not feature

## Arduino

For the same reason, as ESP8266, Arduino boards cannot be used. You can **try** to use it with boards, listed on [ArduinoBLE library page](https://www.arduino.cc/reference/en/libraries/arduinoble/), but it has never been tested