import { injectable } from 'inversify';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Serializer } from '../../../shared/infrastructure';
import { Email, LastName, Name, Password, UserEntity, UserError } from '../../domain/user';
import { CreateUserDTO, UserModel, UserResponse } from '../models';

@injectable()
export class UserSerializer extends Serializer<
    UserError,
    UserEntity,
    UserModel,
    CreateUserDTO,
    UserResponse
> {
    public fromEntityToDTO(entity: UserEntity): CreateUserDTO {
        return {
            id: entity.id.toString(),
            name: entity.props.name.value,
            lastname: entity.props.lastname.value,
            email: entity.props.email.value,
            password: entity.props.password.value,
        };
    }

    public fromModelToEntity(model: UserModel): Result<UserError, UserEntity> {
        const name = Name.create({ name: model.name });

        if (name.isError) return Result.Error(name.getError());

        const lastname = LastName.create({ lastname: model.lastname });

        if (lastname.isError) return Result.Error(lastname.getError());

        const email = Email.create({ email: model.email });

        if (email.isError) return Result.Error(email.getError());

        const password = Password.create({ password: model.password });

        if (password.isError) return Result.Error(password.getError());

        const user = UserEntity.create(
            {
                name: name.getSuccess(),
                lastname: lastname.getSuccess(),
                email: email.getSuccess(),
                password: password.getSuccess(),
            },
            new UniqueEntityID(model.id)
        );

        if (user.isError) return Result.Error(user.getError());

        return Result.Success(user.getSuccess());
    }

    public fromEntityToResponse(entity: UserEntity): UserResponse {
        return {
            id: entity.id.toString(),
            name: entity.props.name.value,
            lastname: entity.props.lastname.value,
            email: entity.props.email.value,
        };
    }
}
