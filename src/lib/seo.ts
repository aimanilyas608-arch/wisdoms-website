import type { Metadata } from 'next'

export function buildMetadata(page: any): Metadata {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wisdoms.example'
  const title = page?.seo?.metaTitle || page?.title || 'Wisdoms International'
  const description = page?.seo?.metaDescription ?? undefined
  const slug = page?.slug ?? ''
  const url = `${site}/${slug === 'home' ? '' : slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wisdoms International',
      images: page?.seo?.ogImage?.url ? [page.seo.ogImage.url] : [],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}