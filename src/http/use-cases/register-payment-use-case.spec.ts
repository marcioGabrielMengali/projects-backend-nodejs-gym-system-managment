import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterPaymentUseCase } from './register-payment-use-case';
import { MembersRepository } from '@/respositories/members-repository';
import { PaymentsRepository } from '@/respositories/payments-repository';
import { MembersInMemoryRepository } from '@/respositories/in-memory/members-in-memory-repository';
import { PaymentsInMemoryRepository } from '@/respositories/in-memory/payments-in-memory-repository';
import { NotFoundError } from './errors/not-found-error';

describe(RegisterPaymentUseCase.name, () => {
    let sut: RegisterPaymentUseCase;
    let membersRepository: MembersRepository;
    let paymentsRepository: PaymentsRepository;

    beforeEach(() => {
        membersRepository = new MembersInMemoryRepository();
        paymentsRepository = new PaymentsInMemoryRepository();
        sut = new RegisterPaymentUseCase(paymentsRepository, membersRepository);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should thow an error if member does not exist', async () => {
        await expect(() =>
            sut.execute({
                amount: 100,
                memberId: 'non-existing-member-id',
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it('Should be able to register a payment for an existing member', async () => {
        const member = await membersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@gmail.com',
            gymId: 'gym-01',
        });
        const { payment } = await sut.execute({
            amount: 100,
            memberId: member.id,
        });
        expect(payment.id).toEqual(expect.any(String));
    });
});
