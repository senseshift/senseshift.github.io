# Building first device

Are you ready to start building your first haptic-feedback device? This guide will provide an overview of the steps you need to take, from selecting a device to building and testing your assembly.

:::caution
Keep in mind that this guide is a work-in-progress and may not be complete, so you may need to do some additional research and problem-solving on your own.

If you need help or guidance along the way, be sure to consult with our community on [Discord](https://discord.gg/YUtRKAqty2).
:::

## General guide

### Step 1: Select first device to build

Select one of the schematics, listed in the [GitHub Repository](https://github.com/openhaptics/openhaptics-hardware#schematics).

We suggest selecting [**x6 Haptic Facial Interface**](https://github.com/openhaptics/openhaptics-hardware/tree/main/Devices/Face%20Interface/ESP32%20+%20Integrated%20PWM), since it is the easiest one to build, requiring much less components, than others and much easier to assemble.

On the page with your desired schematic, you will find all required information about hardware assembly.
Note, that some of our schematics provide optional features for advanced makers. You can simply skip optional step, if you want to.

### Step 2: Order required components

Search online for components, listed in **Bill of materials** table on hardware schematic page.  
We recommend ordering some extra components, or even ordering extra components from multiple sources, in case of some of them arrive defective.
You can easily re-use same components other devices and projects in future

You might also require some consumables, like Breadboard and jumper wires, and some additional hardware like soldering iron (it depends, if components you ordered have appropriate connectors)

### Step 3: Assembly according to schematic

Assembly all components according to wiring diagram, shown on GitHub page of previously selected schematic. Connect wires on a breadboard, as shown on an image.
Make sure you connected everything coorectly. **Components can be physically damaged, if attached incorrectly!**

### Step 4: Flash firmware and test your assembly

Flash firmware to your board, with any of methods, listed on [this page](/docs/category/flashing-firmware). Connect your board to power source and make sure it [successfully connects](/docs/category/connecting-to-device) to your host.

### Step 5: Mount wearable components

Mount everything you've just build to your body with method of your choice
