import { beforeEach, describe, expect, it } from 'vitest';
import { FetchGymMembersUseCase } from './fetch-gym-members-use-case';
import { MembersRepository } from '@/respositories/members-repository';
import { MembersInMemoryRepository } from '@/respositories/in-memory/members-in-memory-repository';

describe(FetchGymMembersUseCase, () => {
    let sut: FetchGymMembersUseCase;
    let membersRepositroy: MembersRepository;
    beforeEach(() => {
        membersRepositroy = new MembersInMemoryRepository();
        sut = new FetchGymMembersUseCase(membersRepositroy);
    });
    describe('should return members', () => {
        it('should return members', async () => {
            await membersRepositroy.create({
                name: 'John Doe',
                email: '',
                gymId: 'gym01',
            });
            const members = await sut.execute('gym01');
            expect(members.members).toEqual(expect.any(Array));
            expect(members.members).toHaveLength(1);
        });
    });
});
