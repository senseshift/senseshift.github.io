# Connection issues

## ESP32 does not connect to bHaptics Player

[GitHub Issue](https://github.com/openhaptics/openhaptics-firmware/issues/32)

:::note 
Remember to always follow the troubleshooting steps in the correct order, and to consult with our community on Discord if you need additional help or guidance. 
:::

### Troubleshooting steps

1. Try connecting to other platforms, than your current environment (such as your Android or iOS phone, Meta Quest, or a friend's computer).
   This will help you determine if the problem is specific to your current environment or if it is a more general issue.
2. Verify issue still exists on latest `master` branch of firmware. Follow [PlatformIO Guide](../flashing/platformio.md) to build and flash latest version,
   and then try connecting again to see if the issue has been resolved
3. If you are still experiencing connection issues, search for help on our [Discord server](https://discord.gg/YUtRKAqty2).
   We have a supportive community of users who may be able to provide guidance and suggestions.
4. If you have another ESP32 board available, try using that board to see if the connection issue persists.
   This will help you determine if the problem is specific to your current board or if it is a more general issue.
5. If the issue persists, consider purchasing a new ESP32 board from one of our [verified sources](/docs/hardware/mcu#esp32-recommended-sources);

Some sellers on AliExpress and Amazon may sell faulty ESP32 boards, which can cause connection issues.
By purchasing from a verified vendor, you can be sure that you are getting a high-quality board that will work properly with OpenHaptics.

Consider purchasing components from list of verified vendors: [verified sources for ESP32](/docs/hardware/mcu#esp32-recommended-sources)