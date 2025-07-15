import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterMemberUseCase } from '../use-cases/factories/make-register-member-use-case';
import { AlreadyExistsError } from '../use-cases/errors/already-exists-error';
import { NotFoundError } from '../use-cases/errors/not-found-error';

export async function registerMemberController(req: FastifyRequest, res: FastifyReply) {
    const registerMemberBodySchema = z.object({
        email: z.string().email(),
        name: z.string(),
        gymId: z.string().uuid(),
    });

    const validatedBody = registerMemberBodySchema.parse(req.body);
    const useCase = makeRegisterMemberUseCase();

    try {
        await useCase.execute(validatedBody);
    } catch (error) {
        if (error instanceof AlreadyExistsError) {
            return res.status(409).send({ message: error.message });
        } else if (error instanceof NotFoundError) {
            return res.status(404).send({ message: error.message });
        } else {
            throw error;
        }
    }

    return res.status(201).send();
}