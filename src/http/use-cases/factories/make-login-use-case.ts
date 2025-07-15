import { GymPrismaRepository } from '@/respositories/prisma/gym-prisma-repository';
import { LoginUseCase } from '../login-use-case';

export function makeLoginUseCase() {
    const gymRepository = new GymPrismaRepository();
    const useCase = new LoginUseCase(gymRepository);
    return useCase;
}
