import { Member, Prisma } from 'generated/prisma';
import { MembersRepository } from '../members-repository';

export class MembersInMemoryRepository implements MembersRepository{
    public members: Member[] = [];

    async create(data: Prisma.MemberUncheckedCreateInput): Promise<Member> {
        const member: Member = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            gymId: data.gymId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.members.push(member);
        return member;
    }

    async findByEmail(email: string): Promise<Member | null> {
        const member = this.members.find(member => member.email === email);
        return member ?? null;
    }

    async findManyByGymId(gymId: string): Promise<Member[]> {
        const members = this.members.filter(member => member.gymId === gymId);
        return members;
    }

    async findById(id: string): Promise<Member | null> {
        const member = this.members.find(member => member.id === id);
        return member ?? null;
    }
}