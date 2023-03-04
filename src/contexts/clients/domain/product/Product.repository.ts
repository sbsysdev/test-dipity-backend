import { Repository } from '../../../shared/domain';
import { ProductEntity } from './Product.entity';
import { ProductError } from './Product.error';

export interface ProductRepository extends Repository<ProductError, ProductEntity> {}
