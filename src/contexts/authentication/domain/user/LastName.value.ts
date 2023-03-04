import { Result, ValueObject } from '../../../shared/domain';
import { UserError } from './User.error';

export interface LastNameProps {
    lastname: string;
}

export class LastName extends ValueObject<LastNameProps> {
    public get value(): string {
        return this.props.lastname;
    }

    public static create(props: LastNameProps): Result<UserError, LastName> {
        if (!props.lastname || props.lastname.length === 0)
            return Result.Error(UserError.NotValidLastNameError(props));

        return Result.Success(new LastName(props));
    }
}
