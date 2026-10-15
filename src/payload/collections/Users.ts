import type { CollectionConfig } from 'payload'
import { adminOnly, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'System',
  },
  access: {
    read: authenticated,
    create: adminOnly,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Sales', value: 'sales' },
      ],
    },
  ],
}