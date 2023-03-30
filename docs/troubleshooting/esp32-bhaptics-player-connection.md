# Connection issues

This guide will help you troubleshoot issues of your ESP32 not connecting to bHaptics Player

## Troubleshooting steps

1. Try connecting to other platforms, than your current environment (such as your *Android* or *iOS* phone, *Meta Quest*, or a friend's computer). This will help you determine if the problem is specific to your current environment or if it is a more general issue.
   - **If your connected** to other platforms successfully, proceed to [BLE Drivers](#ble-drivers) section.
2. Try using other versions of firmware:
   - Flash previous versions of firmware, if you are using [WebSerial Flasher](../firmware/web-flasher.mdx). **If previous version connects**, please submit a *regression* bug report.
   - Verify issue still exists on latest `master` and `develop` branches of firmware. Follow [PlatformIO Guide](../firmware/platformio.md) to build and flash latest version, and then try connecting again to see if the issue has been resolved
3. If you have another ESP32 board available, try using that board to see if the connection issue persists.
   This will help you determine if the problem is specific to your current board or if it is a more general issue.
   - If the issue persists, consider purchasing a new ESP32 board from one of our [verified sources](/docs/hardware/mcu#esp32-recommended-sources);
4. If you are still experiencing connection issues, search for help on our [Discord server](https://discord.gg/YUtRKAqty2).
   We have a supportive community of users who may be able to provide guidance and suggestions.

## Hardware issues {#hardware-issues}

> [GitHub Issue](https://github.com/openhaptics/openhaptics-firmware/issues/32)

If you've been able to connect to the bHaptics Player using another MCU (ESP32), it is most likely a hardware issue. Here is an explanation on why it can happen:

Some sellers on AliExpress and Amazon may sell faulty ESP32 boards, which can cause connection issues.
By purchasing from a verified vendor, you can be sure that you are getting a high-quality board that will work properly with OpenHaptics.

Consider purchasing components from list of verified vendors: [verified sources for ESP32](/docs/hardware/mcu#esp32-recommended-sources)

## BLE Drivers issue

If you were not able to connect to the bHaptics Player using another platform, then it is likely a BLE drivers issue. Here are some steps you can take to troubleshoot this issue:

1. Update your BLE drivers:
   - Windows: Go to your device manager and check for any updates for your Bluetooth device. You can also try to uninstall and reinstall the drivers.
2. Check if your device is compatible with BLE:
   * Make sure that your device supports Bluetooth Low Energy (BLE).
   * Check the specifications of your Bluetooth adapter to see if it supports **BLE 4.1**
3. Disable interference:
   * Move your ESP32 board and computer closer together to minimize interference.
4. Consider purchasing another Bluetooth dongle, here are some adapters that have been reported to work well:
   * `TP‑Link UB500`
   * `Asus BT400`

If you have tried all of the above steps and are still experiencing connection issues, search for help on our Discord server or submit a new issue on our GitHub page. Our community of users and developers may be able to provide additional guidance and support.

---

:::note
Remember to always follow the troubleshooting steps in the correct order, and to consult with our community on [Discord](https://discord.gg/YUtRKAqty2) if you need additional help or guidance.
:::