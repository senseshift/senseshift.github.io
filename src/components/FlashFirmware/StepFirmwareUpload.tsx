import React, { useCallback, useEffect, useState, type FC } from 'react'
import { useWebSerial } from '@site/src/context'

import { ESPLoader, FlashOptions, LoaderOptions, Transport } from 'esptool-js'
import md5 from 'crypto-js/md5'
import latin1 from 'crypto-js/enc-latin1'

import Admonition from '@theme/Admonition'
import Button from '../Button'

import type { FirmwareManifest } from './types'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

enum Status {
  Idle,
  Connecting,
  Connected,
  Uploading,
  Flashing,
  Success,
}

interface StepFirmwareUploadProps {
  displayAdvancedOptions?: boolean
  manifest: FirmwareManifest
  onError?: (e: unknown) => void
}
// todo: add xterm.js terminal for user to see the logs
const StepFirmwareUpload: FC<StepFirmwareUploadProps> = ({ manifest, onError, displayAdvancedOptions = false }) => {
  const [ status, setStatus ] = useState<Status>(Status.Idle)
  const [ progress, setProgress ] = useState<number>()

  const { isSupported, requestPort, port } = useWebSerial()
  const [ espLoader, setLoader ] = useState<ESPLoader>()
  const [ portInfo, setPortInfo ] = useState<SerialPortInfo>()
  const [ chip, setChip ] = useState<string>()

  const [ baudRate, setBaudRate ] = useState<number>(921600)

  const connect = useCallback(
    async () => {
      if (!isSupported) {
        return
      }

      try {
        setStatus(Status.Connecting)

        const port = await requestPort()
        const transport = new Transport(port, true)

        setPortInfo(port.getInfo())

        try {
          // @ts-ignore 
          const flashOptions: LoaderOptions = {
            transport,
            baudrate: baudRate,
          }

          const loader = new ESPLoader(flashOptions);
         
          setChip(await loader.main());
          setLoader(loader)
          setStatus(Status.Connected)
        } catch(e) {
          await port.close()
          throw e
        }

      } catch(e) {
        setStatus(Status.Idle)
        onError && onError(e)
        console.error(e)
      }
    },
    [ requestPort ]
  )

  useEffect(() => { 
    connect();
  }, []) // Connect on mount

  useEffect(() => {
    const thisPort = port
    return () => {
      thisPort && thisPort.close()
    }
  }, [ port ]) // Disconnect on unmount

  const flashFirmware = useCallback(
    async () => {
      setStatus(Status.Flashing)

      const totalSize = manifest.parts.reduce((acc, part) => acc + part.data.length, 0)

      // @ts-ignore
      const flashOptions: FlashOptions = {
        eraseAll: false,
        compress: true,
        fileArray: manifest.parts.map(part => ({
          data: part.data,
          address: part.offset,
        })),
        flashSize: "keep",
        reportProgress: (fileIndex, written) => {
          const previousFilesSize = manifest.parts.slice(0, fileIndex).reduce((acc, part) => acc + part.data.length, 0)
          const currentSize = written + previousFilesSize

          setProgress(currentSize / totalSize)
        },
        calculateMD5Hash: (image) => md5(latin1.parse(image)).toString(),
      };

      await espLoader.writeFlash(flashOptions)

      setStatus(Status.Success)

      port && port.close();
      setLoader(undefined);
    },
    [ manifest, espLoader, setStatus, setProgress ]
  )

  return (
    <>
      { status === Status.Connecting && <Admonition type='tip'>Hold <code>BOOT</code> button on your ESP if you have one, if it's taking long time to connect device</Admonition> }

      <div className='tw-flex tw-flex-col tw-space-y-6'>
        { status === Status.Idle && <Button onClick={connect} >Connect</Button> }
        { status === Status.Connecting && <Button disabled >Connecting...</Button> }
        { status === Status.Connected && <Button onClick={flashFirmware}>Flash firmware!</Button> }
        { status === Status.Flashing && `Flashing: ${(progress * 100).toFixed(2)}%` }
        { status === Status.Success && <>
          <Admonition type='success'>
            Firmware flashed successfully!
            <br />
            Do you like this project? 
            Feel free to support it on <a href="https://www.patreon.com/senseshift" target="_blank" rel="noopener noreferrer">Patreon</a>, <a href="https://buymeacoffee.com/leon0399" target="_blank" rel="noopener noreferrer">Buy me a coffee</a> or give a star on <a href="https://github.com/senseshift/senseshift-firmware" target="_blank" rel="noopener noreferrer">GitHub</a>!
          </Admonition>
        </> }
      </div>
      
      { displayAdvancedOptions && (
        <div className='tw-flex tw-flex-col tw-space-y-6'>
          <dl>
            <dt>USB PID</dt>
            <dd>
              { portInfo?.usbProductId ? <code>{ portInfo?.usbProductId }</code> : <>&mdash;</> }
            </dd>

            <dt>USB VID</dt>
            <dd>
              { portInfo?.usbVendorId ? <code>{ portInfo?.usbVendorId }</code> : <>&mdash;</> }
            </dd>

            <dt>Chip</dt>
            <dd>
              { chip ? <code>{ chip }</code> : <>&mdash;</> }
            </dd>
          </dl>
        </div>
      )}
    </>
  )
}

export default StepFirmwareUpload
