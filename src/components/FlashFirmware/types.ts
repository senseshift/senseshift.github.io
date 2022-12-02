export interface FirmwareManifest {
  parts: {
    path: string
    offset: number
    binary?: Blob
  }[]
}