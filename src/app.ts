import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { appRoutes } from './routes/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import { UnauthorizedError } from './http/use-cases/errors/unauthorize-error';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error: any, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            errors: error.format(),
        });
    }

    if (error instanceof UnauthorizedError) {
        return reply.status(401).send({
            message: error.message,
        });
    }

    if (env.NODE_ENV === 'development') {
        console.error(error);
    }

    return reply.status(500).send({
        message: 'Internal server error',
    });
});
