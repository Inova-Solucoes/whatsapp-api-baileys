import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { checkInstance } from '../../../helpers/check-Instance';

export class LogoutInstanceUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: LogoutInstanceUseCaseDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    await sock.logout();
  }
}
