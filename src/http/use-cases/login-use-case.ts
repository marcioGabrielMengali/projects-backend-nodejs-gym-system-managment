import { GymRepository } from '@/respositories/gym-repository';
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface LoginUserCaseRequest {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(private gymsRepository: GymRepository) {}

    async execute({ email, password }: LoginUserCaseRequest) {
        const gym = await this.gymsRepository.findByEmail(email);

        if (!gym) {
            throw new InvalidCredentialsError('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, gym.password);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError('Invalid email or password');
        }

        return {
            gym,
        };
    }
}
