import { GymPrismaRepository } from '@/respositories/prisma/gym-prisma-repository';
import { MembersPrismaRepository } from '@/respositories/prisma/members-prisma-repository';
import { RegisterMemeberUseCase } from '../register-member-use-case';

export function makeRegisterMemberUseCase() {
    const membersRepository = new MembersPrismaRepository();
    const gymsRepository = new GymPrismaRepository();
    const registerMemberUseCase = new RegisterMemeberUseCase(
        membersRepository,
        gymsRepository,
    );
    return registerMemberUseCase;
}