import { fetchGymMembersController } from '@/http/controllers/fetch-gym-members-contoller';
import { fetchMembersPaymentsController } from '@/http/controllers/fetch-members-payments-controller';
import { LoginController } from '@/http/controllers/login-controller';
import { registerGymController } from '@/http/controllers/register-gym-controller';
import { registerMemberController } from '@/http/controllers/register-member-controller';
import { registerPaymentController } from '@/http/controllers/register-payment-controlle';
import { verifyJwtMiddlware } from '@/http/middlewares/verify-jwt-middleware';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
    app.post('/gyms', registerGymController);
    app.post('/members', { onRequest: [verifyJwtMiddlware] }, registerMemberController);
    app.get('/gyms/members', fetchGymMembersController);
    app.post('/members/payments', registerPaymentController);
    app.get('/members/payments', fetchMembersPaymentsController);
    app.post('/login', LoginController);
}
