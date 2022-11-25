import React, { type FC } from 'react'
import Layout from '@theme/Layout'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const FlashPage: FC = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title='Flash Firmware'
    >
      <main className='container padding-vert--xl'></main>
    </Layout>
  )
}

export default FlashPage