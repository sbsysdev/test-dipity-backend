import { DomainError } from '../../../shared/domain';
import { ProductMessage } from './Product.message';

export class ProductError extends DomainError<ProductMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<ProductMessage, ARGS> {
        return this.create('notfound', 'product.exceptions.id.notfound', args);
    }

    public static NotValidNameError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ProductMessage, ARGS> {
        return this.create('notvalid', 'product.exceptions.name.notvalid', args);
    }

    public static NotValidCategoryError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ProductMessage, ARGS> {
        return this.create('notvalid', 'product.exceptions.category.notvalid', args);
    }

    public static NotValidExpiresError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ProductMessage, ARGS> {
        return this.create('notvalid', 'product.exceptions.expires.notvalid', args);
    }

    public static NotValidStockError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ProductMessage, ARGS> {
        return this.create('notvalid', 'product.exceptions.stock.notvalid', args);
    }
}
