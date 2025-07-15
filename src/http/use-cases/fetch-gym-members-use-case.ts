import { MembersRepository } from '@/respositories/members-repository';
import { Member } from 'generated/prisma';

interface FetchGymMembersUseCaseResponse {
    members: Member[];
}

export class FetchGymMembersUseCase {
    constructor(private membersRepository: MembersRepository) {}

    async execute(gymId: string): Promise<FetchGymMembersUseCaseResponse> {
        const members = await this.membersRepository.findManyByGymId(gymId);
        return { members };
    }
}
