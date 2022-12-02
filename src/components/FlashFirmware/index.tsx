import React, { useState, useEffect, useReducer } from 'react'
import type { FC } from 'react'

import useWebSerial from '@site/src/context/useWebSerial'

import BrowserOnly from '@docusaurus/BrowserOnly'

import WebSerialNotSupported from './WebSerialNotSupported'
import WebSerialError from './WebSerialError'

import StepFirmwareConfigure from './StepFirmwareConfigure'
import StepFirmwareDownload from './StepFirmwareDownload'
import StepFirmwareUpload from './StepFirmwareUpload'

import type { FirmwareManifest } from './types'

enum Step {
  Configure = 'configure',
  Download = 'download',
  Upload = 'upload',
}

const setFirmwareConfig = (
  { version, downloadUrl }: { version: string, downloadUrl: string },
): {
  type: 'SET_CONFIG',
  payload: {
    version: string,
    downloadUrl: string,
  }
} => ({
  type: 'SET_CONFIG',
  payload: {
    version,
    downloadUrl,
  }
})

const setFirmwareManifest = (
  { manifest }: { manifest: FirmwareManifest },
): {
  type: 'SET_MANIFEST',
  payload: {
    manifest: FirmwareManifest
  }
} => ({
  type: 'SET_MANIFEST',
  payload: {
    manifest,
  },
})

type Action =
  | ReturnType<typeof setFirmwareConfig>
  | ReturnType<typeof setFirmwareManifest>

interface FirmwareFlashState {
  currentStep: Step
  version?: string
  downloadUrl?: string
  manifest?: FirmwareManifest
}

const flashFirmwareReducer = (state: FirmwareFlashState, action: Action): FirmwareFlashState => {
  console.debug(action)

  switch(action.type) {
    case 'SET_CONFIG':
      const { version, downloadUrl } = action.payload
      return {...state, currentStep: Step.Download, version, downloadUrl }
    case 'SET_MANIFEST':
      const { manifest } = action.payload
      return {...state, currentStep: Step.Upload, manifest }
  }
}

const FlashFirmware: FC = () => {
  const [ error, setError ] = useState<unknown>();

  const { isSupported: isWebSerialSupported, error: serialError, port } = useWebSerial()
  useEffect(() => setError(serialError), [ serialError ])

  const [ state, dispatch ] = useReducer(flashFirmwareReducer, { currentStep: Step.Configure })

  return (
    <BrowserOnly>
      { () => (
        <>
          { isWebSerialSupported || <WebSerialNotSupported /> }
          { error && <WebSerialError error={error} />}

          <div className='tw-max-w-md'>
            { state.currentStep === Step.Configure && <StepFirmwareConfigure onSubmit={(data) => dispatch(setFirmwareConfig(data))} /> }
            { state.currentStep === Step.Download && <StepFirmwareDownload version={state.version!} downloadUrl={state.downloadUrl} onSubmit={(data) => dispatch(setFirmwareManifest(data))} />}
            { state.currentStep === Step.Upload && <StepFirmwareUpload manifest={state.manifest!} onError={setError} />}
          </div>
        </>
      ) }
    </BrowserOnly>
  )
}

export default FlashFirmware
