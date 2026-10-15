import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export async function SiteFooter() {
  const payload = await getPayloadClient()

  const [nav, settings] = await Promise.all([
    payload.findGlobal({ slug: 'navigation' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const s = settings as any
  const siteName = s?.siteName ?? 'Wisdoms International'
  const logoUrl = s?.logo?.url ?? '/logo.png'

  // Fixed professional footer — grouped regardless of how many header items exist
  const columns = [
    {
      title: 'Solutions',
      links: [
        { label: 'School Transformation', href: '/school-transformation' },
        { label: 'Our Services', href: '/services' },
        { label: 'Toolkits', href: '/toolkits' },
        { label: 'KINDRA', href: '/kindra' },
        { label: 'School ERP', href: '/school-erp' },
      ],
    },
    {
      title: 'Programs',
      links: [
        { label: 'AI for Schools', href: '/ai-for-schools' },
        { label: 'Training & Development', href: '/training-development' },
        { label: 'Wisdoms Prime', href: '/wisdoms-prime' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Our Clients', href: '/our-clients' },
        { label: 'Careers & Partnerships', href: '/careers-partnerships' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
    },
  ]

  return (
    <footer className="border-t border-charcoal/5 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logoUrl}
                alt={`${siteName} logo`}
                width={64}
                height={64}
                className="h-14 w-auto object-contain md:h-16"
              />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-purple md:text-2xl">
                  WISDOMS
                </span>
                <span className="text-[0.7rem] font-medium tracking-[0.35em] text-charcoal/70 md:text-sm">
                  INTERNATIONAL
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/70">
              {s?.tagline ?? 'Building Future-Ready Schools.'}
            </p>
            <div className="mt-6 space-y-1.5 text-sm text-charcoal/80">
              {s?.address && <p>{s.address}</p>}
              {s?.primaryPhone && (
                <p>
                  <a href={`tel:${s.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-purple">
                    {s.primaryPhone}
                  </a>
                </p>
              )}
              {s?.primaryEmail && (
                <p>
                  <a href={`mailto:${s.primaryEmail}`} className="hover:text-purple">
                    {s.primaryEmail}
                  </a>
                </p>
              )}
              {s?.officeHours && <p className="text-xs text-charcoal/60">{s.officeHours}</p>}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal/60">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-charcoal/80 transition hover:text-purple">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-charcoal/10 pt-6 text-xs text-charcoal/50 sm:flex-row">
          <p>
            {nav?.footerCopyright ??
              `© ${new Date().getFullYear()} Wisdoms International. All rights reserved.`}
          </p>
          <p className="flex gap-4">
            <Link href="/contact-us" className="hover:text-purple">Contact</Link>
            <Link href="/careers-partnerships" className="hover:text-purple">Careers</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}