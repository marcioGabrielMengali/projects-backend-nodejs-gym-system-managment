import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../use-cases/errors/unauthorize-error';

export async function verifyJwtMiddlware(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (error) {
        throw new UnauthorizedError('Invalid Credentials');
    }
}
