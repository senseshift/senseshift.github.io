import React, { useCallback, useEffect, useMemo, type FC } from 'react'
import verifiedParts, { type VerifiedParts, type Region } from '@site/src/verified-parts'
import Link from '@docusaurus/Link'

interface Props<P extends VerifiedParts> {
  part: keyof P
  allParts: P
}

const getWebsiteTitle = (url: string) => {
  if (url.includes('aliexpress')) {
    return 'AliExpress'
  }

  if (url.includes('amazon')) {
    return 'Amazon'
  }

  return 'Other'
}

const VerifiedPartLinksTable = <P extends VerifiedParts = typeof verifiedParts>(props: Props<P>) => {
  const {
    part,
    allParts = verifiedParts
  } = props

  const currentPartLinks: P[keyof P] = useMemo(
    () => allParts[part],
    [allParts, part],
  )

  return (
    <table>
      <thead>
        <tr>
          <th className='tw-text-left'>Region</th>
          <th className='tw-text-left'>Links</th>
        </tr>
      </thead>
      <tbody>
        { Object.entries(currentPartLinks).map(([region, links]) => (
          <tr>
            <td className='tw-text-left'>{region}</td>
            <td className='tw-text-left tw-align-text-top'>
              <ul>
                {
                  links.map(link => (
                    <li>
                      <Link to={link} target={'_blank'}>{getWebsiteTitle(link)}</Link>
                    </li>
                  ))
                }
              </ul>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}

export default VerifiedPartLinksTable
