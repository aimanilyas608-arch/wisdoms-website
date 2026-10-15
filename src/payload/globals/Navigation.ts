import type { GlobalConfig } from 'payload'
import { anyone, editorsAndUp } from '../access'

const navItemFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
  {
    name: 'children',
    type: 'array' as const,
    fields: [
      { name: 'label', type: 'text' as const, required: true },
      { name: 'href', type: 'text' as const, required: true },
    ],
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: { group: 'System' },
  access: { read: anyone, update: editorsAndUp },
  fields: [
    {
      name: 'header',
      type: 'array',
      fields: navItemFields,
    },
    {
      name: 'footer',
      type: 'array',
      fields: navItemFields,
    },
    { name: 'footerCopyright', type: 'text' },
  ],
}