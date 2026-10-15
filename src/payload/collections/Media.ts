import type { CollectionConfig } from 'payload'
import { editorsAndUp } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumb', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  access: {
    read: () => true,
    create: editorsAndUp,
    update: editorsAndUp,
    delete: editorsAndUp,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text' },
    {
      name: 'consentConfirmed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Required for photos of real people (children, staff, clients).',
      },
    },
  ],
}