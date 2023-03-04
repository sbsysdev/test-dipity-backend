import { CommonsErrorMessage } from '../../../shared/domain';

export type ClientMessage =
    | `client.${
          | `exceptions.${
                | 'id.notfound'
                | 'name.notvalid'
                | 'lastname.notvalid'
                | 'name.notvalid'
                | 'email.notvalid'
                | 'address.notvalid'
                | 'phone.notvalid'}`
          | `success.${'created' | 'updated' | 'deleted'}`}`
    | CommonsErrorMessage;
