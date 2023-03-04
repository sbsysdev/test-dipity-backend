import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { SignInUseCase } from '../../application/commands';
import { UserMessage } from '../../domain/user';
import { UserSerializer } from '../serializers';

@injectable()
export class SignInController extends Controller {
    constructor(
        @inject(Symbols.SignInUseCase) private signIn: SignInUseCase,
        @inject(Symbols.UserSerializer) private userSerializer: UserSerializer
    ) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { email, password } = this.req.body;

        const result = await this.signIn.execute({ email, password });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(
                error.message,
                error.args
            );
        }

        return this.ok<UserMessage>('user.success.auth', {
            user: this.userSerializer.fromEntityToResponse(result.getSuccess().user),
            token: result.getSuccess().token,
        });
    }
}
