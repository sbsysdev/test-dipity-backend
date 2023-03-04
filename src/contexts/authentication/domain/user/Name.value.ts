import { Result, ValueObject } from '../../../shared/domain';
import { UserError } from './User.error';

export interface NameProps {
    name: string;
}

export class Name extends ValueObject<NameProps> {
    public get value(): string {
        return this.props.name;
    }

    public static create(props: NameProps): Result<UserError, Name> {
        if (!props.name || props.name.length === 0)
            return Result.Error(UserError.NotValidNameError(props));

        return Result.Success(new Name(props));
    }
}
