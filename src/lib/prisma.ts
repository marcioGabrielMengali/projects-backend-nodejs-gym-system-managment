import { env } from '@/env/index';
import { PrismaClient } from 'generated/prisma';

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query'] : [],
});
