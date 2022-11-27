import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import type { FC } from 'react'

import { Octokit } from '@octokit/core'
import { useQuery } from '@tanstack/react-query'
import { useWebSerial } from '../../context'
import { compareVersions } from 'compare-versions'

import BrowserOnly from '@docusaurus/BrowserOnly'
import Admonition from '@theme/Admonition'
import Link from '@docusaurus/Link'

import ConfigureFirmware from './ConfigureFirmware'
import SerialConnect from './SerialConnect'
import DownloadFirmware from './DownloadFirmware'
import WebSerialNotSupported from './WebSerialNotSupported'

const Error: FC<{ error: unknown }> = ({ error }) => {
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
      </Admonition>
    )
  }

  return (
    <Admonition type='caution' title="Unexpected error happened">
      We are sorry, but something unexpected just happened: <code>{errorTitle}</code>
    </Admonition>
  )
}

interface FirmwareManifest {
  parts: {
    path: string
    offset: number
    binary?: Blob
  }[]
}

enum Steps {
  Configure = 'configure',
  Download = 'download',
  Connect = 'connect',
  Flash = 'flash',
}

interface FlashFirmware {}

const FlashFirmware: FC<FlashFirmware> = () => {
  const { isSupported: isWebSerialSupported, error } = useWebSerial()
  const [ activeStep, setStep ] = useState(Steps.Configure);

  const octokit = useMemo(() => new Octokit(), [])
  const { isInitialLoading, data: releasesData } = useQuery({
    queryKey: ['openhaptics-firmware', 'releases'],
    queryFn: async () => (await octokit.request('GET /repos/{owner}/{repo}/releases', { owner: 'openhaptics', repo: 'openhaptics-firmware' })).data
  })
  const releases = useMemo(
    () => releasesData?.filter(({ tag_name }) => compareVersions(tag_name, '0.1.3') >= 0),
    [ releasesData ]
  )
  const [ selectedTag, selectTag ] = useState<string>()
  useEffect(() => releases && selectTag(releases[0].tag_name), [ releases ]) // Select tag on initial load

  const assets = useMemo(
    () => releases && selectedTag && releases.find((release) => release.tag_name === selectedTag)?.assets,
    [ releases, selectedTag ]
  )
  const [ selectedAsset, selectAsset ] = useState<string>()
  useEffect(() => Array.isArray(assets) && assets.length && selectAsset(assets[0].node_id), [ assets ]) // Select binary on tag changed
  const selectedDownloadUrl = useMemo(() => releases?.find(r => r.tag_name === selectedTag)?.assets?.find(r => r.node_id === selectedAsset)?.browser_download_url, [ releases, selectedTag, selectedAsset ])

  const [ firmware, setFirmware ] = useState<FirmwareManifest>()

  return (
    <BrowserOnly>
      { () => (
        <>
          { isWebSerialSupported || <WebSerialNotSupported /> }
          { error && <Error error={error} />}

          <div className='tw-max-w-md'>
            {
              activeStep === Steps.Configure && // Step 1: select version and binary
                ((isInitialLoading || !releases)
                  ? <></> // Loader
                  : <ConfigureFirmware
                      releases={releases}
                      selectedRelease={selectedTag}
                      onSelectRelease={selectTag}

                      assets={assets}
                      selectedAsset={selectedAsset}
                      onSelectAsset={selectAsset}

                      onSubmit={() => { setStep(Steps.Download) }}
                    />
                )
            }
            { activeStep === Steps.Download && <DownloadFirmware
                downloadUrl={selectedDownloadUrl}
                onSubmit={
                  (manifest) => {
                    setFirmware(manifest)
                    setStep(Steps.Connect)
                  }
                }
              />
            }
            { activeStep === Steps.Connect && <SerialConnect onSubmit={() => { setStep(Steps.Flash) }} /> }
          </div>
        </>
      ) }
    </BrowserOnly>
  )
}

export default FlashFirmware
