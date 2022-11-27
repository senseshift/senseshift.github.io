import React, { useCallback, useMemo } from 'react'

import { EspLoader } from 'esptool.ts'

interface EspToolHookProps {
  port: SerialPort
}
const useEspTool = ({ port }: EspToolHookProps) => {
  const loader = useMemo(() => new EspLoader(port), [ port ])

  const connect = useCallback(
    () => [

    ],
    [ loader ]
  )

  return {}
}

export default useEspTool
