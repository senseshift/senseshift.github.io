import React, { useMemo, type FC } from "react"

import Admonition from '@theme/Admonition'
import Link from "@docusaurus/Link"

const WebSerialError: FC<{ error: unknown }> = ({ error }) => {
  const errorTitle = useMemo(
    () => {
      if (typeof error === 'object' && 'message' in error) {
        return error['message']
      }

      return 'Uknown error'
    },
    [ error ]
  )

  if (errorTitle.includes('No port selected by the user')) {
    return (
      <Admonition type='caution' title="Port was not selected">
        If you didn't select a port because you didn't see your device listed, try the following steps:

        <ol>
          <li>Make sure that the device is connected to this computer (the one that runs the browser that shows this website)</li>
          <li>Most devices have a tiny light when it is powered on. If yours has one, make sure it is on.</li>
          <li>Make sure that the USB cable you use can be used for data and is not a power-only cable.</li>
          <li>
            Make sure you have the right drivers installed. Please, refer to{' '}
            <Link to="/docs/flashing/platformio#drivers">documentation</Link>{' '}
            for selecting apropriate drivers
          </li>
        </ol>
      </Admonition>
    )
  }

  if (errorTitle.includes('Failed to open serial port')) {
    return (
      <Admonition type='caution' title="Unable to connect to serial">
        Check that you have the right drivers. You can also hold the <code>BOOT</code> button on your ESP if you have one.
        <br />
        Make sure, you don't have Arduino IDE or PlatformIO running and refresh this page.
      </Admonition>
    )
  }

  return (
    <Admonition type='caution' title="Unexpected error happened">
      We are sorry, but something unexpected just happened: <code>{errorTitle}</code>
    </Admonition>
  )
}

export default WebSerialError