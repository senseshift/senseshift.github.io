import React, { type FC, useState, useMemo, useEffect, useCallback, type MouseEventHandler, type ChangeEventHandler } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Octokit } from '@octokit/core'

import Layout from '@theme/Layout'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link';
import Button from '../../components/Button';

import { useIsWebserialSupported } from '../../hooks'

const octokit = new Octokit()

const WebSerialNotSupported: FC = () => (
  <Admonition type='danger' icon="🤖" title="Unable to flash firmware using your browser">
    Sorry, but we can't flash firmware using your current browser.
    <br />
    Please, use Chrome 89+, or any other <Link href="https://caniuse.com/web-serial" target={'_blank'} rel="noopener noreferrer">supported browser.</Link>
  </Admonition>
)

const Error: FC<{ error: unknown }> = ({ error }) => {
  const errorTitle = useMemo(
    () => {
      if (typeof error === 'object' && 'message' in error) {
        return error['message']
      }

      return 'Can\'t select serial device'
    },
    [error]
  )

  if (errorTitle.includes('No port selected by the user')) {
    return (
      <Admonition type='caution' title={errorTitle}>
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

  return (
    <Admonition type='caution' title={errorTitle}>
      Unknown error happened.
    </Admonition>
  )
}

const FlashPage: FC = () => {
  const { isInitialLoading, data: releases } = useQuery({
    queryKey: ['openhaptics-firmware', 'releases'],
    queryFn: () => octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: 'openhaptics',
      repo: 'openhaptics-firmware',
    }),
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const [selectedTag, selectTag] = useState<string>()
  useEffect(
    () => releases && selectTag(releases.data[0].tag_name),
    [ releases ],
  )
  const handleTagSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => selectTag(e.target.value),
    []
  )

  const binaries = useMemo(
    () => releases && selectedTag && releases.data.find((release) => release.tag_name === selectedTag)?.assets,
    [ releases, selectedTag ]
  )
  const [selectedBinary, selectBinary] = useState<string>()
  useEffect(
    () => binaries && selectBinary(binaries[0].id),
    [ binaries ]
  )

  const isWebSerialSupported = useIsWebserialSupported()
  const [selectedPort, selectPort] = useState<Serial>()
  const [error, setError] = useState()

  const selectSerialDevice = useCallback<MouseEventHandler>(
    async (e) => {
      e.preventDefault()

      try {
        // TODO: auto-select
        // const availablePorts = await navigator.serial.getPorts()

        // TODO: filters
        const port = await navigator.serial.requestPort()
      } catch (e) {
        setError(e)
        console.warn(e)
      }
    },
    [isWebSerialSupported]
  )

  return (
    <Layout
      title='Flash Firmware'
    >
      <main className='container padding-vert--xl'>
        <BrowserOnly>
          { () => {
            if (isWebSerialSupported === false) {
              return <WebSerialNotSupported />
            }

            return (
              <>
                { error && <Error error={error} />}

                <select value={selectedTag} onChange={handleTagSelect}>
                  { releases && releases.data.map((release) => {
                    return (
                      <option key={`release-${release.id}`} value={release.tag_name}>{release.tag_name}</option>
                    )
                  }) }
                </select>
                <select>
                  { binaries && binaries.map((asset) => {
                    return (
                      <option key={`asset-${asset.id}`} value={asset.id}>{asset.name}</option>
                    )
                  })}
                </select>
                <Button onClick={selectSerialDevice}>Connect</Button>
              </>
            )
          }}
        </BrowserOnly>
      </main>
    </Layout>
  )
}

export default FlashPage