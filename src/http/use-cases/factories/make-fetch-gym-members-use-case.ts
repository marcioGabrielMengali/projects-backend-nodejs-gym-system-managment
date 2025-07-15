import { MembersPrismaRepository } from '@/respositories/prisma/members-prisma-repository';
import { FetchGymMembersUseCase } from '../fetch-gym-members-use-case';

export function makeFetchGymMembersUseCase() {
    const membersRepository = new MembersPrismaRepository();
    const fetchGymMembersUseCase = new FetchGymMembersUseCase(membersRepository);
    return fetchGymMembersUseCase;
}
