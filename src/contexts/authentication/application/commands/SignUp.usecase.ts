import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result, UniqueEntityID } from '../../../shared/domain';
import {
    Email,
    LastName,
    Name,
    Password,
    UserEntity,
    UserError,
    UserRepository,
} from '../../domain/user';

export type SignUpRequest = {
    name: string;
    lastname: string;
    email: string;
    password: string;
};

type RESPONSE = Result<UserError, void>;

@injectable()
export class SignUpUseCase implements UseCase<SignUpRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: SignUpRequest): Promise<RESPONSE> {
        const name = Name.create({ name: request.name });

        if (name.isError) return Result.Error(name.getError());

        const lastname = LastName.create({ lastname: request.lastname });

        if (lastname.isError) return Result.Error(lastname.getError());

        const email = Email.create({ email: request.email });

        if (email.isError) return Result.Error(email.getError());

        const password = Password.create({ password: request.password });

        if (password.isError) return Result.Error(password.getError());

        const isEmailAvailable = await this.userRepository.isEmailAvailable(email.getSuccess());

        if (isEmailAvailable.isError) return Result.Error(isEmailAvailable.getError());

        const user = UserEntity.create(
            {
                name: name.getSuccess(),
                lastname: lastname.getSuccess(),
                email: email.getSuccess(),
                password: password.getSuccess(),
            },
            new UniqueEntityID()
        );

        if (user.isError) return Result.Error(user.getError());

        const stored = await this.userRepository.create(user.getSuccess());

        if (stored.isError) return Result.Error(stored.getError());

        return Result.Success();
    }
}
