import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug'], group: 'Forms & Leads' },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'submitLabel', type: 'text', defaultValue: 'Submit' },
    { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you — we received your request.' },
    {
      name: 'fields',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true, admin: { description: 'Internal field key, no spaces — e.g. "fullName"' } },
        { name: 'label', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        { name: 'placeholder', type: 'text' },
        { name: 'required', type: 'checkbox', defaultValue: false },
        {
          name: 'options',
          type: 'array',
          admin: { condition: (_, s) => s?.type === 'select' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full width', value: 'full' },
            { label: 'Half width', value: 'half' },
          ],
        },
      ],
    },
    {
      name: 'notifyEmails',
      type: 'array',
      fields: [{ name: 'email', type: 'email', required: true }],
    },
  ],
}