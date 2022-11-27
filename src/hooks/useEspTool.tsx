import { useMemo } from 'react'
import { EspLoader } from 'esptool.ts'

interface EspToolHookProps {
  port: SerialPort
}
const useEspTool = ({ port }: EspToolHookProps) => {
  const loader = useMemo(() => new EspLoader(port), [ port ])

  return loader
}

export default useEspTool
