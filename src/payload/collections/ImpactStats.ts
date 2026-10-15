import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const ImpactStats: CollectionConfig = {
  slug: 'impact-stats',
  admin: { useAsTitle: 'label', defaultColumns: ['label', 'value', 'verified'], group: 'Social Proof' },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Educational Institutions Served"' } },
    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "500+"' } },
    { name: 'asOf', type: 'text', admin: { description: 'e.g. "October 2026"' } },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Only verified stats render when source is "collection"' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}