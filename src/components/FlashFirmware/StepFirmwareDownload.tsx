import React, { useCallback, useEffect, useState, type FC } from 'react'
import { useDropzone } from 'react-dropzone'

import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js"

import Button from '../Button'

import type { FirmwareManifest } from './types'

const makeManifestFromArchive = async (archive: File): Promise<FirmwareManifest> => {
  if (archive.type !== 'application/x-zip-compressed') {
    return // TODO: display error
  }

  const reader = new ZipReader(new BlobReader(archive))
  const contents = await reader.getEntries()

  const manifestEntry = contents.find((e) => e.filename === 'manifest.json')
  if (!manifestEntry) {
    return
  }

  const manifest: FirmwareManifest = JSON.parse(await (await manifestEntry.getData(new BlobWriter())).text())

  for (const part of manifest.parts) {
    const binaryEntry = contents.find((e) => e.filename === part.path)
    const binary = await binaryEntry.getData(new BlobWriter())
    manifest.parts[manifest.parts.findIndex((p) => p.path === part.path)] = Object.assign({}, part, { binary })
  }

  return manifest
}

interface StepFirmwareDownloadProps {
  version: string,
  downloadUrl: string,
  onSubmit?: ({ manifest }: { manifest: FirmwareManifest }) => void
}
const StepFirmwareDownload: FC<StepFirmwareDownloadProps> = ({ version, downloadUrl, onSubmit }) => {
  const [ isProcessing, setIsProcessing ] = useState<boolean>(false)

  const onFileSelected = useCallback(
    async (files: File[]) => {
      setIsProcessing(true)

      if (!Array.isArray(files) || !files.length) {
        setIsProcessing(false)
        return
      }

      const manifest = await makeManifestFromArchive(files[0])

      setIsProcessing(false)

      onSubmit && onSubmit({ manifest })
    },
    []
  )

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: isProcessing,
    maxFiles: 1,
    accept: {
      'application/x-zip-compressed': ['.zip'],
    }
  })

  useEffect(() => { onFileSelected(acceptedFiles) }, [ acceptedFiles ])

  return (
    <div className='tw-flex tw-flex-col tw-space-y-6'>
      {/* If version < 0.5.0 */}
      <Button
        className="tw-block tw-w-full tw-mt-1 tw-text-center hover:tw-no-underline"
        href={downloadUrl}
        download
        target="_blank"
      >
        Download
      </Button>
      <div {...getRootProps({ className: 'tw-flex tw-justify-around tw-items-center tw-w-full tw-rounded tw-bg-gray-100 tw-p-4 tw-border-2 tw-border-gray-400 tw-border-dashed' })}>
        <input {...getInputProps()} />
        <p className='tw-m-0'>
          {
            isProcessing
              ? 'Processing...'
              : 'Drop downloaded firmware archive here, or click to select'
          }
        </p>
      </div>
    </div>
  )
}

export default StepFirmwareDownload
