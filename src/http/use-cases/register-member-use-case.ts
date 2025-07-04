import { MembersRepository } from '@/respositories/members-repository';
import { Member } from 'generated/prisma';
import { AlreadyExistsError } from './errors/already-exists-error';
import { GymRepository } from '@/respositories/gym-repository';
import { NotFoundError } from './errors/not-found-error';


interface RegisterMemberUseCaseRequest {
    name: string;
    email: string;
    gymId: string;
}

interface RegisterMemberUseCaseResponse {
    member: Member;
}
export class RegisterMemeberUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private gymsRepository: GymRepository
  ) {}

  async execute(data: RegisterMemberUseCaseRequest): Promise<RegisterMemberUseCaseResponse> {
    const existingMember = await this.membersRepository.findByEmail(data.email);

    if (existingMember) {
      throw new AlreadyExistsError('Member already exists');
    }

    const existingGym = await this.gymsRepository.findById(data.gymId);

    if (!existingGym) {
      throw new NotFoundError('Gym not found');
    }

    const member = await this.membersRepository.create({
      name: data.name,
      email: data.email,
      gymId: data.gymId,
    });

    return {member};
  }
}