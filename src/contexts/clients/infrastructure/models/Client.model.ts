import { model, Schema } from 'mongoose';
import { Product } from './Product.model';

export interface ClientModel {
    id: string;
    name: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    createdAt: Date;
    products: Product[];
}

export interface CreateClientDTO extends ClientModel {}

export interface ClientResponse extends Omit<ClientModel, 'products'> {}

const ClientSchema = new Schema<ClientModel>({
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
    address: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

ClientSchema.method('toJSON', function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...rest } = this.toObject();

    return { ...rest, id: _id };
});

export const Client = model('Client', ClientSchema);
