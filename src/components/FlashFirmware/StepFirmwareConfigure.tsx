import React, { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Octokit } from '@octokit/core'
import { components as Components } from '@octokit/openapi-types'
import { compareVersions } from 'compare-versions'

import Button from '@site/src/components/Button'
import Select from '@site/src/components/Select'

type Release = Components["schemas"]["release"]
type Asset = Components["schemas"]["release-asset"]

interface StepFirmwareConfigureProps {
  onSubmit?: (value: { version: Release["tag_name"], asset: Asset['node_id'], downloadUrl: string }) => void
}

const StepFirmwareConfigure: FC<StepFirmwareConfigureProps> = ({ onSubmit }) => {
  const octokit = useRef(new Octokit())
  const { isInitialLoading, data: releasesData } = useQuery({
    queryKey: ['openhaptics-firmware', 'releases'],
    queryFn: async () => (await octokit.current.request('GET /repos/{owner}/{repo}/releases', { owner: 'openhaptics', repo: 'openhaptics-firmware' })).data,
    refetchOnWindowFocus: false,
  })

  const releases = useMemo<Release[]>(
    () => releasesData?.filter(({ tag_name }) => compareVersions(tag_name, '0.1.3') >= 0),
    [ releasesData ]
  )
  const [ selectedTag, selectTag ] = useState<string>()
  useEffect(() => releases && selectTag(releases[0].tag_name), [ releases ]) // Select tag on initial load

  const assets = useMemo<Asset[]>(
    () => releases && selectedTag && releases.find((release) => release.tag_name === selectedTag)?.assets,
    [ releases, selectedTag ]
  )
  const [ selectedAsset, selectAsset ] = useState<string>()
  useEffect(() => Array.isArray(assets) && assets.length && selectAsset(assets[0].node_id), [ assets ]) // Select binary on tag changed

  const downloadUrl = useMemo<string>(() => releases?.find(r => r.tag_name === selectedTag)?.assets?.find(r => r.node_id === selectedAsset)?.browser_download_url, [ releases, selectedTag, selectedAsset ])

  const handleSubmit = () => {
    if (!selectTag || !selectAsset) {
      return
    }
    onSubmit && onSubmit({ version: selectedTag, asset: selectedAsset, downloadUrl })
  };

  return (
    <div className='tw-flex tw-flex-col tw-space-y-6'>
      <label className='tw-block'>
        Select version:
        <Select
          id="version"
          className='tw-block tw-w-full tw-mt-1'
          value={selectedTag}
          onChange={(e) => { selectTag(e.target.value) }}
        >
          { releases && releases.map((release) => {
            return (
              <option key={`release-${release.id}`} value={release.tag_name}>{release.tag_name}</option>
            )
          }) }
        </Select>
      </label>

      {/* If version >= 0.1.3 && < 0.5.0  */}
      {/* TODO: later create advanced configurator */}
      <label className='tw-block'>
        Select firmware:
        <Select
          id="binary"
          className='tw-block tw-w-full tw-mt-1'
          value={selectedAsset}
          onChange={(e) => { selectAsset(e.target.value) }}
        >
          { assets && assets.map((asset) => {
            return (
              <option key={`asset-${asset.id}`} value={asset.node_id}>{asset.name}</option>
            )
          })}
        </Select>
      </label>

      <Button
        className='tw-block tw-w-full tw-mt-3'
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </div>
  )
}

export default StepFirmwareConfigure
