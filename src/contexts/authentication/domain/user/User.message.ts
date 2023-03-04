import { CommonsErrorMessage } from '../../../shared/domain';

export type UserMessage =
    | `user.${
          | `exceptions.${
                | 'id.notfound'
                | 'id.notvalid'
                | 'name.notvalid'
                | 'lastname.notvalid'
                | 'email.notvalid'
                | 'email.already'
                | 'password.notvalid'}`
          | `success.${'created' | 'auth'}`}`
    | CommonsErrorMessage;
