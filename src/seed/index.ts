import { getPayload } from 'payload'
import config from '../payload.config'

const payload = await getPayload({ config })

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function exists(collection: any, slug: string) {
  const { totalDocs } = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 0,
  })
  return totalDocs > 0
}

async function upsertPage(slug: string, data: any) {
  try {
    if (await exists('pages', slug)) {
      console.log(`  ↺ Page exists: ${slug}`)
      return
    }
    await payload.create({ collection: 'pages', data: { slug, ...data } })
    console.log(`  ✓ Page: ${slug}`)
  } catch (err: any) {
    console.error(`  ✗ Page failed: ${slug} — ${err.message}`)
  }
}

async function upsertService(slug: string, data: any) {
  if (await exists('services', slug)) {
    console.log(`  ↺ Service exists: ${slug}`)
    return
  }
  await payload.create({ collection: 'services', data: { slug, ...data } })
  console.log(`  ✓ Service: ${slug}`)
}

async function upsertToolkit(slug: string, data: any) {
  if (await exists('toolkits', slug)) {
    console.log(`  ↺ Toolkit exists: ${slug}`)
    return
  }
  await payload.create({ collection: 'toolkits', data: { slug, ...data } })
  console.log(`  ✓ Toolkit: ${slug}`)
}

async function upsertTrainingCategory(slug: string, data: any) {
  if (await exists('training-categories', slug)) {
    console.log(`  ↺ Training category exists: ${slug}`)
    return
  }
  return await payload.create({ collection: 'training-categories', data: { slug, ...data } })
}

async function upsertAIProgram(slug: string, data: any) {
  if (await exists('ai-programs', slug)) {
    console.log(`  ↺ AI Program exists: ${slug}`)
    return
  }
  await payload.create({ collection: 'ai-programs', data: { slug, ...data } })
  console.log(`  ✓ AI Program: ${slug}`)
}

async function upsertDiploma(slug: string, data: any) {
  if (await exists('diplomas', slug)) {
    console.log(`  ↺ Diploma exists: ${slug}`)
    return
  }
  await payload.create({ collection: 'diplomas', data: { slug, ...data } })
  console.log(`  ✓ Diploma: ${slug}`)
}

// ─────────────────────────────────────────────────────────────
// 1. SITE SETTINGS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Site Settings')
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    siteName: 'Wisdoms International',
    websiteIdentity: 'Wisdoms One',
    subscriptionPlatform: 'Wisdoms Prime',
    tagline: 'Building Future-Ready Schools.',
    vision: 'To make every school a great school.',
    mission:
      'To build stronger schools through practical systems, professional development, innovative solutions and continuous institutional improvement.',
    primaryEmail: 'info@wisdomsone.com',
    primaryPhone: '+92 307 6480890',
    whatsapp: '+923076480890',
    address: '153H, H Block Market, DHA Phase 1, Lahore, Pakistan',
    officeHours: 'Monday–Saturday, 9:00 AM–6:00 PM (Pakistan Standard Time)',
    socials: [],
  } as any,
})
console.log('  ✓ Site settings saved')

// ─────────────────────────────────────────────────────────────
// 2. NAVIGATION
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Navigation')
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Services', href: '/services' },
  { label: 'School Transformation', href: '/school-transformation' },
  { label: 'Toolkits', href: '/toolkits' },
  { label: 'KINDRA', href: '/kindra' },
  { label: 'School ERP', href: '/school-erp' },
  { label: 'AI for Schools', href: '/ai-for-schools' },
  { label: 'Training & Development', href: '/training-development' },
  { label: 'Our Clients', href: '/our-clients' },
  { label: 'Wisdoms Prime', href: '/wisdoms-prime' },
  { label: 'Careers & Partnerships', href: '/careers-partnerships' },
  { label: 'Contact Us', href: '/contact-us' },
]

await payload.updateGlobal({
  slug: 'navigation',
  data: {
    header: navItems,
    footer: navItems.slice(0, 8),
    footerCopyright: `© ${new Date().getFullYear()} Wisdoms International. All rights reserved.`,
  } as any,
})
console.log('  ✓ Navigation saved')

// ─────────────────────────────────────────────────────────────
// 3. IMPACT STATS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Impact Stats')
const stats = [
  { label: 'Educational Institutions Served', value: '500+', order: 1 },
  { label: 'Cities Reached', value: '150+', order: 2 },
  { label: 'Institutional Visits', value: '1,500+', order: 3 },
  { label: 'Educators & Professionals Trained', value: '12,000+', order: 4 },
  { label: 'Training Sessions Delivered', value: '1,100+', order: 5 },
  { label: 'Operating Since', value: '2018', order: 6 },
]
for (const s of stats) {
  const { totalDocs } = await payload.find({
    collection: 'impact-stats',
    where: { label: { equals: s.label } },
    limit: 0,
  })
  if (totalDocs === 0) {
    await payload.create({
      collection: 'impact-stats',
      data: { ...s, asOf: 'October 2026', verified: false } as any,
    })
  }
}
console.log('  ✓ Impact stats saved')

// ─────────────────────────────────────────────────────────────
// 4. GENERAL INQUIRY FORM
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Forms')
if (!(await exists('forms', 'general-inquiry'))) {
  await payload.create({
    collection: 'forms',
    data: {
      title: 'General Inquiry',
      slug: 'general-inquiry',
      submitLabel: 'Send Inquiry',
      successMessage: 'Thank you — we received your request.',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, width: 'full' },
        { name: 'email', label: 'Email', type: 'email', required: true, width: 'half' },
        { name: 'phone', label: 'WhatsApp', type: 'tel', required: true, width: 'half' },
        { name: 'school', label: 'School / Organization', type: 'text', required: false, width: 'full' },
        { name: 'city', label: 'City', type: 'text', required: false, width: 'half' },
        {
          name: 'serviceCategory',
          label: 'What can we help with?',
          type: 'select',
          required: true,
          width: 'half',
          options: [
            { label: 'School Transformation', value: 'school-transformation' },
            { label: 'Our Services', value: 'our-services' },
            { label: 'Toolkits', value: 'toolkits' },
            { label: 'KINDRA', value: 'kindra' },
            { label: 'School ERP', value: 'school-erp' },
            { label: 'AI for Schools', value: 'ai-for-schools' },
            { label: 'Training & Development', value: 'training' },
            { label: 'Wisdoms Prime', value: 'wisdoms-prime' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'message', label: 'Message', type: 'textarea', required: true, width: 'full' },
        {
          name: 'consent',
          label: 'I consent to Wisdoms International contacting me about this inquiry.',
          type: 'checkbox',
          required: true,
          width: 'full',
        },
      ],
      notifyEmails: [{ email: 'info@wisdomsone.com' }],
    } as any,
  })
  console.log('  ✓ General Inquiry form')
} else {
  console.log('  ↺ General Inquiry form exists')
}

