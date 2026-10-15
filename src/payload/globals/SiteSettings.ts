import type { GlobalConfig } from 'payload'
import { anyone, editorsAndUp } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'System' },
  access: { read: anyone, update: editorsAndUp },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Wisdoms International' },
    { name: 'websiteIdentity', type: 'text', defaultValue: 'Wisdoms One' },
    { name: 'subscriptionPlatform', type: 'text', defaultValue: 'Wisdoms Prime' },
    { name: 'tagline', type: 'text', defaultValue: 'Building Future-Ready Schools.' },
    { name: 'vision', type: 'textarea' },
    { name: 'mission', type: 'textarea' },
    { name: 'primaryEmail', type: 'email' },
    { name: 'primaryPhone', type: 'text' },
    { name: 'whatsapp', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'officeHours', type: 'text' },
    { name: 'mapEmbedUrl', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X', value: 'x' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
