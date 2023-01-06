import React, {
  useMemo,
  useState,
  type FC,
} from 'react'

import Link from '@docusaurus/Link'
import verifiedParts, {
  normalizeLink,
  type VerifiedParts as IVerifiedParts,
  type RegionalLink,
  type RegionalLinkObject,
  type RegionalLinkArray,
} from '@site/src/verified-parts'
import {
  type IPartName,
} from './types'
import Select from '../Select'
import { getWebsiteTitle } from './utils'

const SHIPPING_MODIFIER = 1.2

interface IPartRowProps<P extends IVerifiedParts = typeof verifiedParts> {
  partName: IPartName<P>
  links: RegionalLinkArray
  qty: number
}

const PartRow: FC<IPartRowProps> = ({
  partName,
  links,
  qty,
}) => {
  const [link, selectLink] = useState<number>(0)

  const normalizedLinks = useMemo<RegionalLinkObject[]>(
    () => links.map((link) => normalizeLink(link)),
    [links],
  )

  const selectedLink = useMemo<RegionalLinkObject>(
    () => normalizedLinks[link],
    [normalizedLinks, link],
  )

  const selectedQty = useMemo(
    () => qty <= (selectedLink.qtyPer ?? 1)
      ? 1
      : Math.ceil(qty / selectedLink.qtyPer),
    [selectedLink, qty],
  )

  return (
    <tr>
      <td className='tw-text-left'>{partName}</td>
      <td className='tw-text-left'>
        <Select
          className='tw-w-full'
          value={link}
          onChange={(e) => selectLink(Number(e.target.value))}
        >
          { normalizedLinks.map((link, index) => {
            const partSuffix = link.suffix
            const partName = getWebsiteTitle(link) + (partSuffix ? `\u00A0(${partSuffix})` : '')

            return (
              <option key={index} value={index}>{partName}</option>
            )
          }) }
        </Select>
      </td>
      <td className='tw-text-right'>{selectedQty}</td>
      <td className='tw-text-right'>
        ${selectedLink.pricePer.toFixed(2)}
      </td>
      <td className='tw-text-right'>
        ~${(selectedQty * selectedLink.pricePer * SHIPPING_MODIFIER).toFixed(2)}
      </td>
      <td className='tw-text-left'>
        <Link to={selectedLink.url} target={'_blank'}>
          { getWebsiteTitle(selectedLink) }
        </Link>
      </td>
    </tr>
  )
}

export default PartRow
