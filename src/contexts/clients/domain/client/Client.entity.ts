import { Entity, Result, UniqueEntityID } from '../../../shared/domain';
import { ProductEntity } from '../product';
import { ClientError } from './Client.error';

interface ClientProps {
    name: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    createdAt: Date;
    products?: ProductEntity[];
}

export class ClientEntity extends Entity<ClientProps> {
    private constructor(props: ClientProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ClientProps,
        id?: UniqueEntityID
    ): Result<ClientError, ClientEntity> {
        if (!props.name) return Result.Error(ClientError.NotValidNameError());

        if (!props.lastname) return Result.Error(ClientError.NotValidLastNameError());

        if (!props.email) return Result.Error(ClientError.NotValidEmailError());

        if (!props.address) return Result.Error(ClientError.NotValidAddressError());

        if (!props.phone) return Result.Error(ClientError.NotValidPhoneError());

        return Result.Success(
            new ClientEntity(
                {
                    ...props,
                },
                id
            )
        );
    }
}
