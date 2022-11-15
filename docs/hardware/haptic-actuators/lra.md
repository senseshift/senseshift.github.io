---
sidebar_position: 2
---

# LRA

LRA stands for **linear resonant actuator** and rely on a small internal mass attached to a spring, which vibrates in a reciprocating linear motion with an applied AC signal.

In contrast to ERMs, LRAs do not spin. They linearly move a mass (up and down) attached to a spring using a magnetic voice coil. LRAs require a smooth sine wave voltage signal (aka an AC signal) driven at specific resonant frequencies &mdash; usually 150-200Hz &mdash; which controls how often the mass moves and, therefore, the vibration oscillation. They are increasingly common in smartphones, watches, and trackpads to mimic the feeling of a click.

For example, newer Apple MacBooks and iPhones feature the Apple Taptic Engine, which uses LRA technology. While LRAs are more responsive than ERMs (~15-25ms startup times), their vibration strength is more minimal and the wiring circuitry more complicated. Moreover, their vibration frequency is strongest at a single frequency (the resonant frequency).

## LRA types

Most LRA drives are divided into 2 categories:

* Y-Axis LRA Linear Vibrator
* Z-Axis LRA Linear Vibrator

| Y-Axis LRA | Z-Axis LRA |
| :--------: | :--------: |
| ![Y-Axis LRA](https://www.precisionmicrodrives.com/wp-content/uploads/2021/10/lra-linear-vibrator-construction.original.jpg) | ![Z-Axis LRA](https://www.precisionmicrodrives.com/wp-content/uploads/2021/10/z-axis-linear-resonant-actuator.original.png) |

## Applying LRAs

:::note
There is no strict rules, how to apply different actuators, just a recommendation, based on personal experience.
:::

| ERM type | Feedback Force | Vest | Glove | Facial Interface | Other wearable |
| :--------| :------------- | :--: | :---: | :--------------: | :------------: |
| Coin LRA | Weakest        | ❌   | ✅    | ✅              | ❌             |

## Credits

- [Makeability Lab](https://makeabilitylab.github.io/physcomp/advancedio/vibromotor.html)
- Precision Microdrives: [1](https://www.precisionmicrodrives.com/vibration-motors-erms-and-lras), [2](https://www.precisionmicrodrives.com/linear-resonant-actuators-lras)