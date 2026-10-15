import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load .env.local BEFORE anything reads process.env
loadEnv({ path: path.resolve(dirname, '../.env.local') })

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Services } from './payload/collections/Services'
import { Toolkits } from './payload/collections/Toolkits'
import { TrainingCategories } from './payload/collections/TrainingCategories'
import { Workshops } from './payload/collections/Workshops'
import { Diplomas } from './payload/collections/Diplomas'
import { AIPrograms } from './payload/collections/AIPrograms'
import { Clients } from './payload/collections/Clients'
import { Testimonials } from './payload/collections/Testimonials'
import { ImpactStats } from './payload/collections/ImpactStats'
import { CaseStudies } from './payload/collections/CaseStudies'
import { Forms } from './payload/collections/Forms'
import { Leads } from './payload/collections/Leads'
import { Pages } from './payload/collections/Pages'

import { SiteSettings } from './payload/globals/SiteSettings'
import { Navigation } from './payload/globals/Navigation'

// Sanity check — log what Payload is actually going to use
if (!process.env.DATABASE_URI) {
  console.error('❌ DATABASE_URI is not set. Check .env.local')
  process.exit(1)
}
console.log('✅ Payload config — DB host:', new URL(process.env.DATABASE_URI).hostname)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — Wisdoms International' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Pages, Services, Toolkits, TrainingCategories, Workshops,
    Diplomas, AIPrograms, Clients, Testimonials, ImpactStats,
    CaseStudies, Forms, Leads, Media, Users,
  ],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      ssl: { rejectUnauthorized: false },
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-me',
})