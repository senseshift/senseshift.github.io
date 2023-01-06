import React, { useMemo, type FC, type ReactNode } from 'react'
import Link from '@docusaurus/Link'
import { type Region, type RegionalPartLinks, type RegionalLink, type RegionalLinkArray } from '@site/src/verified-parts'

const isGlobalLink = (link: RegionalLink, part: RegionalPartLinks): boolean => part['Global'].includes(link)

export interface ILinkListProps {
  part?: RegionalPartLinks
  region?: Region
  links?: RegionalLinkArray // At least 1 value
}

const LinkList: FC<ILinkListProps> = ({ links, part, region = 'Global' }) => {
  const currentLinks = useMemo<RegionalLinkArray>(
    () => links ?? (region !== 'Global' && part[region]) ? [...part[region], ...part['Global']] : part['Global'],
    [ links, part, region ],
  )

  return (
    <>
      {
        currentLinks
          .map<React.ReactNode>((link, index) => {
            const url = Array.isArray(link) ? link[1] : link
            const titleSuffix = Array.isArray(link) ? link[0] : undefined
            const title = getWebsiteTitle(link) + (titleSuffix ? `\u00A0(${titleSuffix})` : '')

            return (
              <Link key={index} to={url} target={'_blank'}>
                {title}
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
