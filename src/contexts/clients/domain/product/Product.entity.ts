import { Entity, Result, UniqueEntityID } from '../../../shared/domain';
import { ProductError } from './Product.error';

interface ProductProps {
    clientId: UniqueEntityID;
    name: string;
    category: string;
    expires: Date;
    stock: number;
}

export class ProductEntity extends Entity<ProductProps> {
    private constructor(props: ProductProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ProductProps,
        id?: UniqueEntityID
    ): Result<ProductError, ProductEntity> {
        if (!props.name) return Result.Error(ProductError.NotValidNameError());

        if (!props.category) return Result.Error(ProductError.NotValidCategoryError());

        if (!props.expires) return Result.Error(ProductError.NotValidExpiresError());

        if (!props.stock) return Result.Error(ProductError.NotValidStockError());

        return Result.Success(
            new ProductEntity(
                {
                    ...props,
                },
                id
            )
        );
    }
}
