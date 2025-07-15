import { beforeEach, describe, expect, it } from 'vitest';
import { LoginUseCase } from './login-use-case';
import { GymInMemoryRepository } from '@/respositories/in-memory/gym-in-memory-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import bcrypt from 'bcrypt';

describe(LoginUseCase.name, () => {
    let sut: LoginUseCase;
    let gymsRepository: GymInMemoryRepository;

    beforeEach(() => {
        gymsRepository = new GymInMemoryRepository();
        sut = new LoginUseCase(gymsRepository);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should throw InvalidCredentialsError if gym does not exist', async () => {
        await expect(() =>
            sut.execute({ email: 'some@gmail.com', password: '123456' }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError if password is invalid', async () => {
        await gymsRepository.create({
            email: 'test@gmail.com',
            name: 'Test Gym',
            password: '123456',
        });
        await expect(() =>
            sut.execute({ email: 'test@gmail.com', password: 'wrong-password' }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should return gym if credentials are valid', async () => {
        const gym = await gymsRepository.create({
            email: 'test@gmail.com',
            name: 'Test Gym',
            password: await bcrypt.hash('123456', 6),
        });
        const { gym: result } = await sut.execute({ email: 'test@gmail.com', password: '123456' });
        expect(result).toEqual(gym);
    });
});
