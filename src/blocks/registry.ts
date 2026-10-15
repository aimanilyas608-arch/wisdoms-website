import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

export const blockRegistry: Record<string, ComponentType<any>> = {
  hero: dynamic(() => import('./Hero')),
  impactStrip: dynamic(() => import('./ImpactStrip')),
  serviceGrid: dynamic(() => import('./ServiceGrid')),
  featureCards: dynamic(() => import('./FeatureCards')),
  pricingTable: dynamic(() => import('./PricingTable')),
  kpiList: dynamic(() => import('./KPIList')),
  roadmap: dynamic(() => import('./Roadmap')),
  faqBlock: dynamic(() => import('./FAQBlock')),
  cta: dynamic(() => import('./CTA')),
  richText: dynamic(() => import('./RichText')),
  gallery: dynamic(() => import('./Gallery')),
  testimonialSlider: dynamic(() => import('./TestimonialSlider')),
  logoStrip: dynamic(() => import('./LogoStrip')),
  founderNote: dynamic(() => import('./FounderNote')),
  twoColumn: dynamic(() => import('./TwoColumn')),
  noticeBanner: dynamic(() => import('./NoticeBanner')),
}