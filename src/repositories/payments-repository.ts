import { Payment, Prisma } from 'generated/prisma';

export interface PaymentsRepository {
    create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment>;
    findManyByMemberId(memberId: string): Promise<Payment[]>;
}