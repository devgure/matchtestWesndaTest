// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        birthDate: new Date('1995-01-01'),
        gender: 'female',
        preferredGender: 'male',
        photos: ['https://example.com/alice.jpg'],
        location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        birthDate: new Date('1993-05-15'),
        gender: 'male',
        preferredGender: 'female',
        photos: ['https://example.com/bob.jpg'],
        location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
      },
    ],
  });
}

main().catch(e => console.error(e));