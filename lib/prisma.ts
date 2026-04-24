import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL || '';
  
  // If using Prisma Accelerate / local Prisma Postgres (prisma+postgres:// or prisma://)
  if (databaseUrl.startsWith('prisma+postgres://') || databaseUrl.startsWith('prisma://')) {
    return new PrismaClient({
      accelerateUrl: databaseUrl,
    });
  }
  
  // If using a direct PostgreSQL connection (postgresql://)
  const { PrismaPg } = require('@prisma/adapter-pg');
  const pg = require('pg');
  const pool = new pg.Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
