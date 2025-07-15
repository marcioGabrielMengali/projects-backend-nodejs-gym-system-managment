import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchGymMembersUseCase } from '../use-cases/factories/make-fetch-gym-members-use-case';

export async function fetchGymMembersController(req: FastifyRequest, res: FastifyReply) {
    const gymId = req.user.sub;
    const useCase = makeFetchGymMembersUseCase();
    const members = await useCase.execute(gymId);
    return res.status(200).send(members);
}
