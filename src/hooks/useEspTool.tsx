import { useEffect, useMemo } from 'react'
import { EspLoader } from 'esptool.ts'

const useEspTool = (port: SerialPort): EspLoader => {
  return useMemo(() => new EspLoader(port), [ port ])
}

export default useEspTool
