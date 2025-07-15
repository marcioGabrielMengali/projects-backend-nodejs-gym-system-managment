import { Gym, Prisma } from 'generated/prisma';
import { GymRepository } from '../gym-repository';
import { prisma } from '@/lib/prisma';

export class GymPrismaRepository implements GymRepository {
    async create(gym: Prisma.GymCreateInput): Promise<Gym> {
        try {
            const createdGym = await prisma.gym.create({
                data: gym,
            });
            return createdGym;
        } catch (error) {
            console.error('Error creating gym:', error);
            throw new Error('Failed to create gym');
        }
    }

    async findByEmail(email: string): Promise<Gym | null> {
        try {
            const gym = await prisma.gym.findUnique({
                where: {
                    email,
                },
            });
            return gym;
        } catch (error) {
            console.error('Error finding gym by email:', error);
            throw new Error('Failed to find gym by email');
        }
    }

    async findById(id: string): Promise<Gym | null> {
        try {
            const gym = await prisma.gym.findUnique({
                where: {
                    id,
                },
            });
            return gym;
        } catch (error) {
            console.error('Error finding gym by ID:', error);
            throw new Error('Failed to find gym by ID');
        }
    }
}
