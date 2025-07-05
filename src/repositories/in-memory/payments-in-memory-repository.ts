import { Payment, Prisma } from 'generated/prisma';

export class PaymentsInMemoryRepository {
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
}