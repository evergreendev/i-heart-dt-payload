import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateVideos } from './Videos/hooks/revalidateVideos'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: {
          contains: 'video',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Meet the Merchants',
          value: 'meet-the-merchants',
        },
        // Add more categories as needed
      ],
      defaultValue: 'meet-the-merchants',
    },
  ],
  hooks: {
    afterChange: [revalidateVideos],
  },
}
