import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterPaymentsUseCase } from '../use-cases/factories/make-register-payments-use-case';
import { NotFoundError } from '../use-cases/errors/not-found-error';

export async function registerPaymentController(req: FastifyRequest, res: FastifyReply) {
    const registerPaymentBodySchema = z.object({
        amount: z.number().min(0.01, 'Amount must be greater than 0'),
        memberId: z.string().uuid(),
    });

    const validatedBodySchame = registerPaymentBodySchema.parse(req.body);

    const useCase = makeRegisterPaymentsUseCase();

    try {
        await useCase.execute(validatedBodySchame);
        return res.status(201).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send({
                message: error.message,
            });
        } else {
            throw error;
        }
    }
}
