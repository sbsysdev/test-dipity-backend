import { inject, injectable } from 'inversify';
import { CONSTANTS, Symbols } from '../../../../env';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Email, UserEntity, UserError, UserRepository } from '../../domain/user';
import { User } from '../models';
import { UserSerializer } from '../serializers';
import { genSaltSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
export class MongooseUserRepository implements UserRepository {
    constructor(@inject(Symbols.UserSerializer) private userSerializer: UserSerializer) {}

    async isEmailAvailable(email: Email): Promise<Result<UserError, void>> {
        const alreadyEmail = await User.findOne({ email: email.value });

        if (alreadyEmail) return Result.Error(UserError.EmailAlreadyExistError());

        return Result.Success();
    }

    async create(props: UserEntity): Promise<Result<UserError, void>> {
        const isEmailAvailable = await this.isEmailAvailable(props.props.email);

        if (isEmailAvailable.isError) return Result.Error(isEmailAvailable.getError());

        const user = new User(this.userSerializer.fromEntityToDTO(props));

        user.password = hashSync(props.props.password.value, genSaltSync());

        const stored = await user.save();

        if (stored.errors) return Result.Error(UserError.UnExpectedError(stored.errors));

        return Result.Success();
    }

    async readById(id: UniqueEntityID): Promise<Result<UserError, UserEntity>> {
        const founded = await User.findById(id.toString());

        if (!founded) return Result.Error(UserError.NotFoundIdError());

        const serialized = this.userSerializer.fromModelToEntity(founded.toJSON());

        if (serialized.isError) return Result.Error(serialized.getError());

        return Result.Success(serialized.getSuccess());
    }

    readAll(): Promise<Result<UserError, UserEntity[]>> {
        throw new Error('Method not implemented.');
    }

    updateById(): Promise<Result<UserError, void>> {
        throw new Error('Method not implemented.');
    }

    async deleteById(id: UniqueEntityID): Promise<Result<UserError, void>> {
        const founded = await User.findByIdAndDelete(id.toString()).exec();

        if (!founded) return Result.Error(UserError.NotFoundIdError());

        return Result.Success();
    }

    async findByEmail(email: Email): Promise<Result<UserError, UserEntity>> {
        const founded = await User.findOne({ email: email.value });

        if (!founded) return Result.Error(UserError.NotValidEmailError());

        const serialized = this.userSerializer.fromModelToEntity(founded.toJSON());

        if (serialized.isError) return Result.Error(serialized.getError());

        return Result.Success(serialized.getSuccess());
    }

    async generateJWT(id: UniqueEntityID): Promise<Result<UserError, string>> {
        const result = await new Promise((resolve, reject) => {
            const payload = { id };

            jwt.sign(
                payload,
                CONSTANTS.JWT_KEY,
                {
                    expiresIn: '12h',
                },
                (error, encoded) => {
                    if (error) reject(error.message);
                    resolve(encoded);
                }
            );
        }).then(value => value as string);

        if (!result) return Result.Error(UserError.NotValidPasswordError());

        return Result.Success(result);
    }
}
