---
sidebar_position: 0
---

# Install drivers

It is required to install drivers to flash firmware, regardless of chosen flashing method

## CP2102 (ESP32-DevKitC V4)

1. Download the zip archive with the drivers for **Windows** from Silicon Labs [here](https://www.silabs.com/documents/public/software/CP210x_Windows_Drivers.zip).  
   For **macOS**, the drivers can be found [here](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads).

2. Extract the files from the downloaded zip archive, then launch `CP210xVCPInstaller_x64.exe` (`CP210xVCPInstaller_x86.exe` if you are using 32-bit Windows) and follow installation instructions.

## CH340, CH341 (NodeMCU-32S)

Download the `CH341SER.EXE` file for **Windows** from [here](https://cdn.sparkfun.com/assets/learn_tutorials/8/4/4/CH341SER.EXE), run it and follow installation instructions  
Driver for **macOS** is available [here](https://www.wch.cn/downloads/CH341SER_MAC_ZIP.html)

![Installation](https://i.imgur.com/9Ztro0h.gif)

## CH342, CH343, CH9102

Download archive file for **Windows** from [here](https://www.wch.cn/downloads/CH343SER_ZIP.html), extract files from zip archive, then launch `SETUP.EXE` mad follow installation instructions.  
Driver for **macOS** is available [here](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html)

---

> Parts of this document are an adaptation from SlimeVR. Some Credit goes to the SlimeVR team [adapted from here](https://docs.slimevr.dev/firmware/setup-and-install.html)