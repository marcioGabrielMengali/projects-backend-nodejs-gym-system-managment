import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterMemeberUseCase } from './register-member-use-case';
import { MembersInMemoryRepository } from '@/respositories/in-memory/members-in-memory-repository';
import { GymInMemoryRepository } from '@/respositories/in-memory/gym-in-memory-repository';
import { AlreadyExistsError } from './errors/already-exists-error';
import { NotFoundError } from './errors/not-found-error';

describe(RegisterMemeberUseCase, () => {
    let sut: RegisterMemeberUseCase;
    let membersRepository: MembersInMemoryRepository;
    let gymsRepository: GymInMemoryRepository;

    beforeEach(() => {
        membersRepository = new MembersInMemoryRepository();
        gymsRepository = new GymInMemoryRepository();
        sut = new RegisterMemeberUseCase(membersRepository, gymsRepository);
    });

    it('Should be define', () => {
        expect(sut).toBeDefined();
    });

    it('Should thorw an error when member already exists', async () => {
        await membersRepository.create({
            email: 'member@gmail.com',
            name: 'Member',
            gymId: 'gym-id-123',
        });
        await expect(() =>
            sut.execute({ email: 'member@gmail.com', name: 'Member', gymId: 'gym-id-123' }),
        ).rejects.toBeInstanceOf(AlreadyExistsError);
    });

    it('Should throw an error when gym does not exists', async () => {
        await expect(() =>
            sut.execute({ email: 'member@gmail.com', name: 'Member', gymId: 'gym-id-123' }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it('Should be able to register a member', async () => {
        const { id: gymId } = await gymsRepository.create({
            email: 'gym-1234',
            name: 'Gym 1234',
            password: '1234',
        });
        const { member } = await sut.execute({
            email: 'member@gmail.com',
            name: 'Member',
            gymId,
        });

        expect(member.id).toEqual(expect.any(String));
    });
});
