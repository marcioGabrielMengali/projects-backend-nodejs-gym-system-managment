import { RegisterPaymentUseCase } from '@/http/use-cases/register-payment-use-case';
import { MembersPrismaRepository } from '@/respositories/prisma/members-prisma-repository';
import { PaymentsPrismaRepository } from '@/respositories/prisma/payments-prisma-repository';

export function makeRegisterPaymentsUseCase() {
    const membersRepository = new MembersPrismaRepository();
    const paymentsRepository = new PaymentsPrismaRepository();
    const registerPaymentUseCase = new RegisterPaymentUseCase(
        paymentsRepository,
        membersRepository,
    );
    return registerPaymentUseCase;
}
