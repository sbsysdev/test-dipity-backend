import { DomainError } from '../../../shared/domain';
import { ClientMessage } from './Client.message';

export class ClientError extends DomainError<ClientMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<ClientMessage, ARGS> {
        return this.create('notfound', 'client.exceptions.id.notfound', args);
    }

    public static NotValidNameError<ARGS = unknown>(args?: ARGS): DomainError<ClientMessage, ARGS> {
        return this.create('notvalid', 'client.exceptions.name.notvalid', args);
    }

    public static NotValidLastNameError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ClientMessage, ARGS> {
        return this.create('notvalid', 'client.exceptions.lastname.notvalid', args);
    }

    public static NotValidEmailError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ClientMessage, ARGS> {
        return this.create('notvalid', 'client.exceptions.email.notvalid', args);
    }

    public static NotValidAddressError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ClientMessage, ARGS> {
        return this.create('notvalid', 'client.exceptions.address.notvalid', args);
    }

    public static NotValidPhoneError<ARGS = unknown>(
        args?: ARGS
    ): DomainError<ClientMessage, ARGS> {
        return this.create('notvalid', 'client.exceptions.phone.notvalid', args);
    }
}
