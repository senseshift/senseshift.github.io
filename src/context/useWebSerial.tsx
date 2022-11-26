import React, { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'

import type { FC, PropsWithChildren, MouseEventHandler } from 'react'

export interface WebSerialContextValue {
  isSupported: boolean
  error?: unknown
  port?: SerialPort
  requestPort: (options?: SerialPortRequestOptions) => void
}

const WebSerialContext = createContext<WebSerialContextValue>({
  isSupported: false,
  requestPort: () => {},
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
  const requestPort = useCallback(
    async (options) => {
      try {
        // TODO: auto-select
        // const availablePorts = await navigator.serial.getPorts()

        // TODO: filters
        const port = await navigator.serial.requestPort(options)
        setPort(port)
      } catch (e) {
        setError(e)
      }
    },
    [ isSupported ]
  )

  const contextValue = useMemo<WebSerialContextValue>(
    () => ({ isSupported, error, port, requestPort }),
    [ isSupported, error ]
  )

  return (<WebSerialContext.Provider value={contextValue} {...props} />)
}

