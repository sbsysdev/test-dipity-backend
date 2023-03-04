import { model, Schema } from 'mongoose';

export interface UserModel {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface CreateUserDTO extends UserModel {}

export interface UserResponse extends Omit<UserModel, 'password'> {}

const UserSchema = new Schema<UserModel>({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

UserSchema.method('toJSON', function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...rest } = this.toObject();

    return { ...rest, id: _id };
});

export const User = model('User', UserSchema);
