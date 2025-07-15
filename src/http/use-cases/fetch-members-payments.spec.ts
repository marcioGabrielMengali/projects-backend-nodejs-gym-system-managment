import { beforeEach, describe, expect, it } from 'vitest';
import { FetchMembersPaymentsUseCase } from './fetch-members-payments-use-case';
import { MembersRepository } from '@/respositories/members-repository';
import { PaymentsRepository } from '@/respositories/payments-repository';
import { MembersInMemoryRepository } from '@/respositories/in-memory/members-in-memory-repository';
import { PaymentsInMemoryRepository } from '@/respositories/in-memory/payments-in-memory-repository';
import { NotFoundError } from './errors/not-found-error';

describe(FetchMembersPaymentsUseCase, () => {
    let sut: FetchMembersPaymentsUseCase;
    let membersRepository: MembersRepository;
    let paymentsRepository: PaymentsRepository;

    beforeEach(() => {
        membersRepository = new MembersInMemoryRepository();
        paymentsRepository = new PaymentsInMemoryRepository();
        sut = new FetchMembersPaymentsUseCase(membersRepository, paymentsRepository);
    });

    it('Should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('Should throw an error when member does not exist', async () => {
        await expect(() => sut.execute('non-existing-member-id')).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });

    it('Should be able to fetch member payments', async () => {
        const member = await membersRepository.create({
            name: 'Member',
            gymId: 'gym-id-123',
            email: 'member@gmail.com',
        });
        await paymentsRepository.create({
            amount: 100,
            memberId: member.id,
        });
        await paymentsRepository.create({
            amount: 200,
            memberId: member.id,
        });
        const { payments } = await sut.execute(member.id);
        expect(payments).toHaveLength(2);
        expect(payments[0].id).toEqual(expect.any(String));
        expect(payments[1].id).toEqual(expect.any(String));
        expect(payments[0].amount).toEqual(100);
        expect(payments[1].amount).toEqual(200);
    });
});
