import React, { useCallback, useEffect, useState, type FC } from 'react'
import { useWebSerial } from '@site/src/context'

import { EspLoader } from 'esptool.ts'

import Admonition from '@theme/Admonition'
import Button from '../Button'

import type { FirmwareManifest } from './types'
import WebSerialError from './WebSerialError'

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
  manifest: FirmwareManifest
  onError?: (e: unknown) => void
}
const StepFirmwareUpload: FC<StepFirmwareUploadProps> = ({ manifest, onError }) => {
  const [ status, setStatus ] = useState<Status>(Status.Idle)
  const [ progress, setProgress ] = useState<number>()

  const { isSupported, requestPort, port } = useWebSerial()
  const [ espLoader, setLoader ] = useState<EspLoader>()
  const [ baudRate, setBaudRate ] = useState<115200 | 230400 | 921600>(115200)

  const connect = useCallback(
    async () => {
      if (!isSupported) {
        return
      }

      try {
        setStatus(Status.Connecting)
        setBaudRate(115200)

        const port = await requestPort()
        await port.open({ baudRate })

        console.debug(port.getInfo())

        try {
          const loader = new EspLoader(port);
          await loader.connect(25)

          const chipFamily = await loader.chipFamily();
          const chipName = await loader.chipName();
          const macAddr = await loader.macAddr();

          console.log({ chipFamily, chipName, macAddr })

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
    connect()
  }, []) // Connect on mount

  useEffect(() => () => {
    espLoader && espLoader.disconnect().finally(() => { port && port.close() })
  }, [ espLoader ]) // Disconnect on unmount

  const flashFirmware = useCallback(
    async () => {
      setStatus(Status.Flashing)

      await espLoader.loadStub();
      await espLoader.setBaudRate(baudRate, 921600);

      setBaudRate(921600)

      for (const partition of manifest.parts) {
        console.log(`Writing partition ${partition.offset}: ${partition.path}`);
        const data = new Uint8Array(await partition.binary.arrayBuffer())
        await espLoader.flashData(data, partition.offset, (idx, cnt) => {
          setProgress(idx/cnt)
        });
        await sleep(100);
      }

      await espLoader.disconnect()
      setStatus(Status.Success)
    },
    [ manifest, port, espLoader ]
  )

  return (
    <>
      { status === Status.Connecting && <Admonition type='tip'>Hold <code>BOOT</code> button on your ESP if you have one, if it's taking long time to connect device</Admonition> }

      <div className='tw-flex tw-flex-col tw-space-y-6'>
        { status === Status.Idle && <Button onClick={connect} >Connect</Button> }
        { status === Status.Connecting && <Button disabled >Connecting...</Button> }
        { status === Status.Connected && <Button onClick={flashFirmware}>Flash firmware!</Button> }
        { status === Status.Flashing && `Flashing: ${(progress * 100).toFixed(2)}%` }
        { status === Status.Success && 'Done!' }
      </div>
    </>
  )
}

export default StepFirmwareUpload
