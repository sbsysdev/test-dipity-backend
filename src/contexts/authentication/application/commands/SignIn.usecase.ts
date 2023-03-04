import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result } from '../../../shared/domain';
import { Email, Password, UserEntity, UserError, UserRepository } from '../../domain/user';
import { compareSync } from 'bcrypt';

export type SignInRequest = {
    email: string;
    password: string;
};

type Authenticated = {
    user: UserEntity;
    token: string;
};

type RESPONSE = Result<UserError, Authenticated>;

@injectable()
export class SignInUseCase implements UseCase<SignInRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: SignInRequest): Promise<RESPONSE> {
        const email = Email.create({ email: request.email });

        if (email.isError) return Result.Error(email.getError());

        const password = Password.create({ password: request.password });

        if (password.isError) return Result.Error(password.getError());

        const founded = await this.userRepository.findByEmail(email.getSuccess());

        if (founded.isError) return Result.Error(founded.getError());

        if (!compareSync(password.getSuccess().value, founded.getSuccess().props.password.value))
            return Result.Error(UserError.NotValidPasswordError());

        const token = await this.userRepository.generateJWT(founded.getSuccess().id);

        if (token.isError) return Result.Error(token.getError());

        return Result.Success({
            user: founded.getSuccess(),
            token: token.getSuccess(),
        });
    }
}
