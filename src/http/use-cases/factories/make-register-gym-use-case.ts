import { GymPrismaRepository } from '@/respositories/prisma/gym-prisma-repository';
import { RegisterGymUseCase } from '../register-gym-use-case';
import { GymRepository } from '@/respositories/gym-repository';

export function makeRegisterGymUseCase(): RegisterGymUseCase {
    const gymRepository: GymRepository = new GymPrismaRepository();
    const registeGymUseCase: RegisterGymUseCase= new RegisterGymUseCase(gymRepository);
    return registeGymUseCase;
}