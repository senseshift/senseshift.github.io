import React, {
  useMemo,
  useState,
} from 'react'

import Select from '../Select'

import verifiedParts, {
  type VerifiedParts as IVerifiedParts,
  type Region,
  RegionalLinkArray,
} from '@site/src/verified-parts'

import { normalizePart } from './utils'
import type { IPart, IPartObject } from './types'
import PartRow from './PartRow'

export interface IVerifiedPartsProps<P extends IVerifiedParts> {
  parts: IPart<P>[]
  allParts: P
}

const VerifiedParts = <P extends IVerifiedParts = typeof verifiedParts>(
  { parts, allParts = verifiedParts }: IVerifiedPartsProps<P>
) => {
  const [region, setRegion] = useState<Region>('Global')

  const normalizedParts = useMemo<IPartObject<P>[]>(
    () => parts.map((part) => normalizePart(part)),
    [ parts ],
  )

  const partNames = useMemo<string[]>(
    () => normalizedParts.map((part) => part.partName),
    [ normalizedParts ]
  )

  const currentParts = useMemo(
    () => Object.fromEntries(
      Object.entries(allParts).filter(([ key ]) => partNames.includes(key))
    ),
    [ allParts, parts ],
  )

  const regions: Region[] = useMemo(
    () => [...new Set<Region>(
      Object.values(currentParts)
        .flatMap((part) => Object.keys(part) as Region[])
    )],
    [ currentParts ],
  )

  return (
    <>
      <label className='tw-flex tw-flex-row tw-items-center tw-mb-2'>
        <span>Region:</span>
        <Select
          id="region"
          className='tw-inline-block tw-ml-4'
          value={region}
          onChange={(e) => { setRegion(e.target.value as Region) }}
        >
          { regions.map((region) => <option key={region} value={region}>{region}</option>) }
        </Select>
      </label>

      <table className='tw-table-auto tw-w-full tw-border-collapse'>
        <thead>
          <tr>
            <th className='tw-text-left'>Component</th>
            <th className='tw-text-left'>Choice</th>
            <th className='tw-text-right'>Amount</th>
            <th className='tw-text-right'>Cost&nbsp;per</th>
            <th className='tw-text-right'>Approx.&nbsp;cost&nbsp;<small>(w\&nbsp;shipping)</small></th>
            <th className='tw-text-left'>Quick&nbsp;Link</th>
          </tr>
        </thead>
        <tbody>
          { normalizedParts.map(({ partName, qty = 1}) => {
            const links = (region !== 'Global' && currentParts[partName][region])
              ? [...currentParts[partName]['Global'], ...currentParts[partName][region]] as RegionalLinkArray
              : currentParts[partName]['Global']

            return (
              <PartRow
                partName={partName}
                qty={qty}
                links={links}
              />
            )
          }) }
        </tbody>
      </table>
    </>
  )
}

export default VerifiedParts