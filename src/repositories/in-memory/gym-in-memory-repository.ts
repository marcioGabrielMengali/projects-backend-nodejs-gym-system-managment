import { Gym, Prisma } from 'generated/prisma';
import { GymRepository } from '../gym-repository';
import { randomUUID } from 'crypto';

export class GymInMemoryRepository implements GymRepository {
    public items: Gym[] = [];

    async create(gym: Prisma.GymCreateInput): Promise<Gym> {
        const data: Gym = {
            id: randomUUID(),
            email: gym.email,
            name: gym.name,
            password: gym.password,
            phone: gym.phone ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.items.push(data);
        return data;
    }

    async findByEmail(email: string): Promise<Gym | null> {
        const gym: Gym | undefined = this.items.find(data => data.email == email);
        if (!gym) {
            return null;
        }
        return gym;
    }

    async findById(id: string): Promise<Gym | null> {
        const gym: Gym | undefined = this.items.find(data => data.id == id);
        return gym ?? null;
    }
}
