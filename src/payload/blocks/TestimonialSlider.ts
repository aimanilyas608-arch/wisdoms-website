import type { Block } from 'payload'

export const TestimonialSlider: Block = {
  slug: 'testimonialSlider',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { description: 'Only approved testimonials will display.' },
    },
  ],
}