import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Workshops: CollectionConfig = {
  slug: 'workshops',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'order'],
    group: 'Training',
  },
  versions: { drafts: true },
  access: {
    read: anyone,
    create: editorsAndUp,
    update: editorsAndUp,
    delete: adminOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'training-categories',
      required: true,
    },
    {
      name: 'duration',
      type: 'select',
      defaultValue: 'one-day',
      options: [
        { label: 'One-day workshop', value: 'one-day' },
        { label: 'Three-day intensive', value: 'three-day' },
        { label: 'Five-day bootcamp', value: 'five-day' },
        { label: 'Long program', value: 'long' },
      ],
    },
    { name: 'description', type: 'textarea' },
    { name: 'topicsCovered', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}