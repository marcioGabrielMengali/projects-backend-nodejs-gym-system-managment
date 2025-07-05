import { MembersPrismaRepository } from '@/respositories/prisma/members-prisma-repository';
import { PaymentsPrismaRepository } from '@/respositories/prisma/payments-prisma-repository';
import { FetchMembersPaymentsUseCase } from '../fetch-members-payments-use-case';

export function makeFetchMembersPaymentsUseCase() {
    const membersRepository = new MembersPrismaRepository();
    const paymentsRepository = new PaymentsPrismaRepository();
    const fetchMembersPaymentsUseCase = new FetchMembersPaymentsUseCase(
        membersRepository,
        paymentsRepository,
    );
    return fetchMembersPaymentsUseCase;
}