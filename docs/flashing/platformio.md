---
sidebar_position: 0
---

# PlatformIO IDE

Flash OpenHaptics firmware using VSCode and PlatformIO IDE

## Prerequisites

1. Install Visual Studio Code (VSCode): [Download][vscode]
2. Download PlatformIO here: [Download][pio]
3. *Recommended:* Git for Windows: [Download][git-windows]; other OS: https://git-scm.com/downloads

### Download and Install VSCode

Download the [latest Visual Studio Code][vscode] and install it.

#### Download

![Download VSCode](https://i.imgur.com/jXPXIFz.gif)

#### Install

![Install VSCode](https://i.imgur.com/hAm3Zu0.gif)

### Install PlatformIO IDE

Once Visual Studio Code is installed, open it and install [PlatformIO IDE for VSCode][pio], an extension that will allow you to connect to the MCU, build and upload the firmware.

![Install PlatformIO IDE](https://i.imgur.com/ebV0IgT.gif)

### *Recommended:* Install Git client {#install-git-client}

:::info
This step is optional but highly recommended. By installing the Git client, you will be able to update your firmware without the need to project archive it again.
:::

For Windows, you can download and install [Git for Windows][git-windows]. If you have other OS, visit https://git-scm.com/downloads.

:::note
You will most likely have to click *“Click here to download manually”*. If that doesn’t work, you can try [here](https://gitforwindows.org/).
:::

![Install Git](https://i.imgur.com/wam3ea1.gif)

## Open Firmware project

### Option 1: Clone Git repository

If you've [installed optional Git client](#install-git-client), you can clone the firmware project with Git.

Make sure you close any current projects you have open or open a new window before moving forward with these steps:

1. Click the Source Control button, click on Clone Repository and enter: `https://github.com/openhaptics/openhaptics-firmware.git`.  
   If you installed git while Visual Studio Code was open you may have to close it and re-open it first.
   ![Clone project](https://i.imgur.com/DW0CV5d.gif)
2. Once you have chosen a download location click the **Open button** that appears at the bottom right.  
   ![Open button](https://i.imgur.com/59zXAJQ.png)
3. Click **Yes, I trust the authors**.  
   ![Trust project](https://imgur.com/PzSROh7.png)

### Option 2: Open project ZIP

If you've decided not to download Git client, you can download latest firmware as ZIP and open it with following steps

1. Download [latest firmware archive](https://github.com/openhaptics/openhaptics-firmware/archive/refs/heads/master.zip) and unzip it in any folder.
2. Click **Open Folder** button in File section and select directory with unzipped firmware.  
   ![Open Folder](https://i.imgur.com/Lr8P8WL.gif)
3. Click **Yes, I trust the authors**.  
   ![Trust project](https://imgur.com/PzSROh7.png)

## Building and uploading firmware

Open project directory (extract archive if needed) in VSCode with PlatformIO exension and choose desired firmware target
Flash it using either **quick actions**, or by running `Flash` command from **Project Tasks** list (see screenshot below)

<details>
  <summary>GUI Actions</summary>

  ![PlatformIO GUI](https://user-images.githubusercontent.com/1759654/193428679-148f0c8f-8439-451f-8c6d-6d6be4dbdf87.png)

  1. PlatformIO IDE homepage
  2. Select desired firmware mode and run command (Build, Upload or Monitor) in **Project Tasks**
  3. Use **quick actions** (`✔️ - Build`, `➡️ - Upload`, `🔌 - Monitor`). Choose your default mode by clicking `Default (openhaptics-firmware)` and switching your default

</details>

## Customizing and editing firmware

If youre setup requires additional changes, select best suiting target, and edit it's source code. All firmware files are configured in `platformio.ini` and `ini/bhaptics.ini` files. Read more about configuration [here](https://docs.platformio.org/en/latest/projectconf/index.html)

[vscode]: https://code.visualstudio.com/download
[pio]: https://platformio.org/platformio-ide
[git-windows]: https://git-scm.com/download/win