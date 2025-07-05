import { Payment, Prisma } from 'generated/prisma';
import { PaymentsRepository } from '../payments-repository';

export class PaymentsInMemoryRepository implements PaymentsRepository {
    public payments: Payment[] = [];

    async create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment> {
        const payment: Payment = {
            id: crypto.randomUUID(),
            amount: data.amount,
            date: new Date(),
            memberId: data.memberId,
        };

        this.payments.push(payment);
        return payment;
    }
    
    async findManyByMemberId(memberId: string): Promise<Payment[]> {
        const payments = this.payments.filter(payment => payment.memberId === memberId);
        return payments;
    }
}
