import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { SignUpUseCase } from '../../application/commands';
import { UserMessage } from '../../domain/user';

@injectable()
export class SignUpController extends Controller {
    constructor(@inject(Symbols.SignUpUseCase) private signUp: SignUpUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { name, lastname, email, password } = this.req.body;

        const result = await this.signUp.execute({ name, lastname, email, password });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(
                error.message,
                error.args
            );
        }

        return this.created<UserMessage>('user.success.created');
    }
}
