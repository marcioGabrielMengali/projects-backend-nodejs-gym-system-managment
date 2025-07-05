import { prisma } from '@/lib/prisma';
import { Payment, Prisma } from 'generated/prisma';

export class PaymentsPrismaRepository {
    async create(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment> {
        try {
            const payment = await prisma.payment.create({
                data: {
                    amount: data.amount,
                    memberId: data.memberId,
                },
            });

            return payment;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Failed to create payment');
        }
    }
}
