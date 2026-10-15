import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'
import { Hero } from '../blocks/Hero'
import { RichTextBlock } from '../blocks/RichText'
import { CTABlock } from '../blocks/CTA'
import { ImpactStrip } from '../blocks/ImpactStrip'
import { ServiceGrid } from '../blocks/ServiceGrid'
import { FeatureCards } from '../blocks/FeatureCards'
import { PricingTable } from '../blocks/PricingTable'
import { KPIList } from '../blocks/KPIList'
import { Roadmap } from '../blocks/Roadmap'
import { FAQBlock } from '../blocks/FAQBlock'
import { Gallery } from '../blocks/Gallery'
import { TestimonialSlider } from '../blocks/TestimonialSlider'
import { LogoStrip } from '../blocks/LogoStrip'
import { FounderNote } from '../blocks/FounderNote'
import { TwoColumn } from '../blocks/TwoColumn'
import { NoticeBanner } from '../blocks/NoticeBanner'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path. Use "home" for the homepage.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Reserved (Coming Soon)', value: 'pending-content' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
      minRows: 0,
      blocks: [
        Hero, ImpactStrip, ServiceGrid, FeatureCards, PricingTable, KPIList,
        Roadmap, FAQBlock, CTABlock, RichTextBlock, Gallery, TestimonialSlider,
        LogoStrip, FounderNote, TwoColumn, NoticeBanner,
      ],
    },
  ],
}