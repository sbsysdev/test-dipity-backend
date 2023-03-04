import { CommonsErrorMessage } from '../../../shared/domain';

export type ProductMessage =
    | `product.${
          | `exceptions.${
                | 'id.notfound'
                | 'name.notvalid'
                | 'category.notvalid'
                | 'expires.notvalid'
                | 'stock.notvalid'}`
          | `success.${'created' | 'updated' | 'deleted'}`}`
    | CommonsErrorMessage;
