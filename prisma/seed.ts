import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SESSIONS_DEFAULT = [
  {
    title: 'Connection with Your Higher Self',
    description:
      'Group session to connect with your higher essence through guided meditation.',
    date: '2025-01-15',
    time: '18:00',
    price: 45,
    places: 12,
  },
  {
    title: 'Inner Child Healing',
    description:
      'Deep work to heal emotional wounds from the past and release blockages.',
    date: '2025-01-22',
    time: '17:30',
    price: 55,
    places: 8,
  },
  {
    title: 'Guided Astral Journey',
    description:
      'Experience of consciousness expansion and exploration of other dimensions.',
    date: '2025-01-29',
    time: '19:00',
    price: 60,
    places: 10,
  },
  {
    title: 'Chakra Activation',
    description:
      'Intensive session to balance and activate your energy centers.',
    date: '2025-02-05',
    time: '18:30',
    price: 50,
    places: 15,
  },
];


async function main() {
  for (const session of SESSIONS_DEFAULT) {
    await prisma.session.create({
      data: session,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
