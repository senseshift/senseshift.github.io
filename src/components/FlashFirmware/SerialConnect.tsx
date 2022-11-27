import React, { useCallback, useEffect, useState, type FC } from 'react'

import { useWebSerial } from '../../context'

import Button from '../Button'

interface Props {
  onSubmit?: (port: SerialPort) => void
}

const SerialConnect: FC<Props> = ({ onSubmit }) => {
  const { error, requestPort, connect } = useWebSerial()
  const [ isLoading, setLoading ] = useState(false)

  const connectPort = useCallback(
    async () => {
      setLoading(true)
      const port = await connect({
        baudRate: 921600,
      })
      setLoading(false)

      if (!port) {
        return
      }

      onSubmit && onSubmit(port)
    },
    [ requestPort ]
  )

  useEffect(() => { connectPort() }, [])

  return (
    <>
      <Button
        className="tw-block tw-w-full tw-mt-1"
        onClick={connectPort}
        disabled={isLoading}
      >
        {
          isLoading
            ? 'Connecting...'
            : !error ? 'Connect to device' : 'Retry'
        }
      </Button>
    </>
  )
}

export default SerialConnect
