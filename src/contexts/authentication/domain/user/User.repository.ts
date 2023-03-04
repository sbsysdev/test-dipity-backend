import { Repository, Result, UniqueEntityID } from '../../../shared/domain';
import { Email } from './Email.value';
import { UserEntity } from './User.entity';
import { UserError } from './User.error';

export interface UserRepository extends Repository<UserError, UserEntity> {
    isEmailAvailable(email: Email): Promise<Result<UserError, void>>;

    findByEmail(email: Email): Promise<Result<UserError, UserEntity>>;

    generateJWT(id: UniqueEntityID): Promise<Result<UserError, string>>;
}
