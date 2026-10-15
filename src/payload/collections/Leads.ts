import type { CollectionConfig } from 'payload'
import { adminOnly, salesAndUp } from '../access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'formSlug', 'status', 'createdAt'],
    group: 'Forms & Leads',
  },
  access: {
    read: salesAndUp,
    create: () => true,
    update: salesAndUp,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'formSlug', type: 'text', required: true, index: true },
    { name: 'data', type: 'json', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Meeting Scheduled', value: 'meeting-scheduled' },
        { label: 'Proposal Sent', value: 'proposal-sent' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignee',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    { name: 'source', type: 'text', admin: { readOnly: true } },
    {
      name: 'notes',
      type: 'array',
      fields: [
        { name: 'author', type: 'relationship', relationTo: 'users' },
        { name: 'body', type: 'textarea', required: true },
        { name: 'at', type: 'date', defaultValue: () => new Date().toISOString() },
      ],
    },
  ],
}
