import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'client', 'verified'], group: 'Social Proof' },
  versions: { drafts: true },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'client', type: 'relationship', relationTo: 'clients' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'challenge', type: 'textarea' },
    { name: 'workDone', type: 'textarea' },
    { name: 'results', type: 'textarea' },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}