// ─────────────────────────────────────────────────────────────
// 5. SERVICES
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Services')
const services = [
  {
    slug: 'new-school-setup',
    title: 'New School Setup & Launch',
    shortDescription: 'Support for founders planning a new school or preschool.',
    heroHeading: 'Plan. Establish. Launch.',
    heroSubheading: 'Support for founders planning a new school or preschool.',
    price: 'Custom proposal',
    scopeNote:
      'Actual regulatory approvals and construction are handled by appropriate authorities and qualified providers.',
    whatWeDo: [
      { item: 'Concept and feasibility review' },
      { item: 'School positioning' },
      { item: 'Startup roadmap' },
      { item: 'Academic and staffing structure' },
      { item: 'Operations and readiness checklists' },
      { item: 'Launch planning' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 1,
  },
  {
    slug: 'school-franchise-development',
    title: 'School Franchise System Development',
    shortDescription: 'Develop systems for consistent operations across a school network.',
    heroHeading: 'Build a School Model That Can Grow.',
    heroSubheading: 'Develop systems for consistent operations across a school network.',
    price: 'Custom proposal',
    scopeNote: 'Legal franchise documents require qualified legal review.',
    whatWeDo: [
      { item: 'Franchise concept and operating model' },
      { item: 'Standard policies' },
      { item: 'Brand and campus guidelines' },
      { item: 'Academic/management standards' },
      { item: 'Training and quality assurance model' },
      { item: 'Franchise implementation roadmap' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 2,
  },
  {
    slug: 'school-marketing-branding',
    title: 'School Marketing & Branding',
    shortDescription: 'Build stronger visibility, parent communication and admission campaigns.',
    heroHeading: 'Make Your School Easier to Discover and Choose.',
    heroSubheading: 'Build stronger visibility, parent communication and admission campaigns.',
    price: 'Custom proposal',
    scopeNote:
      'Advertising budgets and third-party media purchases are separate unless agreed.',
    whatWeDo: [
      { item: 'Brand positioning' },
      { item: 'Admission message and campaign planning' },
      { item: 'Social content strategy' },
      { item: 'School promotional materials' },
      { item: 'Lead follow-up process' },
      { item: 'Performance review' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 3,
  },
  {
    slug: 'registration-affiliation',
    title: 'School Registration & Affiliation Support',
    shortDescription:
      'Professional documentation and process support for applicable school registration or affiliation requirements.',
    heroHeading: 'Get Organized for Registration and Affiliation.',
    heroSubheading:
      'Professional documentation and process support for applicable school registration or affiliation requirements.',
    price: 'Custom proposal',
    scopeNote: 'Regulatory decisions and approval timelines are outside Wisdoms control.',
    whatWeDo: [
      { item: 'Requirement review' },
      { item: 'Documentation checklist' },
      { item: 'Application preparation assistance' },
      { item: 'Compliance readiness' },
      { item: 'Coordination and follow-up guidance' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 4,
  },
  {
    slug: 'curriculum-development',
    title: 'Curriculum Design & Development',
    shortDescription: 'Custom academic planning, curriculum organization and practical teaching resources.',
    heroHeading: 'A Curriculum Built Around Your School.',
    heroSubheading:
      'Custom academic planning, curriculum organization and practical teaching resources.',
    price: 'PKR 500,000',
    priceNote: 'Standard academic toolkit available separately at PKR 50,000',
    scopeNote:
      'Customized Primary & Middle textbook-wise curriculum and lesson-planning service. Other projects quoted separately.',
    whatWeDo: [
      { item: 'Curriculum mapping' },
      { item: 'Subject and grade structure' },
      { item: 'Academic breakups' },
      { item: 'Outcomes and assessment design' },
      { item: 'Lesson-planning resources' },
      { item: 'Implementation support' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 5,
  },
  {
    slug: 'school-rebranding',
    title: 'Complete School Rebranding & Redesign',
    shortDescription:
      'An end-to-end school brand identity and environment design consultancy.',
    heroHeading: 'Give Your School a Complete New Identity.',
    heroSubheading:
      'An end-to-end school brand identity and environment design consultancy.',
    price: 'PKR 100,000',
    priceNote: 'For agreed professional design/consultancy scope',
    scopeNote:
      'Printing, signage fabrication, furniture, construction and physical renovation are extra.',
    whatWeDo: [
      { item: 'Logo and identity' },
      { item: 'Color standards' },
      { item: 'Stationery and print design' },
      { item: 'Signage concepts' },
      { item: 'Campus and classroom design guidance' },
      { item: 'School presentation system' },
      { item: 'Rollout plan' },
    ],
    howItWorks: [
      { title: 'Discuss your requirements and school context' },
      { title: 'Agree scope, deliverables, timeline and commercial terms' },
      { title: 'Develop and review the proposed solutions' },
      { title: 'Handover agreed files, guidance and implementation steps' },
    ],
    whoThisIsFor:
      'School owners, founders, institutional leaders and school networks seeking focused professional support.',
    ctas: [
      { label: 'Request a Proposal', href: '/contact-us', variant: 'primary' },
      { label: 'Book Consultation', href: '/contact-us', variant: 'ghost' },
    ],
    order: 6,
  },
]

for (const s of services) await upsertService(s.slug, s)

// ─────────────────────────────────────────────────────────────
// 6. TOOLKITS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Toolkits')
const toolkits = [
  {
    slug: 'school-sops-kit',
    title: '300 School SOPs Kit',
    shortDescription: '300 practical SOPs across 30 school management domains.',
    heroHeading: '300 School SOPs Kit',
    heroSubheading:
      'Clear processes, responsibilities, controls and implementation guidance.',
    price: 50000,
    priceLabel: 'One-time toolkit purchase. Online implementation training included.',
    whatSchoolReceives: [
      { item: '300 standard operating procedures organized by school domains' },
      { item: 'Procedures for academic, administrative and operational consistency' },
      { item: 'Practical guidance for assigning responsibilities and monitoring implementation' },
    ],
    feeNote:
      'The agreed digital delivery list and license terms are shared during purchase.',
    ctas: [
      { label: 'Request Toolkit', href: '/contact-us', variant: 'primary' },
      { label: 'Explore Complete Bundle', href: '/toolkits', variant: 'ghost' },
    ],
    bundleEligible: true,
    order: 1,
  },
  {
    slug: 'annual-school-planning',
    title: 'Annual School Planning System',
    shortDescription:
      'Plan the school year with a structured calendar and event execution resources.',
    heroHeading: 'Annual School Planning System',
    heroSubheading:
      'Annual calendar, activities, responsibility plans, step-by-step execution guidance and video support.',
    price: 50000,
    priceLabel: 'One-time toolkit purchase. Online implementation training included.',
    whatSchoolReceives: [
      { item: 'Annual school planning structure and calendar' },
      { item: 'School activities, events and execution guides' },
      { item: 'Guidance on what to do, when, why and how' },
      { item: 'Implementation videos or video guidance where provided' },
    ],
    feeNote:
      'The agreed digital delivery list and license terms are shared during purchase.',
    ctas: [
      { label: 'Request Toolkit', href: '/contact-us', variant: 'primary' },
      { label: 'Explore Complete Bundle', href: '/toolkits', variant: 'ghost' },
    ],
    bundleEligible: true,
    order: 2,
  },
  {
    slug: 'future-skills',
    title: 'Future Skills Program',
    shortDescription:
      'A ready-to-implement future skills learning framework from Play Group to Grade 12.',
    heroHeading: 'A ready-to-implement future skills learning framework from Play Group to Grade 12.',
    heroSubheading:
      'Grade-wise teaching plans across life skills, AI and IT, STEAM, communication, health, finance, home economics and social ethics.',
    price: 50000,
    priceLabel: 'One-time toolkit purchase. Online implementation training included.',
    whatSchoolReceives: [
      { item: 'Grade-wise skills learning framework, Play Group to Grade 12' },
      { item: 'Eight learning domains and planned classroom activities' },
      { item: 'Curriculum and lesson-plan resources according to purchased inventory' },
      { item: 'Implementation guidance for schools' },
    ],
    feeNote:
      'The agreed digital delivery list and license terms are shared during purchase.',
    ctas: [
      { label: 'Request Toolkit', href: '/contact-us', variant: 'primary' },
      { label: 'Explore Complete Bundle', href: '/toolkits', variant: 'ghost' },
    ],
    bundleEligible: true,
    order: 3,
  },
  {
    slug: 'kindra',
    title: 'KINDRA Early Learning Framework',
    shortDescription: 'A complete preschool learning and implementation framework.',
    heroHeading: 'KINDRA — A Complete Early Learning Framework.',
    heroSubheading:
      'A structured preschool development approach designed around learning, play, teacher preparation, classroom systems and quality monitoring. Three progressive levels: Roots, Wings and Shine.',
    price: 100000,
    priceLabel: 'One-time framework purchase.',
    whatSchoolReceives: [
      { item: 'Complete curriculum architecture and teaching resources' },
      { item: 'Teacher and parent manuals' },
      { item: 'Classroom schedules and teaching materials' },
      { item: 'SOPs and child safeguarding' },
      { item: 'Observation and assessment' },
      { item: 'School rollout, training and quality review' },
    ],
    feeNote:
      'Existing core framework includes 27 structured booklets in editable and print formats, with separate operational monitoring resources supplied according to the final licensed 29-file package.',
    ctas: [
      { label: 'Purchase Framework', href: '/contact-us', variant: 'primary' },
      { label: 'Explore Support Plans', href: '/kindra', variant: 'ghost' },
    ],
    bundleEligible: true,
    order: 4,
  },
  {
    slug: 'academic-excellence',
    title: 'Primary & Middle Academic Excellence Framework',
    shortDescription:
      'Standard academic development system for primary and middle schools.',
    heroHeading: 'Primary & Middle Academic Excellence Framework',
    heroSubheading:
      'Academic policies, quality routines, planning frameworks, assessment and teaching guidance.',
    price: 50000,
    priceLabel: 'One-time toolkit purchase. Online implementation training included.',
    whatSchoolReceives: [
      { item: 'School academic policies and standard practice guidance' },
      { item: 'Curriculum organization and subject-level policy frameworks' },
      { item: 'Academic planning, instructional improvement and assessment resources' },
      { item: 'Implementation checklists and sample tools' },
    ],
    feeNote:
      'This standard toolkit does not include a customized textbook-wise full curriculum and lesson-planning commission. That separate Primary & Middle service is priced at PKR 500,000.',
    ctas: [
      { label: 'Request Toolkit', href: '/contact-us', variant: 'primary' },
      { label: 'Explore Complete Bundle', href: '/toolkits', variant: 'ghost' },
    ],
    bundleEligible: true,
    order: 5,
  },
]

for (const t of toolkits) await upsertToolkit(t.slug, t)

// ─────────────────────────────────────────────────────────────
// 7. TRAINING CATEGORIES + WORKSHOPS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Training Categories')

const trainingData = [
  {
    slug: 'school-leaders',
    title: 'School Leaders & Principals',
    audience: 'School Leaders & Principals',
    heroHeading: 'Practical Training for School Leaders & Principals',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary:
      'PKR 9,000 per one-day seat · PKR 27,000 per three-day intensive · School Upgradation Bootcamp PKR 45,000',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    flagshipPrograms: [
      { title: 'School Upgradation Workshop', duration: '1 day', price: 'PKR 9,000/person', description: 'School scorecard and 90-day plan' },
      { title: 'School Upgradation Bootcamp', duration: '5 days', price: 'PKR 45,000/person', description: 'School upgradation blueprint' },
      { title: 'Principal Excellence Program', duration: '12 months online', price: 'Pricing pending', description: 'One school leadership theme and implementation task each month' },
    ],
    workshops: [
      'School Upgradation Workshop',
      "The Principal's 100-Day Action Plan",
      'Build a High-Performance School Team',
      'School Systems That Actually Work',
      'From Principal to Instructional Leader',
      'School Growth & Admissions Strategy Lab',
      'School Quality & Performance Audit',
      "The Principal's Leadership Intensive",
      'School Systems Implementation Bootcamp',
      'Academic Excellence Bootcamp',
      'School Growth Bootcamp',
    ],
    order: 1,
  },
  {
    slug: 'school-management',
    title: 'School Management & Academic Leadership',
    audience: 'School Management & Academic Leadership',
    heroHeading: 'Practical Training for School Management & Academic Leadership',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary: '12 one-day topics · PKR 4,900/person',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    workshops: [
      'The High-Performance Coordinator',
      'Academic Monitoring That Actually Works',
      'Timetable Without Chaos',
      'Lesson Plan Checking That Improves Teaching',
      'Classroom Observation to Teacher Improvement',
      'The Examination Control Room',
      'From Results to Student Improvement',
      'Staff Accountability Without Micromanagement',
      'Meetings That Produce Results',
      'Handling Difficult Parents Professionally',
      'Student Discipline Without Daily Firefighting',
      'The School Quality Walkthrough',
    ],
    order: 2,
  },
  {
    slug: 'school-teachers',
    title: 'School Teachers',
    audience: 'School Teachers',
    heroHeading: 'Practical Training for School Teachers',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary: '24 one-day topics · PKR 4,900/person',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    workshops: [
      'The 40-Minute Classroom Challenge',
      'Lesson Planning That Actually Works',
      'Teach Beyond the Textbook',
      'Classroom Management Without Shouting',
      'Every Student Participates',
      'Teach Mixed-Ability Classes with Confidence',
      'Ask Better Questions, Build Better Thinking',
      'Assessment Beyond Memorization',
      'Test Papers That Measure Real Learning',
      'Check Less, Give Better Feedback',
      'From Weak Results to Better Learning',
      'Homework That Actually Helps',
      'The Interactive Classroom Toolkit',
      'Experiential Learning Made Practical',
      'Project-Based Learning Without Confusion',
      'Teaching English Through Everyday Classroom Talk',
      'Improve Reading in Every Classroom',
      'Writing Skills Beyond Copywork',
      'Teaching Math for Understanding',
      'Science Without an Expensive Lab',
      'Create a Classroom Where Students Feel Safe',
      'Parent Communication Without Complaints',
      'Teaching with Digital Tools That Work',
      "The Teacher's Performance Makeover",
    ],
    order: 3,
  },
  {
    slug: 'early-years',
    title: 'Early Years Educators',
    audience: 'Early Years Educators',
    heroHeading: 'Practical Training for Early Years Educators',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary: '6 one-day topics · PKR 4,900/person',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    workshops: [
      'Play-Based Learning That Actually Teaches',
      'The Early Years Classroom Makeover',
      'Phonics to Early Reading',
      'Beyond Worksheets: Hands-On Preschool Learning',
      'Observe, Assess & Support Every Child',
      'From Tears to Confident Learners',
    ],
    order: 4,
  },
  {
    slug: 'administrative-staff',
    title: 'School Administrative Staff',
    audience: 'School Administrative Staff',
    heroHeading: 'Practical Training for School Administrative Staff',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary: '12 one-day topics · PKR 4,900/person',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    workshops: [
      'The Professional School Front Desk',
      'Turn Admissions Inquiries into Enrollments',
      'School Fee Collection Without Conflict',
      'School Office Management That Works',
      'Professional Parent Communication',
      'School Records Without Missing Files',
      'School Accounts & Financial Controls',
      'Student Admission, Transfer & Withdrawal Control',
      'The School HR Documentation System',
      'From Complaints to Parent Satisfaction',
      'Professional School Communication & Reporting',
      'The School Office Digital Productivity Lab',
    ],
    order: 5,
  },
  {
    slug: 'support-staff',
    title: 'School Support Staff',
    audience: 'School Support Staff',
    heroHeading: 'Practical Training for School Support Staff',
    heroSubheading:
      'Short, focused and implementation-led professional development. Each workshop is designed for a real school challenge and a usable work product.',
    priceSummary: '10 one-day topics · PKR 30,000/institutional session',
    whatParticipantsReceive:
      'Expert-led instruction, guided practice, practical activity, an implementation checklist and a Certificate of Participation for eligible attendance.',
    workshops: [
      'The Professional School Support Team',
      'Safe School Transport, Safe Children',
      'Child Care with Dignity & Safety',
      'A Clean School, A Healthy School',
      'School Gate Security & Visitor Control',
      'Student Arrival, Dispersal & Handover Safety',
      'The Professional Office Attendant',
      'Emergency Response & Incident Reporting',
      'Safe Cleaning, Equipment & Waste Handling',
      'Respectful Behavior & Child Safeguarding',
    ],
    order: 6,
  },
]

for (const cat of trainingData) {
  const { workshops: workshopTitles, ...catData } = cat
  const created = await upsertTrainingCategory(cat.slug, catData)
  const catId = created?.id ?? null
  if (!catId) continue

  for (let i = 0; i < workshopTitles.length; i++) {
    const wt = workshopTitles[i]
    const { totalDocs } = await payload.find({
      collection: 'workshops',
      where: { and: [{ title: { equals: wt } }, { category: { equals: catId } }] },
      limit: 0,
    })
    if (totalDocs === 0) {
      await payload.create({
        collection: 'workshops',
        data: { title: wt, category: catId, duration: 'one-day', order: i + 1 } as any,
      })
    }
  }
  console.log(`  ✓ ${cat.title} + ${workshopTitles.length} workshops`)
}

// ─────────────────────────────────────────────────────────────
// 8. AI PROGRAMS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ AI Programs')

await upsertAIProgram('ai-powered-school', {
  title: 'AI-Powered School Program',
  shortDescription:
    'Three full-day on-site sessions for school leadership, management and teachers.',
  heroHeading: 'Transform the Way Your School Works with AI.',
  heroSubheading:
    'Three days of on-site learning. Three months of implementation support. A practical AI launch for school leadership, management teams, teachers and students.',
  price: 'PKR 150,000 per school',
  priceNote: 'TA/DA and accommodation are additional.',
  format: 'Three full-day on-site sessions',
  dayBreakdown: [
    { label: 'Day 1 — Leadership & Management', description: 'School planning, documents, reporting, communications, data analysis, AI governance.' },
    { label: 'Day 2 — Teaching Faculty', description: 'Prompting, lesson plans, worksheets, assessment, student feedback and teacher productivity.' },
    { label: 'Day 3 — Implementation & Automation', description: 'Workflows, chatbot demonstrations, student curriculum rollout, AI days/events and 90-day priorities.' },
  ],
  deliverables: [
    { item: 'Grades 1-12 curriculum: 480 AI lesson plans and implementation guides' },
    { item: 'Three school chatbots configured for approved use cases' },
    { item: 'AI awareness days, competitions, exhibitions and activity execution guidance' },
    { item: 'AI-assisted improvement across routine school task categories' },
    { item: 'Three months of 24/7 message submission with priority replies in agreed support hours' },
    { item: 'Weekly AI-related updates through dedicated professional group' },
  ],
  ctas: [
    { label: 'Book School AI Training', href: '/contact-us', variant: 'primary' },
    { label: 'Request Proposal', href: '/contact-us', variant: 'ghost' },
  ],
  order: 1,
})

await upsertAIProgram('ai-teacher-certification', {
  title: 'AI Teacher Certification',
  shortDescription:
    'Three-month, 12-module practical course for professional, personal and career-related AI skills.',
  heroHeading: 'Learn AI. Improve Your Teaching. Grow Your Career.',
  heroSubheading:
    'A three-month, assignment-based program for teachers and education professionals. Learn classroom AI, personal productivity, digital creation and ethical career opportunities.',
  price: 'PKR 15,000 live / PKR 7,000 recorded per teacher',
  priceNote: 'Online format. Certificate on successful completion.',
  format: 'Three months · 12 modules · Live or recorded',
  modules: [
    { title: 'AI Foundations & Prompting' },
    { title: 'AI Lesson Planning' },
    { title: 'Teaching Resources' },
    { title: 'Assessment & Feedback' },
    { title: 'Creative & Engaging Teaching' },
    { title: 'Classroom and Admin Productivity' },
    { title: 'Personal Productivity' },
    { title: 'Communication & Digital Content' },
    { title: 'Research & Verification' },
    { title: 'Career Development & Personal Branding' },
    { title: 'Ethical Additional Income Opportunities' },
    { title: 'Portfolio & Final Capstone' },
  ],
  certificationNote:
    'Issued after required learning participation/completion, assignments, AI portfolio and final competency assessment. No employment or earnings guarantee.',
  ctas: [
    { label: 'Join Live Batch', href: '/contact-us', variant: 'primary' },
    { label: 'Enroll in Recorded Program', href: '/contact-us', variant: 'ghost' },
  ],
  order: 2,
})

await upsertAIProgram('ai-curriculum-students', {
  title: 'AI Curriculum for Students',
  shortDescription:
    'A ready-to-teach AI curriculum for Grades 1-12 with 40 lessons per grade.',
  heroHeading: '12 Grades. 480 Lessons. One AI Learning Journey.',
  heroSubheading:
    'A ready-to-teach AI curriculum for Grades 1-12 with 40 lessons per grade, school implementation guidance and online teacher orientation.',
  price: 'PKR 30,000 per school',
  format: 'Grades 1-12 · 40 lessons per grade',
  deliverables: [
    { item: '12 grade-wise curriculum plans' },
    { item: '480 classroom lesson plans' },
    { item: 'School implementation guide' },
    { item: 'Teacher guide' },
    { item: 'Parent guide' },
    { item: 'AI classroom SOPs and responsible-use standards' },
    { item: 'Monitoring and evaluation guide' },
    { item: 'Online teacher orientation' },
  ],
  learningProgression: [
    { item: 'Grades 1-3: discover AI through familiar examples and safe habits.' },
    { item: 'Grades 4-5: explore guided creativity and introductory prompts.' },
    { item: 'Grades 6-8: apply AI responsibly, verify information and solve problems.' },
    { item: 'Grades 9-10: build subject-linked projects and analytical thinking.' },
    { item: 'Grades 11-12: innovate through research, ethical practice and projects.' },
  ],
  ctas: [
    { label: 'Get Curriculum', href: '/contact-us', variant: 'primary' },
    { label: 'Request Sample Lessons', href: '/contact-us', variant: 'ghost' },
  ],
  order: 3,
})

// ─────────────────────────────────────────────────────────────
// 9. DIPLOMAS
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Diplomas')

await upsertDiploma('school-leadership-management', {
  title: 'Professional Diploma in School Leadership & Management',
  duration: 'Six months · 12 modules',
  shortDescription: 'Practical tasks, reflective learning and a final portfolio.',
  heroHeading: 'Professional Diploma in School Leadership & Management',
  modules: [
    { title: 'School Leadership Diagnostic' },
    { title: 'Strategic School Planning' },
    { title: 'Roles & Accountability' },
    { title: 'Academic Leadership' },
    { title: 'Teacher Performance' },
    { title: 'School SOPs & Operations' },
    { title: 'Assessment & Student Achievement' },
    { title: 'Admissions & Parent Experience' },
    { title: 'School Finance' },
    { title: 'Safeguarding & School Culture' },
    { title: 'Quality Assurance & Innovation' },
    { title: 'School Improvement Capstone' },
  ],
  feeStatus: 'Fees, delivery schedule and award criteria to be confirmed before enrollment.',
  order: 1,
})

await upsertDiploma('teaching-excellence', {
  title: 'Professional Diploma in Teaching Excellence',
  duration: 'Six months · 12 modules',
  shortDescription: 'Practical tasks, reflective learning and a final portfolio.',
  heroHeading: 'Professional Diploma in Teaching Excellence',
  modules: [
    { title: 'Professional Teacher Standards' },
    { title: 'Outcomes & Lesson Design' },
    { title: 'Student-Centered Methods' },
    { title: 'Classroom Culture' },
    { title: 'Differentiated Teaching' },
    { title: 'Questioning & Thinking' },
    { title: 'Assessment & Feedback' },
    { title: 'Experiential Learning' },
    { title: 'Literacy, Numeracy & Subject Practice' },
    { title: 'Educational Technology' },
    { title: 'Professional Reflection' },
    { title: 'Classroom Transformation Capstone' },
  ],
  feeStatus: 'Fees, delivery schedule and award criteria to be confirmed before enrollment.',
  order: 2,
})

await upsertDiploma('early-childhood-education', {
  title: 'Professional Diploma in Early Childhood Education',
  duration: 'Six months · 12 modules',
  shortDescription: 'Practical tasks, reflective learning and a final portfolio.',
  heroHeading: 'Professional Diploma in Early Childhood Education',
  modules: [
    { title: 'Child Development' },
    { title: 'Early Years Pedagogy' },
    { title: 'Play-Based Learning' },
    { title: 'Classroom Environment' },
    { title: 'Phonics & Early Literacy' },
    { title: 'Early Numeracy' },
    { title: 'Social & Emotional Learning' },
    { title: 'Daily Routines & Planning' },
    { title: 'Observation & Assessment' },
    { title: 'Inclusion & Safeguarding' },
    { title: 'Parent Engagement' },
    { title: 'Early Years Practice Capstone' },
  ],
  feeStatus: 'Fees, delivery schedule and award criteria to be confirmed before enrollment.',
  order: 3,
})

await upsertDiploma('positive-parenting', {
  title: 'Professional Diploma in Positive Parenting & Child Development',
  duration: 'Six months · 12 modules',
  shortDescription: 'Practical tasks, reflective learning and a final portfolio.',
  heroHeading: 'Professional Diploma in Positive Parenting & Child Development',
  modules: [
    { title: 'Understanding Child Development' },
    { title: 'Parenting Styles' },
    { title: 'Positive Discipline' },
    { title: 'Parent-Child Communication' },
    { title: 'Emotional Development' },
    { title: 'Confidence & Independence' },
    { title: 'Study Habits' },
    { title: 'Digital Parenting' },
    { title: 'Teenage Development' },
    { title: 'Child Wellbeing' },
    { title: 'Family Routines & Values' },
    { title: 'Family Development Capstone' },
  ],
  feeStatus: 'Fees, delivery schedule and award criteria to be confirmed before enrollment.',
  order: 4,
})

// ─────────────────────────────────────────────────────────────
// 10. HOMEPAGE
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Homepage')
await upsertPage('home', {
  title: 'Home',
  status: 'published',
  seo: {
    metaTitle: 'Wisdoms International — Building Future-Ready Schools',
    metaDescription:
      'Complete school development solutions from establishment to institutional excellence. Systems, training and transformation for schools across Pakistan.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Wisdoms International',
      heading: 'Building Future-Ready Schools.',
      subheading:
        'Complete School Development Solutions — From Establishment to Institutional Excellence. Wisdoms International helps schools build stronger systems, develop capable teams and improve institutional performance.',
      align: 'left',
      size: 'large',
      overlay: 'none',
      buttons: [
        { label: 'Explore Our Solutions', href: '/services', variant: 'primary' },
        { label: 'Book a Consultation', href: '/contact-us', variant: 'secondary' },
      ],
    },
    {
      blockType: 'impactStrip',
      eyebrow: 'Our Impact',
      heading: 'Our Journey in Numbers',
      intro: 'Since 2018, we have worked to strengthen educational institutions and education professionals.',
      source: 'collection',
      disclaimer: 'Company-reported cumulative figures (October 2026); pending verification.',
      cta: { label: 'Explore Our Clients', href: '/our-clients' },
    },
    {
      blockType: 'serviceGrid',
      eyebrow: 'Our Services',
      heading: 'Everything Your School Needs to Develop',
      intro: 'Six professional, project-based solutions for new and established schools.',
      source: 'services',
      columns: '3',
      cta: { label: 'Explore Services', href: '/services' },
    },
    {
      blockType: 'pricingTable',
      eyebrow: 'School Transformation',
      heading: 'Your Complete School Development Head Office.',
      intro:
        'One 12-month partnership. All 18 school development systems. A dedicated consultant, monthly campus visit, weekly online leadership meetings, implementation resources and training support.',
      style: 'single',
      price: 'PKR 50,000/month',
      period: '· 12-month engagement',
      totalNote: 'PKR 600,000 total',
      features: [
        { text: '18 development KPIs included' },
        { text: 'Training for leadership, teachers, parents and students' },
        { text: 'Social media support and planned monitoring' },
      ],
      primaryCta: { label: 'Explore School Transformation', href: '/school-transformation' },
      secondaryCta: { label: 'Request Proposal', href: '/contact-us' },
    },
    {
      blockType: 'serviceGrid',
      eyebrow: 'School Systems & Toolkits',
      heading: 'Ready-to-Implement Systems for Better Schools.',
      intro: 'Buy practical school development frameworks with online implementation training.',
      source: 'toolkits',
      columns: '3',
      cta: { label: 'Explore Toolkits', href: '/toolkits' },
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Specialized Solutions',
      heading: 'Explore More Ways to Develop Your School.',
      style: 'cards',
      columns: '4',
      items: [
        { title: 'KINDRA', description: 'Preschool framework and optional implementation partnerships.' },
        { title: 'School ERP', description: 'Digital school management information coming soon.' },
        { title: 'AI for Schools', description: 'Institutional AI, teacher certification and student curriculum.' },
        { title: 'Training & Development', description: 'Workshops, bootcamps and diplomas.' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Wisdoms Prime',
      heading: 'Your School Development Platform.',
      intro:
        'A fully paid subscription platform with Shorts, Masterclasses, Insights & Guides, Resource Vault, School Growth Planner, Prime AI and Research & Updates.',
      style: 'checklist',
      columns: '2',
      items: [
        { title: 'Shorts', description: 'Daily short school development videos.' },
        { title: 'Masterclasses', description: '30-minute detailed videos with documents.' },
        { title: 'Insights & Guides', description: 'Practical articles with resources.' },
        { title: 'Resource Vault', description: 'Library of SOPs, templates, policies and forms.' },
        { title: 'School Growth Planner', description: 'Plan school improvement and track progress.' },
        { title: 'Prime AI', description: 'AI assistant for school development.' },
        { title: 'Research & Updates', description: 'Education research and policy updates.' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Why Wisdoms?',
      heading: 'We Build Systems, Not Just Strategies.',
      style: 'icon-grid',
      columns: '3',
      items: [
        { title: 'Systems-driven solutions' },
        { title: 'Practical tools' },
        { title: 'Professional capacity building' },
        { title: 'Clear implementation support' },
        { title: 'Continuous improvement' },
      ],
    },
    {
      blockType: 'founderNote',
      eyebrow: 'Founder & Vision',
      heading: 'To make every school a great school.',
      quote:
        'Wisdoms International works towards better school leadership, systems, teaching and sustainable improvement.',
      name: 'Ahtsham ul Haq Wariyah',
      role: 'Founder & Managing Director',
      imagePosition: 'left',
      cta: { label: 'Meet Our Founder', href: '/about-us' },
    },
    {
      blockType: 'cta',
      heading: 'Ready to Build a Stronger School?',
      body: 'Tell us where your school needs help. Our team will guide you to the relevant service or program.',
      style: 'solid',
      buttons: [
        { label: 'Book a Consultation', href: '/contact-us', variant: 'primary' },
        { label: 'Contact Us', href: '/contact-us', variant: 'secondary' },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────
// 11. REMAINING PAGES
// ─────────────────────────────────────────────────────────────

console.log('\n▶ Remaining pages')

// ─── /services (index) ──────────────────────────────────────
await upsertPage('services', {
  title: 'Our Services',
  status: 'published',
  seo: {
    metaTitle: 'Our Services — Wisdoms International',
    metaDescription: 'Professional solutions for every stage of school development.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our Services',
      heading: 'Professional Solutions for Every Stage of School Development.',
      subheading:
        'Whether you are opening a school, developing a franchise, strengthening admissions or redesigning your school brand, Wisdoms International offers project-based consultancy and implementation planning.',
      align: 'left',
      size: 'medium',
      overlay: 'none',
      buttons: [
        { label: 'Discuss Your School Project', href: '/contact-us', variant: 'primary' },
      ],
    },
    {
      blockType: 'serviceGrid',
      eyebrow: 'Six Solutions',
      heading: 'Everything Your School Needs to Develop',
      intro: 'Six professional, project-based solutions for new and established schools.',
      source: 'services',
      columns: '3',
      cta: { label: 'Discuss Your Project', href: '/contact-us' },
    },
    {
      blockType: 'cta',
      heading: 'Not Sure Which Service Fits?',
      body: 'Tell us where your school needs help. We will point you to the right solution.',
      style: 'ivory',
      buttons: [{ label: 'Book a Consultation', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─── /toolkits (index) ──────────────────────────────────────
await upsertPage('toolkits', {
  title: 'Toolkits',
  status: 'published',
  seo: {
    metaTitle: 'School Systems & Toolkits — Wisdoms International',
    metaDescription:
      'Five practical school development frameworks with online implementation training.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Toolkits',
      heading: 'School Systems You Can Put to Work.',
      subheading:
        'Five practical school development toolkits with implementation guidance and online training. Choose one system or the complete bundle.',
      align: 'left',
      size: 'medium',
      buttons: [
        { label: 'Explore Toolkits', href: '#toolkits', variant: 'primary' },
        { label: 'Request Toolkit Advice', href: '/contact-us', variant: 'ghost' },
      ],
    },
    {
      blockType: 'serviceGrid',
      eyebrow: 'Individual Toolkits',
      heading: 'Five Systems. Choose Your Starting Point.',
      source: 'toolkits',
      columns: '3',
    },
    {
      blockType: 'pricingTable',
      eyebrow: 'Complete Bundle',
      heading: 'All Five Toolkits — PKR 200,000.',
      intro:
        'Buy all five for PKR 200,000 instead of PKR 300,000 individually. Save PKR 100,000. Online implementation training is included.',
      style: 'bundle',
      price: 'PKR 200,000',
      originalPrice: 'PKR 300,000',
      savings: 'Save PKR 100,000',
      features: [
        { text: '300 School SOPs Kit' },
        { text: 'Annual School Planning System' },
        { text: 'Future Skills Program' },
        { text: 'KINDRA Early Learning Framework' },
        { text: 'Primary & Middle Academic Excellence Framework' },
        { text: 'Online implementation training included' },
      ],
      primaryCta: { label: 'Buy Complete Bundle', href: '/contact-us' },
    },
    {
      blockType: 'roadmap',
      eyebrow: 'How Delivery Works',
      heading: 'Get Your Files. Learn the System. Start Implementation.',
      layout: 'horizontal',
      steps: [
        { label: 'Step 1', title: 'Confirm your purchase' },
        { label: 'Step 2', title: 'Receive authorized files and resources' },
        { label: 'Step 3', title: 'Attend online implementation guidance' },
        { label: 'Step 4', title: 'Start school-level rollout' },
      ],
    },
  ],
})

// ─── /training-development (index) ──────────────────────────
await upsertPage('training-development', {
  title: 'Training & Development',
  status: 'published',
  seo: {
    metaTitle: 'Training & Development — Wisdoms International',
    metaDescription:
      'One-day workshops, intensive programs and professional diplomas for school teams.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Training & Development',
      heading: 'Training That Turns Learning into Action.',
      subheading:
        'One-day workshops, focused intensive programs and professional diplomas for the people who make schools work. Every session aims to produce a usable plan, tool or improvement action.',
      align: 'left',
      size: 'medium',
      buttons: [
        { label: 'Explore Training', href: '#audiences', variant: 'primary' },
        { label: 'Book Institutional Training', href: '/contact-us', variant: 'ghost' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'How We Train',
      heading: 'Diagnose. Demonstrate. Practice. Produce. Implement.',
      intro:
        'Six-hour one-day workshops, open-enrollment sessions and school-specific training. Certificates of Participation for eligible one-day attendees.',
      style: 'numbered-list',
      columns: '3',
      items: [
        { title: 'Diagnose', description: 'Understand the real school challenge.' },
        { title: 'Demonstrate', description: 'Show what good looks like.' },
        { title: 'Practice', description: 'Apply it in the room.' },
        { title: 'Produce', description: 'Leave with a usable tool or plan.' },
        { title: 'Implement', description: 'Take it back and put it to work.' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Audiences',
      heading: 'Practical Training for Every Role.',
      style: 'cards',
      columns: '3',
      items: [
        { title: 'School Leaders & Principals', description: 'PKR 9,000 per one-day seat · PKR 27,000 per three-day intensive · School Upgradation Bootcamp PKR 45,000' },
        { title: 'School Management & Academic Leadership', description: '12 one-day topics · PKR 4,900/person' },
        { title: 'School Teachers', description: '24 one-day topics · PKR 4,900/person' },
        { title: 'Early Years Educators', description: '6 one-day topics · PKR 4,900/person' },
        { title: 'School Administrative Staff', description: '12 one-day topics · PKR 4,900/person' },
        { title: 'School Support Staff', description: '10 one-day topics · PKR 30,000/institutional session' },
        { title: 'Parents & Families', description: '24 one-day topics · PKR 2,900/person' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Professional Diplomas',
      heading: 'Six Months. Twelve Modules. Practical Portfolios.',
      intro:
        'Four professional diplomas: School Leadership & Management, Teaching Excellence, Early Childhood Education, and Positive Parenting & Child Development. Fees and assessment rubrics to be published once approved.',
      style: 'cards',
      columns: '4',
      items: [
        { title: 'School Leadership & Management' },
        { title: 'Teaching Excellence' },
        { title: 'Early Childhood Education' },
        { title: 'Positive Parenting & Child Development' },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Book Training for Your Team.',
      body: 'Tell us your audience, topic and preferred dates. We will confirm the schedule and logistics.',
      style: 'solid',
      buttons: [{ label: 'Book Institutional Training', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─── /ai-for-schools (index) ────────────────────────────────
await upsertPage('ai-for-schools', {
  title: 'AI for Schools',
  status: 'published',
  seo: {
    metaTitle: 'AI for Schools — Wisdoms International',
    metaDescription:
      'Practical AI training and implementation for school leaders, teachers and students.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'AI for Schools',
      heading: 'Smarter Schools. Empowered Teachers. Future-Ready Students.',
      subheading:
        'Practical AI training and implementation for school leaders, teachers and students. Choose from three specialized programs.',
      align: 'left',
      size: 'medium',
      buttons: [{ label: 'Explore AI Programs', href: '#programs', variant: 'primary' }],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Three Programs',
      heading: 'Choose Your AI Route.',
      style: 'cards',
      columns: '3',
      items: [
        {
          title: 'AI-Powered School Program',
          description:
            'Three full-day on-site sessions for school leadership, management and teachers. Includes complete Grades 1-12 AI curriculum, three configured school chatbots, AI days/events plans, automation training, three months of online support and weekly AI updates. PKR 150,000 per school.',
        },
        {
          title: 'AI Teacher Certification',
          description:
            'Three-month, 12-module practical course for professional, personal and career-related AI skills, with assignments, portfolio and assessment. Live batches: up to 50 teachers. PKR 15,000 live / PKR 7,000 recorded per teacher.',
        },
        {
          title: 'AI Curriculum for Students',
          description:
            'Grades 1-12, 40 lessons per grade, 480 lesson plans, implementation guide, teacher guide, parent guide, SOPs, monitoring/evaluation guide and online teacher orientation. PKR 30,000 per school.',
        },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Launch AI in Your School.',
      body: "Talk to us about which program fits your school's stage and budget.",
      style: 'solid',
      buttons: [{ label: 'Send an Inquiry', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─── /about-us ──────────────────────────────────────────────
await upsertPage('about-us', {
  title: 'About Us',
  status: 'published',
  seo: {
    metaTitle: 'About Us — Wisdoms International',
    metaDescription:
      'A school systems development and institutional transformation company established in 2018.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'About Us',
      heading: 'Building Stronger Schools. Shaping Better Futures.',
      subheading:
        'Wisdoms International is a school systems development and institutional transformation company established in 2018. We help institutions build better systems, strengthen people and improve continuously.',
      align: 'left',
      size: 'medium',
    },
    {
      blockType: 'twoColumn',
      eyebrow: 'Who We Are',
      heading: 'More Than Consultancy. A Complete School Development Partner.',
      leftType: 'richText',
      leftRichText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text:
                    'We bring together school establishment, institutional consultancy, professional training, curriculum development, academic systems, early learning and technology-enabled school solutions. Our focus is clear: practical improvement that schools can sustain.',
                },
              ],
            },
          ],
        },
      },
      rightType: 'list',
      rightList: [
        { text: 'School establishment and setup' },
        { text: 'Institutional consultancy' },
        { text: 'Professional training' },
        { text: 'Curriculum development' },
        { text: 'Academic systems' },
        { text: 'Early learning (KINDRA)' },
        { text: 'Technology-enabled school solutions' },
      ],
      ratio: '50-50',
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Vision & Mission',
      heading: 'What Guides Our Work.',
      style: 'cards',
      columns: '2',
      items: [
        { title: 'Vision', description: 'To make every school a great school.' },
        {
          title: 'Mission',
          description:
            'To build stronger schools through practical systems, professional development, innovative solutions and continuous institutional improvement.',
        },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Our Four Values',
      heading: 'The Principles Behind Every Engagement.',
      style: 'cards',
      columns: '2',
      items: [
        { title: 'Integrity', description: 'Honest and responsible service.' },
        { title: 'Excellence', description: 'High professional standards.' },
        { title: 'Practical Innovation', description: 'Solutions that work in schools.' },
        { title: 'Continuous Improvement', description: 'Plan, apply, review and refine.' },
      ],
    },
    {
      blockType: 'roadmap',
      eyebrow: 'The Wisdoms Approach',
      heading: 'Diagnose. Strategize. Develop. Implement. Evaluate.',
      layout: 'horizontal',
      steps: [
        { label: 'Step 1', title: 'Diagnose', description: 'Study the school situation.' },
        { label: 'Step 2', title: 'Strategize', description: 'Define priorities and design systems.' },
        { label: 'Step 3', title: 'Develop', description: 'Build tools, policies and frameworks.' },
        { label: 'Step 4', title: 'Implement', description: 'Support rollout in the classroom and office.' },
        { label: 'Step 5', title: 'Evaluate', description: 'Review progress and refine.' },
      ],
    },
    {
      blockType: 'founderNote',
      eyebrow: 'Our Founder',
      heading: 'Ahtsham ul Haq Wariyah',
      quote:
        'Educator, school systems development consultant and professional trainer focused on practical institutional improvement.',
      name: 'Ahtsham ul Haq Wariyah',
      role: 'Founder & Managing Director, Wisdoms International',
      imagePosition: 'left',
    },
    {
      blockType: 'cta',
      heading: "Let's Build Something Together.",
      body: "Explore our services or book a consultation to discuss your school's development.",
      style: 'solid',
      buttons: [
        { label: 'Explore Our Services', href: '/services', variant: 'primary' },
        { label: 'Book a Consultation', href: '/contact-us', variant: 'secondary' },
      ],
    },
  ],
})

// ─── /school-transformation ────────────────────────────────
await upsertPage('school-transformation', {
  title: 'School Transformation',
  status: 'published',
  seo: {
    metaTitle: 'School Transformation — Wisdoms International',
    metaDescription:
      'A structured 12-month development partnership for schools that want stronger leadership, better systems and regular implementation support.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'School Transformation',
      heading: 'Your Complete School Development Head Office.',
      subheading:
        'One Partnership. 18 Development Systems. Complete Institutional Support. A structured 12-month development partnership for schools that want stronger leadership, better systems and regular implementation support.',
      align: 'left',
      size: 'medium',
      buttons: [
        { label: 'Request School Assessment', href: '/contact-us', variant: 'primary' },
        { label: 'Book a Consultation', href: '/contact-us', variant: 'ghost' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'The Partnership',
      heading: 'More Than Occasional School Consultancy.',
      intro:
        'Wisdoms International acts as an extended school development support office. Your management team continues to run the school; we provide consultancy, planning, training, tools and progress reviews.',
      style: 'checklist',
      columns: '2',
      items: [
        { title: 'All 18 development KPIs' },
        { title: 'One campus visit per month' },
        { title: 'Weekly online leadership meeting' },
        { title: 'Dedicated school development consultant' },
        { title: 'Relevant SOPs, policies and professional resources' },
        { title: 'Teachers, management, parents and students training' },
        { title: 'Planned marketing support and implementation monitoring' },
        { title: 'Online WhatsApp messages accepted 24/7' },
      ],
    },
    {
      blockType: 'kpiList',
      eyebrow: 'The Complete Program',
      heading: 'All 18 Development Systems.',
      style: 'numbered',
      columns: '3',
      items: [
        { title: 'Institutional Diagnostic & Baseline' },
        { title: 'School Branding & Rebranding' },
        { title: 'Teacher Professional Development' },
        { title: 'Admissions & Student Retention' },
        { title: 'Fee Recovery & Financial Discipline' },
        { title: 'Staff Performance Appraisal' },
        { title: 'Future Skills Program Development' },
        { title: 'School SOPs Development & Implementation' },
        { title: 'Annual School Planning' },
        { title: 'Quality Assurance & Internal Audits' },
        { title: 'Parent Experience Management' },
        { title: 'Green Campus Development' },
        { title: 'Child Protection & Safeguarding' },
        { title: 'Classroom Culture Development' },
        { title: 'Student Grooming & Personality Development' },
        { title: 'School Operations & Facilities Management' },
        { title: 'Student Leadership Development' },
        { title: 'Community Engagement & CSR' },
      ],
    },
    {
      blockType: 'roadmap',
      eyebrow: 'Implementation Roadmap',
      heading: '12 Months of Planned Improvement.',
      layout: 'horizontal',
      steps: [
        { label: 'Months 1-3', title: 'Diagnose', description: 'Agree goals and establish priorities.' },
        { label: 'Months 4-6', title: 'Build', description: 'Systems and staff practice strengthening.' },
        { label: 'Months 7-9', title: 'Implement', description: 'Monitor and address gaps.' },
        { label: 'Months 10-12', title: 'Evaluate', description: 'Improve and prepare next annual roadmap.' },
      ],
    },
    {
      blockType: 'pricingTable',
      eyebrow: 'Investment',
      heading: 'PKR 50,000 per Month.',
      intro:
        'A 12-month institutional partnership at PKR 600,000 in total. Exact deliverables, staff participation, visit logistics, marketing content scope and support hours are defined in the service agreement.',
      style: 'single',
      price: 'PKR 50,000',
      period: '/month',
      totalNote: 'PKR 600,000 total · 12 months',
      features: [
        { text: 'All 18 development KPIs' },
        { text: 'Monthly campus visit' },
        { text: 'Weekly online leadership meeting' },
        { text: 'Dedicated school development consultant' },
        { text: 'Training for leadership, teachers, parents and students' },
      ],
      primaryCta: { label: 'Request Partnership Proposal', href: '/contact-us' },
    },
    {
      blockType: 'faqBlock',
      heading: 'Clear Expectations.',
      items: [
        { question: 'Is it a management takeover?', answer: 'No. The school keeps operational control.' },
        { question: 'Are all 18 KPIs included?', answer: 'Yes, within the agreed 12-month program.' },
        {
          question: 'Are results guaranteed?',
          answer: 'No; progress depends on institutional implementation and school circumstances.',
        },
      ],
    },
  ],
})

// ─── /kindra ────────────────────────────────────────────────
await upsertPage('kindra', {
  title: 'KINDRA',
  status: 'published',
  seo: {
    metaTitle: 'KINDRA Early Learning Framework — Wisdoms International',
    metaDescription:
      'A complete preschool learning and implementation framework with three progressive levels: Roots, Wings and Shine.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'KINDRA',
      heading: 'KINDRA — A Complete Early Learning Framework.',
      subheading:
        'A structured preschool development approach designed around learning, play, teacher preparation, classroom systems and quality monitoring. Three progressive levels: Roots, Wings and Shine.',
      align: 'left',
      size: 'medium',
      buttons: [
        { label: 'Get KINDRA Framework', href: '/contact-us', variant: 'primary' },
        { label: 'Explore Support Plans', href: '#support', variant: 'ghost' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Three Learning Levels',
      heading: 'Roots. Wings. Shine.',
      intro:
        'A progressive early learning journey with curriculum planning, practical activities, assessment and teacher guidance suited to each level.',
      style: 'cards',
      columns: '3',
      items: [
        { title: 'Roots', description: 'Foundation years — first exposure to structured learning.' },
        { title: 'Wings', description: 'Building confidence and independence.' },
        { title: 'Shine', description: 'Ready-for-school mastery and leadership.' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'What the Framework Covers',
      heading: 'More Than Preschool Lesson Plans.',
      style: 'checklist',
      columns: '2',
      items: [
        { title: 'Complete curriculum architecture and teaching resources' },
        { title: 'Teacher and parent manuals' },
        { title: 'Classroom schedules and teaching materials' },
        { title: 'SOPs and child safeguarding' },
        { title: 'Observation and assessment' },
        { title: 'School rollout, training and quality review' },
      ],
    },
    {
      blockType: 'pricingTable',
      eyebrow: 'Complete Framework',
      heading: 'PKR 100,000 — One Time.',
      intro:
        'Schools purchase the full KINDRA framework first. The existing core framework includes 27 structured booklets in editable and print formats, with separate operational monitoring resources supplied according to the final licensed 29-file package.',
      style: 'single',
      price: 'PKR 100,000',
      period: 'one-time',
      primaryCta: { label: 'Purchase Framework', href: '/contact-us' },
    },
    {
      blockType: 'pricingTable',
      eyebrow: 'Optional Support',
      heading: 'Choose Your Implementation Route.',
      style: 'tiered',
      tiers: [
        {
          name: 'On-Site Development Partnership',
          price: 'PKR 50,000',
          period: '/month',
          description:
            'Optional 12-month retainer following the framework purchase. Includes one full-day school visit each month, implementation support, staff development, monitoring and evaluation.',
          features: [
            { text: 'One full-day school visit per month' },
            { text: 'Implementation support' },
            { text: 'Staff development' },
            { text: 'Monitoring and evaluation' },
          ],
          ctaLabel: 'Apply for On-Site Partnership',
          ctaHref: '/contact-us',
        },
        {
          name: 'Online Development Partnership',
          price: 'PKR 25,000',
          period: '/month',
          description:
            'Optional 12-month retainer following the framework purchase. Includes online professional guidance, training, virtual monitoring, evaluations and implementation support.',
          features: [
            { text: 'Online professional guidance' },
            { text: 'Training sessions' },
            { text: 'Virtual monitoring' },
            { text: 'Evaluations and implementation support' },
          ],
          ctaLabel: 'Apply for Online Partnership',
          ctaHref: '/contact-us',
        },
      ],
    },
    {
      blockType: 'noticeBanner',
      variant: 'info',
      text:
        'Recognition Notice: Schools implementing the KINDRA framework may apply to use the proposed "A KINDRA Preschool" designation. Recognition and logo usage are subject to approved quality criteria and written authorization; purchase alone does not grant recognition.',
      cta: { label: 'Ask About Recognition', href: '/contact-us' },
    },
    {
      blockType: 'roadmap',
      eyebrow: 'Getting Started',
      heading: 'Choose Your Route.',
      layout: 'horizontal',
      steps: [
        { label: 'Step 1', title: 'Purchase the PKR 100,000 framework' },
        { label: 'Step 2', title: 'Prepare your teachers and school systems' },
        { label: 'Step 3', title: 'Select optional on-site or online support' },
        { label: 'Step 4', title: 'Monitor and improve implementation' },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Talk to the KINDRA Team.',
      style: 'solid',
      buttons: [{ label: 'Contact Us', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─── /school-erp ────────────────────────────────────────────
await upsertPage('school-erp', {
  title: 'School ERP',
  status: 'published',
    // (leave seo as-is)
  seo: {
    metaTitle: 'School ERP — Wisdoms International',
    metaDescription: 'Smart School Management, All in One Place.',
  },
    layout: [
    {
      blockType: 'noticeBanner',
      variant: 'info',
      text: 'This page is being prepared. Detailed information about Wisdoms International School ERP — features, modules, implementation process, support options and pricing — will be published after final approval.',
      cta: { label: 'Ask About School ERP', href: '/contact-us' },
    },
    {
      blockType: 'hero',
      eyebrow: 'School ERP',
      heading: 'Smart School Management, All in One Place.',
      subheading:
        'Wisdoms International is preparing detailed information about its school management software. Features, modules, implementation process, support options and pricing will be published after final approval.',
      align: 'center',
      size: 'medium',
      buttons: [
        { label: 'Ask About School ERP', href: '/contact-us', variant: 'primary' },
        { label: 'Contact Us', href: '/contact-us', variant: 'ghost' },
      ],
    },
  ],
})

// ─── /our-clients ───────────────────────────────────────────
await upsertPage('our-clients', {
  title: 'Our Clients',
  status: 'published',
  seo: {
    metaTitle: 'Our Clients — Wisdoms International',
    metaDescription:
      'Institutions, school leaders and organizations we have worked with.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Our Clients',
      heading: 'We Work With Those Who Shape Education.',
      subheading:
        'Explore the institutions, school leaders and educational organizations we have worked with through professional consultancy, training and school development.',
      align: 'left',
      size: 'medium',
    },
    {
      blockType: 'featureCards',
      eyebrow: 'We Work With',
      heading: 'Institutions and Leaders Across the Education Sector.',
      style: 'checklist',
      columns: '2',
      items: [
        { title: 'Private Schools & School Systems' },
        { title: 'Preschools & Early Learning Centers' },
        { title: 'New School Investors & Founders' },
        { title: 'School Owners, Directors & Principals' },
        { title: 'School Management & Teaching Teams' },
        { title: 'School Franchise Networks' },
        { title: 'Educational Organizations & Associations' },
        { title: 'NGOs, Foundations & Community Education Projects' },
      ],
    },
    {
      blockType: 'logoStrip',
      heading: 'Institutions We Have Served',
      intro: 'Verified client names and cities.',
      source: 'collection',
      showCity: true,
    },
    {
      blockType: 'testimonialSlider',
      eyebrow: 'What Our Clients Say',
      heading: 'Experiences Shared by Our Clients.',
    },
    {
      blockType: 'impactStrip',
      eyebrow: 'Our Impact',
      heading: 'Building Stronger Schools. Empowering Educators.',
      source: 'collection',
      disclaimer:
        'Company-reported cumulative estimates as of October 2026, pending supporting-record checks.',
    },
    {
      blockType: 'cta',
      heading: 'Discuss Your School Needs.',
      style: 'solid',
      buttons: [
        { label: 'Explore Our Services', href: '/services', variant: 'primary' },
        { label: 'Contact Us', href: '/contact-us', variant: 'secondary' },
      ],
    },
  ],
})

// ─── /wisdoms-prime ─────────────────────────────────────────
await upsertPage('wisdoms-prime', {
  title: 'Wisdoms Prime',
  status: 'published',
  seo: {
    metaTitle: 'Wisdoms Prime — Your School Development Platform',
    metaDescription:
      'One paid membership. Seven practical features. Learn, find resources, plan school development and get AI-assisted guidance.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Wisdoms Prime',
      heading: 'Your School Development Platform.',
      subheading:
        'One paid membership. Seven practical features. Learn, find resources, plan school development and get AI-assisted guidance from one digital platform.',
      align: 'left',
      size: 'medium',
      buttons: [
        { label: 'View Membership Plans', href: '#plans', variant: 'primary' },
        { label: 'Join Wisdoms Prime', href: '/contact-us', variant: 'ghost' },
      ],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Seven Features',
      heading: 'Everything in One Platform.',
      style: 'cards',
      columns: '3',
      items: [
        { title: 'Shorts', description: 'Daily short school development videos with quick, practical insights.' },
        { title: 'Masterclasses', description: 'Approximately 30-minute detailed videos with related implementation documents.' },
        { title: 'Insights & Guides', description: 'Practical school development articles with relevant resources and implementation documents.' },
        { title: 'Resource Vault', description: 'Centralized library of SOPs, editable templates, policies, forms, checklists, manuals and resources attached to videos and articles.' },
        { title: 'School Growth Planner', description: 'Create and manage school improvement plans, choose KPIs, assign tasks, track progress, add evidence and generate reports.' },
        { title: 'Prime AI', description: 'AI assistant for school development questions, draft templates and discovery of approved platform resources.' },
        { title: 'Research & Updates', description: 'Useful education research, innovations, policy developments and practical updates.' },
      ],
    },
    {
      blockType: 'noticeBanner',
      variant: 'warning',
      text:
        'Paid Access Only. Members must have an active paid subscription to open Shorts, Masterclasses, articles, resources, planner, AI assistant or research updates. Public visitors may view only introduction and membership information. Expired membership loses access.',
    },
    {
      blockType: 'cta',
      heading: 'Join Wisdoms Prime.',
      body: 'Membership tiers, prices and account limits will be added once approved.',
      style: 'solid',
      buttons: [{ label: 'Contact Us', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─── /careers-partnerships ──────────────────────────────────
await upsertPage('careers-partnerships', {
  title: 'Careers & Partnerships',
  status: 'published',
  seo: {
    metaTitle: 'Careers & Partnerships — Wisdoms International',
    metaDescription:
      'Join Wisdoms International as a team member, trainer, consultant, strategic partner or regional representative.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Careers & Partnerships',
      heading: 'Build Your Career. Expand Your Impact.',
      subheading:
        'Join Wisdoms International as a team member, trainer, consultant, strategic partner or regional representative. We work with people who want to strengthen schools through practical expertise.',
      align: 'left',
      size: 'medium',
      buttons: [{ label: 'Explore Opportunities', href: '#paths', variant: 'primary' }],
    },
    {
      blockType: 'featureCards',
      eyebrow: 'Five Paths',
      heading: 'How You Can Work With Us.',
      style: 'cards',
      columns: '3',
      items: [
        {
          title: 'Careers at Wisdoms',
          description:
            'Full-time, part-time, remote and project-based positions as available. Fields may include school consultancy, curriculum, training, sales, marketing, technology and operations.',
        },
        {
          title: 'Become a Wisdoms Trainer',
          description:
            'Experienced educators and trainers delivering practical workshops, bootcamps and development programs.',
        },
        {
          title: 'Join Our Consultant Network',
          description:
            'Subject specialists and consultants supporting school transformation, audits, academics, curriculum and operations.',
        },
        {
          title: 'Strategic & Business Partnerships',
          description:
            'Organizations interested in education programs, technology, networks, projects and joint initiatives.',
        },
        {
          title: 'Regional Representatives',
          description:
            'Professional partners supporting relationships and school development outreach across cities in Pakistan.',
        },
      ],
    },
    {
      blockType: 'roadmap',
      eyebrow: 'How Applications Are Reviewed',
      heading: 'Capability Matters.',
      intro:
        'Applications are screened according to requirements. Trainer candidates: application, interview and practical demonstration. Consultant candidates: application, interview and practical case assessment.',
      layout: 'vertical',
      steps: [
        { label: 'Step 1', title: 'Submit application', description: 'Upload relevant evidence and portfolio.' },
        { label: 'Step 2', title: 'Review', description: 'Our team screens against requirements.' },
        { label: 'Step 3', title: 'Interview', description: 'Calls or practical demonstration depending on role.' },
        { label: 'Step 4', title: 'Onboarding', description: 'Shortlisted applicants are contacted with next steps.' },
      ],
    },
    {
      blockType: 'cta',
      heading: 'Apply Online.',
      body: 'Each category has its own online form. The team will contact shortlisted applicants.',
      style: 'solid',
      buttons: [{ label: 'Contact Us', href: '/contact-us', variant: 'primary' }],
    },
  ],
})

// ─────────────────────────────────────────────────────────────
// DONE
// ─────────────────────────────────────────────────────────────

console.log('\n✅ Seed complete.\n')
process.exit(0)