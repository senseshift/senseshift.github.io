export interface FirmwareManifest {
  parts: {
    path: string
    offset: number
    data?: string
  }[]
}