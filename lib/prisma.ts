import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

function getDirectUrl(): string {
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.startsWith('prisma+postgres://')) {
    try {
      const url = new URL(dbUrl);
      const apiKey = url.searchParams.get('api_key') || '';
      const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString('utf-8'));
      return decoded.databaseUrl;
    } catch {
      return 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
    }
  }
  return dbUrl;
}

const prismaClientSingleton = () => {
  const directUrl = getDirectUrl();
  const pool = new pg.Pool({ connectionString: directUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

