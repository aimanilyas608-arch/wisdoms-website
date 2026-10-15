import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'order'],
    group: 'Content',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path segment, e.g. new-school-setup' },
    },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroSubheading', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'price', type: 'text', admin: { description: 'e.g. "PKR 100,000" or "Custom proposal"' } },
    { name: 'priceNote', type: 'text' },
    {
      name: 'whatWeDo',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'howItWorks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'scopeNote', type: 'textarea' },
    { name: 'whoThisIsFor', type: 'textarea' },
    {
      name: 'ctas',
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
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}