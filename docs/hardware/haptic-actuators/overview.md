# Overview

There are 2 main types of haptic actuators: **eccentric rotating mass (ERM)** and **linear resonant actuators (LRA)**

Both types can be used with OpenHaptics, though, ERMs are much easier, since **LRAs require additional drivers ICs**

## Difference between ERMs and LRAs

<figure>
  <video autoPlay loop muted playsInline>
    <source src={require('/static/video/PrecisionMicrodrives_ERMvsLRAMotors_Optimized.mp4').default} type="video/mp4" />
  </video>
  <figcaption >
    A <a href="https://vimeo.com/132533086" target="_blank">video</a> from Precision Microdrives showing the two most common types of vibration motors: eccentric rotating mass (ERM) motors and linear resonant actuators (LRA). ERM motors vibrate in two directions due to the centripetal force of the unbalanced mass attached to the DC motor axle. LRAs are similar in design to speakers.
  </figcaption>
</figure>

## Hardware requirements

Using **ERMs does not require additional hardware** and relies only on PWM signal, to change it's amplitude

Using **LRAs require external [haptic motor driver](https://learn.sparkfun.com/tutorials/haptic-motor-driver-hook-up-guide)**, though you can use it with **ERMs for better haptics**, since it can detect internal resonance, apply overdrive and braking overvoltage

|                       | ERM | LRA |
| :-------------------- | :-: | :-: |
| Without haptic driver | ✅   | ❌   |
| With haptic driver    | ✅   | ✅   |

## Credits

- [Makeability Lab](https://makeabilitylab.github.io/physcomp/advancedio/vibromotor.html)
- [Precision Microdrives](https://www.precisionmicrodrives.com/vibration-motors-erms-and-lras)