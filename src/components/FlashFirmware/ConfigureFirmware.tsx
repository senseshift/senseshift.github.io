import React, { FC, MouseEventHandler, useCallback } from "react"
import { components as Components } from '@octokit/openapi-types'

import Button from '../Button'
import Select from '../Select'

type Release = Components["schemas"]["release"]
type Asset = Components["schemas"]["release-asset"]

interface ConfigureFirmware {
  releases: Release[]
  selectedRelease?: Release["tag_name"]
  onSelectRelease?: (tag: Release["tag_name"]) => void

  assets?: Asset[]
  selectedAsset?: Asset['node_id']
  onSelectAsset?: (asset: Asset['node_id']) => void

  onSubmit?: (tag: Release["tag_name"], asset: Asset['node_id']) => void
}

const ConfigureFirmware: FC<ConfigureFirmware> = (props) => {
  const { releases, selectedRelease, onSelectRelease, assets, selectedAsset, onSelectAsset, onSubmit } = props

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>>(
    (e) => {
      e.preventDefault()
      onSubmit && onSubmit(selectedRelease, selectedAsset)
    },
    [onSubmit, selectedRelease, selectedAsset]
  )

  return (
    <div className='tw-grid tw-grid-cols-1 tw-gap-6'>
      <label className='tw-block'>
        Select version:
        <Select
          id="version"
          className='tw-block tw-w-full tw-mt-1'
          value={selectedRelease}
          onChange={(e) => { onSelectRelease && onSelectRelease(e.target.value) }}
        >
          { releases && releases.map((release) => {
            return (
              <option key={`release-${release.id}`} value={release.tag_name}>{release.tag_name}</option>
            )
          }) }
        </Select>
      </label>
      <label className='tw-block'>
        Select firmware:
        <Select
          id="binary"
          className='tw-block tw-w-full tw-mt-1'
          value={selectedAsset}
          onChange={(e) => { onSelectAsset && onSelectAsset(e.target.value) }}
        >
          { assets && assets.map((asset) => {
            return (
              <option key={`asset-${asset.id}`} value={asset.node_id}>{asset.name}</option>
            )
          })}
        </Select>
      </label>

      <div>
        <div className='mt-2'>
          <Button
            className='tw-block tw-w-full tw-mt-1'
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfigureFirmware
