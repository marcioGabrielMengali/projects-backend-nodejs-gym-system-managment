import { Member, Prisma } from 'generated/prisma';

export interface MembersRepository {
    findByEmail(email: string): Promise<Member | null>;
    create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>;
    findManyByGymId(gymId: string): Promise<Member[]>;
    findById(id: string): Promise<Member | null>;
}