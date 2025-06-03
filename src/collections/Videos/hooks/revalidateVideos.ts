import type { CollectionAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

import type { Video } from '@/payload-types'

export const revalidateVideos: CollectionAfterChangeHook<Video> = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating videos cache with tag: videos`)
  revalidateTag('videos')

  return doc
}
