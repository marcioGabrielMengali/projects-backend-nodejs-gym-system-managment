import { Gym, Prisma } from 'generated/prisma';


export interface GymRepository {
    create(gym: Prisma.GymCreateInput): Promise<Gym>;
    findByEmail(email: string): Promise<Gym | null>;
    findById(id: string): Promise<Gym | null>;
}