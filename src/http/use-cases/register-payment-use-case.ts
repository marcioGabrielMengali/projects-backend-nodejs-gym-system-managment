import { MembersRepository } from '@/respositories/members-repository';
import { PaymentsRepository } from '@/respositories/payments-repository';
import { Payment, Prisma } from 'generated/prisma';
import { NotFoundError } from './errors/not-found-error';

interface PaymentsRepositoryUseCaseResponse {
    payment: Payment;
}
export class RegisterPaymentUseCase {
    constructor(
        private paymentsRepository: PaymentsRepository,
        private membersRepository: MembersRepository,
    ) {}
    async execute(
        data: Prisma.PaymentUncheckedCreateInput,
    ): Promise<PaymentsRepositoryUseCaseResponse> {
        const member = await this.membersRepository.findById(data.memberId);
        if (!member) {
            throw new NotFoundError('Member not found');
        }
        const payment = await this.paymentsRepository.create(data);
        return {
            payment,
        };
    }
}
