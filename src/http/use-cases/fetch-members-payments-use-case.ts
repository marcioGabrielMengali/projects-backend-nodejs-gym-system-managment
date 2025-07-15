import { MembersRepository } from '@/respositories/members-repository';
import { PaymentsRepository } from '@/respositories/payments-repository';
import { Payment } from 'generated/prisma';
import { NotFoundError } from './errors/not-found-error';

interface FetchMembersPaymentsUseCaseResponse {
    payments: Payment[];
}
export class FetchMembersPaymentsUseCase {
    constructor(
        private membersRepository: MembersRepository,
        private paymentsRepository: PaymentsRepository,
    ) {}

    async execute(memberId: string): Promise<FetchMembersPaymentsUseCaseResponse> {
        const member = await this.membersRepository.findById(memberId);

        if (!member) {
            throw new NotFoundError('Member not found');
        }

        const payments = await this.paymentsRepository.findManyByMemberId(memberId);

        return { payments };
    }
}
