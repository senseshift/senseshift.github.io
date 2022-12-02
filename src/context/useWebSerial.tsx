import React, { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'

import type { FC, PropsWithChildren, MouseEventHandler } from 'react'

export interface WebSerialContextValue {
  isSupported: boolean
  error?: unknown
  port?: SerialPort
  requestPort: (options?: SerialPortRequestOptions) => Promise<SerialPort|undefined>
  connect: (options: SerialOptions) => Promise<SerialPort|false>
}

const WebSerialContext = createContext<WebSerialContextValue>({
  isSupported: false,
  requestPort: () => undefined,
  connect: () => Promise.resolve(false),
})

const useWebSerial = () => useContext(WebSerialContext)

export default useWebSerial

interface WebSerialProviderProps {}
export const WebSerialProvider: FC<PropsWithChildren<WebSerialProviderProps>> = (props) => {
  const [ error, setError ] = useState<unknown|undefined>()

  const isBrowser = useIsBrowser()
  const [isSupported, setSupported] = useState<boolean>(false)
  useEffect(() => isBrowser && setSupported(navigator.serial !== undefined), [isBrowser, setSupported])

  const [ port, setPort ] = useState<SerialPort>()
  useEffect(
    () => {
      if (!port) return

      const connectListener = (port: SerialPort, e: Event): any => {
        console.log(port, e)
      }
      const disconnectListener = (port: SerialPort, e: Event): any => {
        console.log(port, e)
      }

      // @ts-ignore
      port.addEventListener('connect', connectListener, false)
      // @ts-ignore
      port.addEventListener('disconnect', disconnectListener, false)

      return () => {
        // @ts-ignore
        port.removeEventListener('connect', connectListener, false)
        // @ts-ignore
        port.removeEventListener('disconnect', disconnectListener, false)

        port.close()
      }
    },
    [ port ]
  )
  const requestPort = useCallback(
    async (options?) => {
      try {
        // TODO: auto-select
        // const availablePorts = await navigator.serial.getPorts()

        // TODO: filters
        const port = await navigator.serial.requestPort(options)
        setPort(port)

        return port;
      } catch (e) {
        setError(e)
      }

      return undefined
    },
    [ isSupported ]
  )

  const connect = useCallback(
    async (options: SerialOptions): Promise<SerialPort|false> => {
      const _port = port || await requestPort()

      if (!_port) {
        return false
      }

      try {
        await _port.open(options)
        return _port
      } catch (e) {
        setError(e)
      }

      return false
    },
    [ port ]
  )


  const contextValue = useMemo<WebSerialContextValue>(
    () => ({ isSupported, error, port, requestPort, connect }),
    [ isSupported, error, port, requestPort, connect ]
  )

  return (<WebSerialContext.Provider value={contextValue} {...props} />)
}

