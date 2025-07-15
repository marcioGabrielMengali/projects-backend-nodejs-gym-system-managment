import { prisma } from '@/lib/prisma';
import { Payment, Prisma } from 'generated/prisma';
import { PaymentsRepository } from '../payments-repository';

export class PaymentsPrismaRepository implements PaymentsRepository {
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

    async findManyByMemberId(memberId: string): Promise<Payment[]> {
        try {
            const payments = await prisma.payment.findMany({
                where: {
                    memberId,
                },
            });

            return payments;
        } catch (error) {
            console.error('Error finding payments by memberId:', error);
            throw new Error('Failed to find payments by memberId');
        }
    }
}
