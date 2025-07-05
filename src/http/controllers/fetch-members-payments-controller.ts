import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchMembersPaymentsUseCase } from '../use-cases/factories/make-fetch-members-payments-use-case';
import { z } from 'zod';
import { NotFoundError } from '../use-cases/errors/not-found-error';

export async function fetchMembersPaymentsController(req: FastifyRequest, res: FastifyReply) {
    const fetchMembersPaymentsQuerySchema = z.object({
        memberId: z.string().uuid(),
    });
    const validatedQuery = fetchMembersPaymentsQuerySchema.parse(req.query);
    const useCase = makeFetchMembersPaymentsUseCase();
    try{
        const { payments } = await useCase.execute(validatedQuery.memberId);
        return res.status(200).send({ payments });
    }catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send({ message: error.message });
        } else {
            throw error;
        }
    }
}