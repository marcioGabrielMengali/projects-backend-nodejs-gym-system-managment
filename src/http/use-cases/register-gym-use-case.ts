import { GymRepository } from '@/respositories/gym-repository';
import { Gym, Prisma } from 'generated/prisma';
import { AlreadyExistsError } from './errors/already-exists-error';
import bcrypt from 'bcrypt';

export class RegisterGymUseCase {
    constructor(private gymRepository: GymRepository) {}

    async execute(payload: Prisma.GymCreateInput): Promise<Gym> {
        const gymWithSameEmail: Gym | null = await this.gymRepository.findByEmail(payload.email);
        if (gymWithSameEmail) {
            throw new AlreadyExistsError('Gym with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(payload.password, 6);
        payload.password = hashedPassword;

        const gym = await this.gymRepository.create(payload);
        return gym;
    }
}
