import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    {
      name: 'overlay',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Gradient purple', value: 'gradient-purple' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'ghost'],
        },
      ],
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      options: ['left', 'center'],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'large',
      options: ['compact', 'medium', 'large'],
    },
  ],
}