import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Admin user ─────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aumveda.com' },
    update: {},
    create: {
      email: 'admin@aumveda.com',
      name: 'Aumveda Admin',
      role: 'admin',
      profile: {
        create: {
          timezone: 'Asia/Kolkata',
          onboardingDone: true,
        },
      },
    },
  })
  console.log('✅ Admin user:', admin.email)

  // ── Sample products ────────────────────────────────────────
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'AUM-CRYSTAL-001' },
      update: {},
      create: {
        sku: 'AUM-CRYSTAL-001',
        slug: 'healing-crystal-set',
        title: 'Healing Crystal Set',
        description: 'A curated set of 7 chakra crystals — amethyst, rose quartz, citrine, and more — to support your energy practice.',
        priceCents: 159900, // ₹1,599
        images: [],
        inventoryCount: 50,
        productType: 'physical',
      },
    }),
    prisma.product.upsert({
      where: { sku: 'AUM-JOURNAL-001' },
      update: {},
      create: {
        sku: 'AUM-JOURNAL-001',
        slug: 'healing-journal',
        title: 'Aumveda Guided Journal',
        description: 'A beautifully designed 90-day guided journal with prompts for reflection, gratitude, and intention-setting.',
        priceCents: 79900, // ₹799
        images: [],
        inventoryCount: 100,
        productType: 'physical',
      },
    }),
    prisma.product.upsert({
      where: { sku: 'AUM-OIL-001' },
      update: {},
      create: {
        sku: 'AUM-OIL-001',
        slug: 'calm-essential-oil-blend',
        title: 'Calm Essential Oil Blend',
        description: 'A proprietary blend of lavender, frankincense, and sandalwood — formulated to reduce cortisol and promote deep calm.',
        priceCents: 129900, // ₹1,299
        images: [],
        inventoryCount: 75,
        productType: 'physical',
      },
    }),
  ])
  console.log(`✅ ${products.length} products seeded`)

  // ── Sample Daily Dose entries ──────────────────────────────
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const doses = await Promise.all([
    prisma.dailyDose.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Morning Grounding',
        audioKey: 'audio/morning-grounding-528hz.mp3',
        promptText: 'Breathe in stillness. As you listen, place one hand on your heart and one on your belly. Notice where you hold tension — and with each exhale, gently release it.',
        durationSec: 60,
        isActive: true,
        publishDate: new Date(),
      },
    }),
    prisma.dailyDose.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Evening Reset',
        audioKey: 'audio/evening-reset-528hz.mp3',
        promptText: 'Let today close gently. Reflect on one moment of beauty from your day — however small. You showed up. That is enough.',
        durationSec: 90,
        isActive: true,
        publishDate: tomorrow,
      },
    }),
  ])
  console.log(`✅ ${doses.length} daily doses seeded`)

  // ── Sample course ──────────────────────────────────────────
  const course = await prisma.course.upsert({
    where: { slug: 'foundations-of-healing' },
    update: {},
    create: {
      slug: 'foundations-of-healing',
      title: 'Foundations of Healing',
      description: 'A 5-module introductory course with Archana Jain covering the principles of holistic healing, breath work, and daily ritual.',
      isPaid: false,
      isPublished: true,
      modules: {
        create: [
          { title: 'Welcome & Intention Setting', ytVideoId: 'dQw4w9WgXcQ', orderIndex: 1, durationSec: 480, isPreview: true },
          { title: 'The Breath as Medicine', ytVideoId: 'dQw4w9WgXcQ', orderIndex: 2, durationSec: 720 },
          { title: 'Your Morning Ritual', ytVideoId: 'dQw4w9WgXcQ', orderIndex: 3, durationSec: 600 },
          { title: 'Journalling for Clarity', ytVideoId: 'dQw4w9WgXcQ', orderIndex: 4, durationSec: 540 },
          { title: 'Sustaining Your Practice', ytVideoId: 'dQw4w9WgXcQ', orderIndex: 5, durationSec: 660 },
        ],
      },
    },
  })
  console.log('✅ Course seeded:', course.title)

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
