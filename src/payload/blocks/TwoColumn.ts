import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const TwoColumn: Block = {
  slug: 'twoColumn',
  labels: { singular: 'Two Column', plural: 'Two Columns' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'leftType',
      type: 'select',
      defaultValue: 'richText',
      options: [
        { label: 'Rich Text', value: 'richText' },
        { label: 'Image', value: 'image' },
        { label: 'List', value: 'list' },
      ],
    },
    { name: 'leftRichText', type: 'richText', editor: lexicalEditor(), admin: { condition: (_, s) => s?.leftType === 'richText' } },
    { name: 'leftImage', type: 'upload', relationTo: 'media', admin: { condition: (_, s) => s?.leftType === 'image' } },
    { name: 'leftList', type: 'array', admin: { condition: (_, s) => s?.leftType === 'list' }, fields: [{ name: 'text', type: 'text' }] },
    {
      name: 'rightType',
      type: 'select',
      defaultValue: 'richText',
      options: [
        { label: 'Rich Text', value: 'richText' },
        { label: 'Image', value: 'image' },
        { label: 'List', value: 'list' },
      ],
    },
    { name: 'rightRichText', type: 'richText', editor: lexicalEditor(), admin: { condition: (_, s) => s?.rightType === 'richText' } },
    { name: 'rightImage', type: 'upload', relationTo: 'media', admin: { condition: (_, s) => s?.rightType === 'image' } },
    { name: 'rightList', type: 'array', admin: { condition: (_, s) => s?.rightType === 'list' }, fields: [{ name: 'text', type: 'text' }] },
    {
      name: 'ratio',
      type: 'select',
      defaultValue: '50-50',
      options: [
        { label: '50 / 50', value: '50-50' },
        { label: '60 / 40', value: '60-40' },
        { label: '40 / 60', value: '40-60' },
      ],
    },
  ],
}