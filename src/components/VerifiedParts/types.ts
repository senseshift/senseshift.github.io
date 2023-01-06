import verifiedParts, { type VerifiedParts as IVerifiedParts, type Region } from '@site/src/verified-parts'

export type IPartName<P extends IVerifiedParts = typeof verifiedParts> = keyof P & string
export type IPartWithQty<P extends IVerifiedParts = typeof verifiedParts> = [IPartName<P>, number]
export interface IPartObject<P extends IVerifiedParts = typeof verifiedParts> {
  partName: IPartName<P>
  qty?: number
}

export type IPart<P extends IVerifiedParts = typeof verifiedParts> = IPartName<P> | IPartWithQty<P> | IPartObject<P>
