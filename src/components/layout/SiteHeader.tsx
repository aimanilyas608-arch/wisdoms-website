import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export async function SiteHeader() {
  const payload = await getPayloadClient()

  const [nav, settings] = await Promise.all([
    payload.findGlobal({ slug: 'navigation' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const items: any[] = nav?.header?.length
    ? nav.header
    : [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about-us' },
        {
          label: 'Solutions',
          href: '/services',
          children: [
            { label: 'School Transformation', href: '/school-transformation' },
            { label: 'Our Services', href: '/services' },
            { label: 'Toolkits', href: '/toolkits' },
            { label: 'KINDRA', href: '/kindra' },
            { label: 'School ERP', href: '/school-erp' },
          ],
        },
        {
          label: 'Programs',
          href: '/training-development',
          children: [
            { label: 'AI for Schools', href: '/ai-for-schools' },
            { label: 'Training & Development', href: '/training-development' },
            { label: 'Wisdoms Prime', href: '/wisdoms-prime' },
          ],
        },
        { label: 'Clients', href: '/our-clients' },
        { label: 'Careers', href: '/careers-partnerships' },
        { label: 'Contact', href: '/contact-us' },
      ]

  const s = settings as any
  const siteName = s?.siteName ?? 'Wisdoms International'
  const logoUrl = s?.logo?.url ?? '/logo.png'

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={siteName}>
          <Image
            src={logoUrl}
            alt={`${siteName} logo`}
            width={56}
            height={56}
            className="h-10 w-auto object-contain md:h-11"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex" spellCheck={false}>
            <span className="text-base font-extrabold tracking-tight text-purple md:text-lg">
              WISDOMS
            </span>
            <span className="text-[0.6rem] font-medium tracking-[0.28em] text-charcoal/70">
              INTERNATIONAL
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item: any) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal/80 transition hover:bg-purple/5 hover:text-purple"
                >
                  {item.label}
                </Link>
              )
            }
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/80 transition group-hover:bg-purple/5 group-hover:text-purple"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-60 overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-2 shadow-xl ring-1 ring-black/5">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal/80 transition hover:bg-purple/5 hover:text-purple"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <Link
          href="/contact-us"
          className="hidden shrink-0 rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-dark lg:inline-flex"
        >
          Book a Consultation
        </Link>

        <details className="relative ml-auto lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-charcoal/10 px-3 py-2 text-sm font-medium">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </summary>

          <div className="fixed inset-0 top-0 z-40 mt-0 h-screen w-full overflow-y-auto bg-white p-6 pt-20 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {items.map((item: any) => {
                const hasChildren = Array.isArray(item.children) && item.children.length > 0
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-base font-semibold text-charcoal transition hover:bg-purple/5 hover:text-purple"
                    >
                      {item.label}
                    </Link>
                  )
                }
                return (
                  <div key={item.href} className="mt-1">
                    <Link
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-base font-semibold text-charcoal transition hover:bg-purple/5 hover:text-purple"
                    >
                      {item.label}
                    </Link>
                    <div className="ml-3 mt-1 border-l-2 border-purple/15 pl-3">
                      {item.children.map((child: any) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 transition hover:text-purple"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
              <Link
                href="/contact-us"
                className="mt-4 rounded-xl bg-purple px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-purple-dark"
              >
                Book a Consultation
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}