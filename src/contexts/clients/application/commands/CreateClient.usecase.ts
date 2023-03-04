import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { ClientEntity, ClientError, ClientRepository } from '../../domain/client';

export interface CreateClientRequest {
    name: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
}

type RESPONSE = Result<ClientError, void>;

@injectable()
export class CreateClientUseCase implements UseCase<CreateClientRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private clientRepository: ClientRepository) {}

    async execute(request: CreateClientRequest): Promise<RESPONSE> {
        const client = ClientEntity.create(
            { ...request, createdAt: new Date() },
            new UniqueEntityID()
        );

        if (client.isError) return Result.Error(client.getError());

        const stored = await this.clientRepository.create(client.getSuccess());

        if (stored.isError) return Result.Error(stored.getError());

        return Result.Success();
    }
}
