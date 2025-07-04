import { registerGymController } from '@/http/controllers/register-gym-controller';
import { registerMemberController } from '@/http/controllers/register-member-controller';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
    app.post('/gyms', registerGymController);
    app.post('/members', registerMemberController);
}
