import { FastifyReply, FastifyRequest } from 'fastify';
import { makeRegisterGymUseCase } from '../use-cases/factories/make-register-gym-use-case';
import { z } from 'zod';
import { AlreadyExistsError } from '../use-cases/errors/already-exists-error';

export async function registerGymController(request: FastifyRequest, reply: FastifyReply) {
    const regiterGymBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().min(10).max(15).optional(),
    });

    const validatedBody = regiterGymBodySchema.parse(request.body);
    const useCase = makeRegisterGymUseCase();

    try {
        await useCase.execute(validatedBody);
    } catch (error) {
        if (error instanceof AlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        } else {
            throw error;
        }
    }
    return reply.status(201).send();
}
