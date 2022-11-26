import React, { type FC } from 'react'

import Layout from '@theme/Layout'
import { WebSerialProvider } from '@site/src/context'
import FlashFirmware from '@site/src/components/FlashFirmware'

const FlashPage: FC = () => {

  return (
    <WebSerialProvider>
      <Layout
        title='Flash Firmware'
      >
        <main className='container padding-vert--xl'>
          <FlashFirmware />
        </main>
      </Layout>
    </WebSerialProvider>
  )
}

export default FlashPage