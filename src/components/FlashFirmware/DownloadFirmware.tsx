import React, { type ChangeEventHandler, useCallback, type FC } from 'react'
import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js"

import Button from '../Button'

interface Manifest {
  parts: {
    path: string
    offset: number
    binary?: Blob
  }[]
}

interface Props {
  downloadUrl?: string
  onSubmit?: (manifest: Manifest) => void
}

const DownloadFirmware: FC<Props> = ({ downloadUrl, onSubmit }) => {
  const onFileSelected = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const files = e.target.files
      const archive = files[0]

      if (archive.type !== 'application/x-zip-compressed') {
        return
      }

      const reader = new ZipReader(new BlobReader(archive))
      const contents = await reader.getEntries()

      const manifestEntry = contents.find((e) => e.filename === 'manifest.json')
      if (!manifestEntry) {
        return
      }

      const manifest: Manifest = JSON.parse(await (await manifestEntry.getData(new BlobWriter())).text())

      for (const part of manifest.parts) {
        const binaryEntry = contents.find((e) => e.filename === part.path)
        const binary = await binaryEntry.getData(new BlobWriter())
        manifest.parts[manifest.parts.findIndex((p) => p.path === part.path)] = Object.assign({}, part, { binary })
      }

      onSubmit && onSubmit(manifest)
    },
    []
  )

  return (
    <>
      <Button className="tw-block tw-w-full tw-mt-1" href={downloadUrl} target="_blank" download>Download</Button>
      <input type="file" onChange={onFileSelected} />
    </>
  )
}

export default DownloadFirmware
