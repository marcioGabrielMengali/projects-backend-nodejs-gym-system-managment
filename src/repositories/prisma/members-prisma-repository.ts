import { Member, Prisma } from 'generated/prisma';
import { MembersRepository } from '../members-repository';
import { prisma } from '@/lib/prisma';

export class MembersPrismaRepository implements MembersRepository {
    async create(data: Prisma.MemberUncheckedCreateInput): Promise<Member> {
        try {
            const createdMember = prisma.member.create({
                data: {
                    name: data.name,
                    email: data.email,
                    gymId: data.gymId,
                },
            });
            return createdMember;
        } catch (error) {
            console.error('Error creating member:', error);
            throw new Error('Could not create member');
        }
    }

    async findByEmail(email: string): Promise<Member | null> {
        try {
            const member = await prisma.member.findUnique({
                where: {
                    email,
                },
            });
            return member;
        } catch (error) {
            console.error('Error finding member by email:', error);
            throw new Error('Could not find member by email');
        }
    }

    async findManyByGymId(gymId: string): Promise<Member[]> {
        try {
            const members = await prisma.member.findMany({
                where: {
                    gymId,
                },
            });
            return members;
        } catch (error) {
            console.error('Error finding members by gymId:', error);
            throw new Error('Could not find members by gymId');
        }
    }

    async findById(id: string): Promise<Member | null> {
        try {
            const member = await prisma.member.findUnique({
                where: {
                    id,
                },
            });
            return member;
        } catch (error) {
            console.error('Error finding member by id:', error);
            throw new Error('Could not find member by id');
        }
    }
}
