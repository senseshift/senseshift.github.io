import { useState, useEffect } from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'

const useIsWebserialSupported = () => {
  const isBrowser = useIsBrowser()
  const [isWebSerialSupported, setWebserialSupported] = useState<boolean>()

  useEffect(() => {
    if (!isBrowser) {
      setWebserialSupported(undefined)
      return
    }

    if (navigator.serial !== undefined) {
      setWebserialSupported(true)
    } else {
      setWebserialSupported(false)
    }
  }, [isBrowser])

  return isWebSerialSupported
}

export default useIsWebserialSupported
