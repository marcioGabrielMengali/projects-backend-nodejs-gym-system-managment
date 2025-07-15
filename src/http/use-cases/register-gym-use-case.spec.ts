import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterGymUseCase } from './register-gym-use-case';
import { GymRepository } from '@/respositories/gym-repository';
import { GymInMemoryRepository } from '@/respositories/in-memory/gym-in-memory-repository';
import bcrypt from 'bcrypt';
import { AlreadyExistsError } from './errors/already-exists-error';

describe('RegisterGymUseCase', () => {
    let repository: GymRepository;
    let sut: RegisterGymUseCase;
    beforeEach(() => {
        repository =  new GymInMemoryRepository();
        sut = new RegisterGymUseCase(repository);
    });
    it('sut should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('Should has password correctly', async () => {
        const gym = await sut.execute({email: 'gym01@gmail.com', name: 'gym01', password: '123456'});
        const isPasswordHased = await bcrypt.compare('123456', gym.password);
        expect(isPasswordHased).toBe(true);
    });

    it('Should not register gym with same email', async () => {
        await sut.execute({email: 'gym01@gmail.com', name: 'gym01', password: '123456'});
        await expect(() => sut.execute({email: 'gym01@gmail.com', name: 'gym01', password: '123456'})).rejects.toBeInstanceOf(AlreadyExistsError);
    });

    it('Should register gym correctly', async () => {
        const gym = await sut.execute({email: 'gym01@gmail.com', name: 'gym01', password: '123456'});
        expect(gym.id).toEqual(expect.any(String));
    });
});