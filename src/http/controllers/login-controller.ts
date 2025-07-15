import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeLoginUseCase } from '../use-cases/factories/make-login-use-case';
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error';

export async function LoginController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const loginBodySchema = z.object({
            email: z.string().email(),
            password: z.string(),
        });

        const { email, password } = loginBodySchema.parse(req.body);
        const useCase = makeLoginUseCase();
        const { gym } = await useCase.execute({ email, password });
        const token = await reply.jwtSign({}, { sign: { sub: gym.id } });
        return reply.status(200).send({ token });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        } else {
            throw error;
        }
    }
}
