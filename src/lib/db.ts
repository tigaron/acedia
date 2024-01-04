import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

db.$on('query', e => {
  console.log(e);
});

db.$on('warn', e => {
  console.log(e);
});

db.$on('info', e => {
  console.log(e);
});

db.$on('error', e => {
  console.log(e);
});

if (process.env.NODE_ENV !== 'production') global.prisma = db;
