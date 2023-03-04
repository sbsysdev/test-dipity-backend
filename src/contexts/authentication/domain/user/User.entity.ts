import { Entity, Result, UniqueEntityID } from '../../../shared/domain';
import { UserError } from './User.error';
import { Name } from './Name.value';
import { LastName } from './LastName.value';
import { Email } from './Email.value';
import { Password } from './Password.value';

interface UserProps {
    name: Name;
    lastname: LastName;
    email: Email;
    password: Password;
}

export class UserEntity extends Entity<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): Result<UserError, UserEntity> {
        return Result.Success(
            new UserEntity(
                {
                    ...props,
                },
                id
            )
        );
    }
}
