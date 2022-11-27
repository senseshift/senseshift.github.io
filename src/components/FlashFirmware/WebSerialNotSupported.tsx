import React, { type FC } from 'react'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link'

const WebSerialNotSupported: FC = () => (
  <Admonition type='danger' icon="🤖" title="Unable to flash firmware using your browser">
    Sorry, but we can't flash firmware using your current browser. Unfortunately, your browser does not support WebSerial API
    <br />
    Please, use Chrome 89+, Microsoft Edge 89+, Opera 76+ or any other <Link href="https://caniuse.com/web-serial" target={'_blank'} rel="noopener noreferrer">supported browser.</Link>
  </Admonition>
)

export default WebSerialNotSupported