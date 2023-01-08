import React, {
  useMemo,
  type FC,
  type ReactNode,
} from 'react'
import Link from '@docusaurus/Link'

import {
  normalizeLink,
  type Region,
  type RegionalPartLinks,
  type RegionalLink,
  type RegionalLinkArray,
  type RegionalLinkObject,
} from '@site/src/verified-parts'

import {
  getWebsiteTitle,
} from '@site/src/components/VerifiedParts/utils'

const isGlobalLink = (link: RegionalLink, part: RegionalPartLinks): boolean => part['Global'].includes(link)

export interface ILinkListProps {
  part?: RegionalPartLinks
  region?: Region
  links?: RegionalLinkArray // At least 1 value
}

const LinkList: FC<ILinkListProps> = ({ links, part, region = 'Global' }) => {
  const currentLinks = useMemo<RegionalLinkArray>(
    () => links ??
      (
        (region !== 'Global' && part[region])
          ? [...part[region], ...part['Global']]
          : part['Global']
      ),
    [ links, part, region ],
  )

  const normalizedLinks = useMemo<RegionalLinkObject[]>(
    () => currentLinks.map((link) => normalizeLink(link)),
    [currentLinks],
  )

  return (
    <>
      {
        normalizedLinks
          .map<React.ReactNode>((link, index) => {
            const url = link.url
            const partSuffix = link.suffix
            const partName = getWebsiteTitle(link) + (partSuffix ? `\u00A0(${partSuffix})` : '')

            return (
              <Link key={index} to={url} target={'_blank'}>
                {partName}
                { (region !== 'Global' && isGlobalLink(link, part)) && '\u00A0(Global)'}
              </Link>
            )
          })
          .reduce((prev, curr) => [prev, ', ', curr])
      }
    </>
  )
}

export default LinkList
