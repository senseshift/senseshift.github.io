import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useWebSerial } from '../../context'
import { useEspTool } from '../../hooks'

import { Octokit } from '@octokit/core'

import BrowserOnly from '@docusaurus/BrowserOnly'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link'
import Button from '../Button'
import Select from '../Select'

import type { FC, MouseEventHandler, ChangeEventHandler } from 'react'

const octokit = new Octokit()

const WebSerialNotSupported: FC = () => (
  <Admonition type='danger' icon="🤖" title="Unable to flash firmware using your browser">
    Sorry, but we can't flash firmware using your current browser.
    <br />
    Please, use Chrome 89+, Microsoft Edge 89+, Opera 76+ or any other <Link href="https://caniuse.com/web-serial" target={'_blank'} rel="noopener noreferrer">supported browser.</Link>
  </Admonition>
)

const Error: FC<{ error: unknown }> = ({ error }) => {
  const errorTitle = useMemo(
    () => {
      if (typeof error === 'object' && 'message' in error) {
        return error['message']
      }

      return 'Uknown error'
    },
    [error]
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

  return (
    <Admonition type='caution' title="Unexpected error happened">
      We are sorry, but something unexpected just happened: <code>{errorTitle}</code>
    </Admonition>
  )
}

interface FlashFirmware {}

const FlashFirmware: FC<FlashFirmware> = () => {
  const { isInitialLoading, data: releases } = useQuery({
    queryKey: ['openhaptics-firmware', 'releases'],
    queryFn: () => octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: 'openhaptics',
      repo: 'openhaptics-firmware',
    })
  })
  const [ selectedTag, selectTag ] = useState<string>()
  // Select tag on initial load
  useEffect(() => releases && selectTag(releases.data[0].tag_name), [ releases ])
  const handleTagSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => selectTag(e.target.value), [])

  const binaries = useMemo(
    () => releases && selectedTag && releases.data.find((release) => release.tag_name === selectedTag)?.assets,
    [ releases, selectedTag ]
  )
  const [ selectedBinary, selectBinary ] = useState<number>()
  // Select binary on tag changed
  useEffect(() => Array.isArray(binaries) && binaries.length && selectBinary(binaries[0].id), [ binaries ])

  const { isSupported: isWebSerialSupported, error, port, requestPort } = useWebSerial()
  const selectSerialDevice = useCallback<MouseEventHandler>(async (e) => await requestPort(), [ requestPort ])

  return (
    <BrowserOnly>
      { () => (
        <>
          { isWebSerialSupported || <WebSerialNotSupported /> }
          { error && <Error error={error} />}

          <div className='tw-max-w-md'>
            <div className='tw-grid tw-grid-cols-1 tw-gap-6'>
            <label className='tw-block'>
                Select version:
                <Select id="version" className='tw-block tw-w-full tw-mt-1' value={selectedTag} onChange={handleTagSelect}>
                  { releases && releases.data.map((release) => {
                    return (
                      <option key={`release-${release.id}`} value={release.tag_name}>{release.tag_name}</option>
                    )
                  }) }
                </Select>
              </label>
              <label className='tw-block'>
                Select firmware:
                <Select id="binary" className='tw-block tw-w-full tw-mt-1'>
                  { binaries && binaries.map((asset) => {
                    return (
                      <option key={`asset-${asset.id}`} value={asset.id}>{asset.name}</option>
                    )
                  })}
                </Select>
              </label>

              <div>
                <div className='mt-2'>
                  <Button
                    className='tw-block tw-w-full tw-mt-1'
                    onClick={selectSerialDevice}
                  >
                    Select device
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) }
    </BrowserOnly>
  )
}

export default FlashFirmware
