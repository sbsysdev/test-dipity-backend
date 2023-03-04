import { model, Schema } from 'mongoose';

export interface Product {
    id: string;
    clientId: string | Schema.Types.ObjectId;
    name: string;
    category: string;
    expires: Date;
    stock: number;
}

export interface CreateProductDTO extends Omit<Product, 'clientId'> {
    clientId: string;
}

export interface ProductResponse extends Omit<Product, 'clientId'> {}

const ProductSchema = new Schema<Product>({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    expires: {
        type: Date,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
});

ProductSchema.method('toJSON', function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, ...rest } = this.toObject();

    return { ...rest, id: _id };
});

export const Product = model('Product', ProductSchema);
