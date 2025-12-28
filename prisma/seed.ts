import { PrismaClient } from '../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');
const DATABASE_URL = process.env.DATABASE_URL ?? `file:${dbPath}`;

const adapter = new PrismaBetterSqlite3({ url: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SESSIONS_DEFAULT = [
  {
    title: 'Connection with Your Higher Self',
    description:
      'Group session to connect with your higher essence through guided meditation.',
    date: '2026-01-15',
    time: '18:00',
    price: 45,
    places: 12,
  },
  {
    title: 'Inner Child Healing',
    description:
      'Deep work to heal emotional wounds from the past and release blockages.',
    date: '2026-01-22',
    time: '17:30',
    price: 55,
    places: 8,
  },
  {
    title: 'Guided Astral Journey',
    description:
      'Experience of consciousness expansion and exploration of other dimensions.',
    date: '2026-01-29',
    time: '19:00',
    price: 60,
    places: 10,
  },
  {
    title: 'Chakra Activation',
    description:
      'Intensive session to balance and activate your energy centers.',
    date: '2026-02-05',
    time: '18:30',
    price: 50,
    places: 15,
  },
  {
    title: 'Past Life Regression',
    description:
      'Journey into your past lives to understand current patterns and heal karmic ties.',
    date: '2026-02-12',
    time: '18:00',
    price: 65,
    places: 8,
  },
  {
    title: 'Crystal Bowl Sound Bath',
    description:
      'Immersive sound healing experience using crystal bowls to restore vibrational harmony.',
    date: '2026-02-19',
    time: '19:30',
    price: 40,
    places: 20,
  },
  {
    title: 'Full Moon Circle',
    description:
      'Community gathering to harness the energy of the full moon for release and manifestation.',
    date: '2026-02-26',
    time: '20:00',
    price: 35,
    places: 25,
  },
  {
    title: 'Breathwork for Clarity',
    description:
      'Powerful breathing techniques to clear the mind, reduce stress, and access higher states.',
    date: '2026-03-05',
    time: '17:00',
    price: 45,
    places: 15,
  },
  {
    title: 'Akashic Records Access',
    description:
      'Learn to access the library of your soul to gain wisdom and guidance for your path.',
    date: '2026-03-12',
    time: '18:30',
    price: 70,
    places: 10,
  },
  {
    title: 'Shadow Work Workshop',
    description:
      'Safe space to explore and integrate your shadow self for wholeness and empowerment.',
    date: '2026-03-19',
    time: '16:00',
    price: 60,
    places: 12,
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const session of SESSIONS_DEFAULT) {
    const existingSession = await prisma.session.findFirst({
      where: {
        title: session.title,
      },
    });

    if (!existingSession) {
      await prisma.session.create({
        data: session,
      });
      console.log(`Created session: ${session.title}`);
    } else {
      console.log(`Session already exists: ${session.title}`);
    }
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
