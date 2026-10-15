import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'city', 'engagementType', 'consentOnFile'], group: 'Social Proof' },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', index: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'city', type: 'text' },
    {
      name: 'engagementType',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Consultancy', value: 'consultancy' },
        { label: 'Training', value: 'training' },
        { label: 'Systems Development', value: 'systems-development' },
        { label: 'Branding', value: 'branding' },
        { label: 'Curriculum', value: 'curriculum' },
        { label: 'Franchise', value: 'franchise' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'consentOnFile',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Required before displaying the client name or logo publicly.' },
    },
  ],
}