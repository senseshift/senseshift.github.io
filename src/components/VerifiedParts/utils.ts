import verifiedParts, {
  type RegionalLinkObject,
  type VerifiedParts as IVerifiedParts,
} from '@site/src/verified-parts'
import {
  type IPart,
  type IPartObject,
  type IPartWithQty,
} from './types'

export const isPartWithQty = <P extends IVerifiedParts = typeof verifiedParts>(part: IPart<P>): part is IPartWithQty<P> =>
  Array.isArray(part) // && part.length === 2 && typeof part[0] === 'string' && typeof part[1] === 'number'
export const isPartObject = <P extends IVerifiedParts = typeof verifiedParts>(part: IPart<P>): part is IPartObject<P> =>
  typeof part === 'object'

export const normalizePart = <P extends IVerifiedParts = typeof verifiedParts>(part: IPart<P>): IPartObject<P> => {
  if (isPartWithQty(part)) {
    return {
      partName: part[0],
      qty: part[1],
    }
  }

  if (isPartObject(part)) {
    return part
  }

  if (typeof part === 'string') {
    return {
      partName: part,
      qty: 1,
    }
  }

  throw new Error('Unknown part format')
}

export const getWebsiteTitle = (link: RegionalLinkObject): string => {
  const url = link.url

  if (url.includes('aliexpress.')) {
    return 'AliExpress'
  }

  if (url.includes('amazon.')) {
    return 'Amazon'
  }

  if (url.includes('adafruit.com')) {
    return 'Adafruit'
  }

  if (url.includes('meta.com')) {
    return 'Meta'
  }

  if (url.includes('vrcover')) {
    if (url.includes('int.vrcover')) {
      return 'VR\u00A0Cover\u00A0(International)'
    }
    if (url.includes('us.vrcover')) {
      return 'VR\u00A0Cover\u00A0(US)'
    }
    if (url.includes('eu.vrcover')) {
      return 'VR\u00A0Cover\u00A0(Europe)'
    }
  }

  return 'Other'
}